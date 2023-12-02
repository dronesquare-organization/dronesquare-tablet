/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ControlSection,
  Coordinate,
  GeoJsonLayer,
  InnerButton,
  TileLayer,
} from "react-openlayers7";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { SlLayers } from "react-icons/sl";
import ProjectSelectBox from "./ProjectSelectBox";
import { configObject } from "../../awsconfig";
import {
  CAPTURE_CLOUDFRONT_URL,
  DATA_BUCKET_NAME,
  S3_API_URL,
} from "../../utils/constant";
import { Path } from "../../pages/multiview";
import useIsShown from "../../hooks/useIsShown";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {
  useGetAnnotations,
  useGetDxfJsonsFromS3,
  useGetGisLayers,
  useGetProjectEpsg,
  useGetProjectZoomLevel,
} from "../../query/queries";
import AnnotationGeometry from "../AnnotationGeometry";
import { COLOR } from "../../style";
import BigLoadingIndicator from "../BigLoadingIndicator";

type MainLayerType = "normal" | "dsm" | "empty";
type SubLayerType = "dxf" | "tif";
type LayerType = {
  build_complete: boolean;
  name: string;
  type: SubLayerType;
  zoom_level?: {
    min: string | null;
    max: string | null;
  };
};

export default function SyncOpenLayerMap() {
  const location: Path = useLocation();
  const projectId = Number(location.pathname.split("/").pop());

  // 현재 프로젝트를 기본값으로 설정
  const [selectedProjectId, setSelectedProjectId] = useState<number>(projectId);

  const {
    data: annotationData,
    isLoading: isAnnotationLoading,
    isError: isAnnotationError,
  } = useGetAnnotations(selectedProjectId);
  const {
    data: zoomLevelData,
    isLoading: isZoomLevelLoading,
    isError: isZoomLevelError,
  } = useGetProjectZoomLevel(Number(selectedProjectId));
  const {
    data: dxfData,
    isLoading: isDxfLoading,
    isError: isDxfLevelError,
  } = useGetDxfJsonsFromS3(selectedProjectId.toString());
  const {
    data: gisLayerData,
    isLoading: isGisLayerLoading,
    isError: isGisLayerError,
  } = useGetGisLayers(selectedProjectId);
  const {
    data: cartesian,
    isLoading: isCartesianLoading,
    isError: isCartesianError,
  } = useGetProjectEpsg(selectedProjectId);

  useEffect(() => {
    if (
      isAnnotationError ||
      isZoomLevelError ||
      isDxfLevelError ||
      isGisLayerError ||
      isCartesianError
    ) {
      alert("Network Error!");
    }
  }, [
    isAnnotationError,
    isZoomLevelError,
    isDxfLevelError,
    isGisLayerError,
    isCartesianError,
  ]);

  const [isShown, onOpen, onClose] = useIsShown();

  const modalRef = useRef<HTMLDivElement | null>(null);
  // 주 레이어(정사영상, DSM)
  useOnClickOutside(modalRef, () => onClose());

  const onClickModal = useCallback(() => {
    onOpen();
  }, [isShown]);

  const [mainLayer, setMainLayer] = useState<MainLayerType>("normal");
  // 보조 레이어(어노테이션)
  const [showAnnotation, setShowAnnotation] = useState(false);
  const handleAnnotationToggle = () => {
    setShowAnnotation((prev) => !prev);
  };
  const [selectedLayerNames, setSelectedLayerNames] = useState<string[]>([]);

  // GIS 레이어(dxf, tif)
  const layers: LayerType[] = useMemo(() => {
    if (!gisLayerData) return [];

    const dxf = gisLayerData.geojson_layer.map((layer) => ({
      build_complete: layer.build_complete,
      name: layer.dxf.split("/").pop() as string,
      type: "dxf" as SubLayerType,
    }));

    const tif = gisLayerData.tms_layer.map((layer) => ({
      build_complete: layer.build_complete,
      name: layer.tif.split("/").pop() as string,
      type: "tif" as SubLayerType,
      zoom_level: {
        min: layer.zoom_level.min as string | null,
        max: layer.zoom_level.max as string | null,
      },
    }));

    return dxf.concat(tif);
  }, [gisLayerData]);

  const layersCheckbox = useMemo(() => {
    return layers.map((layer) => {
      return (
        <label key={layer.name} css={radioStyle}>
          <input
            type="checkbox"
            name="dxfLayer"
            value={layer.name}
            disabled={!layer.build_complete}
            checked={selectedLayerNames.includes(layer.name)}
            onChange={() => {
              if (selectedLayerNames.includes(layer.name)) {
                setSelectedLayerNames(() =>
                  selectedLayerNames.filter((name) => name !== layer.name)
                );
              } else {
                setSelectedLayerNames((prev) => [layer.name, ...prev]);
              }
            }}
          />
          {layer.name}
        </label>
      );
    });
  }, [layers, selectedLayerNames]);

  const filteredLayers = layers.filter((layer) => {
    return selectedLayerNames.includes(layer.name);
  });

  const layersComponent = useMemo(() => {
    if (!dxfData || !cartesian) return;
    return filteredLayers.map((layer, index) => {
      if (layer.type === "dxf") {
        return (
          <GeoJsonLayer
            key={layer.name}
            // 모달에는 .dxf로 출력하고 인자에는 .json으로 전달함
            geoJson={
              dxfData[layer.name.replace("dxf", "json")] as Record<string, any>
            }
            projectionCode={`EPSG:${cartesian.epsg}` as Coordinate}
            color="blue"
            zIndex={filteredLayers.length - index}
          />
        );
      }

      if (layer.type === "tif" && layer.zoom_level) {
        return (
          <TileLayer
            key={layer.name}
            url={`${
              configObject[CAPTURE_CLOUDFRONT_URL]
            }${selectedProjectId}/geotiff_tiles/${
              layer.name.split(".")[0]
            }/{z}/{x}/{y}.png`}
            maxZoom={Number(layer.zoom_level.max)}
            minZoom={Number(layer.zoom_level.min)}
            errorTileUrl="/images/empty_tile.png"
            zIndex={filteredLayers.length - index}
          />
        );
      }
    });
  }, [cartesian, dxfData, filteredLayers]);

  // 7. buildState에 따른 분기처리

  const handleSelectChange = (id: number) => {
    setSelectedProjectId(id);
  };

  if (
    isAnnotationLoading ||
    isZoomLevelLoading ||
    isDxfLoading ||
    isGisLayerLoading ||
    isCartesianLoading
  ) {
    return <BigLoadingIndicator description="데이터 불러오는 중.." />;
  }

  return (
    <div>
      {/* 라이브러리 기본 스타일 무효화 */}
      <ControlSection style={{}}>
        <InnerButton css={layerContainer} onClick={onClickModal}>
          <SlLayers size={21} color={COLOR.Gray750} />
        </InnerButton>
        {isShown && (
          <div css={layerContent} ref={modalRef}>
            <fieldset css={layerRadioGroup}>
              <label htmlFor="normal" css={radioStyle}>
                <input
                  type="radio"
                  name="mainLayer"
                  value="normal"
                  checked={"normal" === mainLayer}
                  onChange={(e) =>
                    setMainLayer(e.target.value as MainLayerType)
                  }
                />
                정사영상
              </label>
              <label htmlFor="dsm" css={radioStyle}>
                <input
                  type="radio"
                  name="mainLayer"
                  value="dsm"
                  checked={"dsm" === mainLayer}
                  onChange={(e) =>
                    setMainLayer(e.target.value as MainLayerType)
                  }
                />
                DSM
              </label>
              <label htmlFor="empty" css={radioStyle}>
                <input
                  type="radio"
                  name="mainLayer"
                  value="empty"
                  checked={"empty" === mainLayer}
                  onChange={(e) =>
                    setMainLayer(e.target.value as MainLayerType)
                  }
                />
                없음
              </label>
            </fieldset>
            <hr css={layerDivider} />
            <fieldset css={layerRadioGroup}>
              <label htmlFor="annotation" css={radioStyle}>
                <input
                  type="checkbox"
                  name="annotation"
                  value="annotation"
                  checked={showAnnotation}
                  onChange={handleAnnotationToggle}
                />
                어노테이션
              </label>
              {layersCheckbox}
            </fieldset>
          </div>
        )}
        <ProjectSelectBox
          projectId={projectId}
          selectedProjectId={selectedProjectId}
          handleSelectChange={handleSelectChange}
        />
      </ControlSection>
      {showAnnotation &&
        annotationData?.annotations.map((annotation) => {
          return (
            <AnnotationGeometry key={annotation.id} annotation={annotation} />
          );
        })}
      {mainLayer !== "empty" && (
        <TileLayer
          errorTileUrl="/images/empty_tile.png"
          url={`${configObject[S3_API_URL]}${
            configObject[DATA_BUCKET_NAME]
          }/public/${selectedProjectId}/manifold/${
            mainLayer === "normal" ? "orthomosaic" : "colorized_dem"
          }_tiles/{z}/{x}/{y}.png`}
          minZoom={zoomLevelData?.min}
          maxZoom={zoomLevelData?.max}
        />
      )}
      {layersComponent}
    </div>
  );
}

const layerContainer = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: ${COLOR.White100};
  color: black;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLOR.Gray500};
  cursor: pointer;
`;

const layerContent = css`
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 150px;
  background-color: ${COLOR.White100};
  border-radius: 4px;
  color: black;
  border: 1px solid ${COLOR.Gray500};
  font-size: small;
  box-sizing: border-box;
  z-index: 999;
`;

const layerRadioGroup = css`
  padding: 10px 10px 0 10px;
  border: none;
`;

const radioStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const layerDivider = css`
  background: ${COLOR.Gray400};
  height: 1px;
  border: 0;
  margin: 5px 0;
`;
