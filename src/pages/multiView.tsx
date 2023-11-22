import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ControlSection,
  MapContainer,
  TileLayer,
  Location as OpenlayerLocation,
  SyncMapGroup,
  SyncMap,
} from "react-openlayers7";
import { css } from "@emotion/react";
import withAuth from "../hoc/withAuth";
import DefaultLayout from "../layout/DefaultLayout";
import { useGetGisLayersById, useGetProjectById } from "../query/queries";
import { ButtonToolbar, IconButton } from "rsuite";
import {
  TIMESERISE_LAYOUT_BUTTONS,
  TIMESERISE_LAYOUT_BUTTONS_TYPE,
} from "../utils/constant";

interface Path {
  pathname: string;
  search: string;
  hash: string;
}

function MultiView() {
  const location: Path = useLocation();
  const projectId = location.pathname.split("/").pop();
  const [layout, setLayout] = useState<TIMESERISE_LAYOUT_BUTTONS_TYPE>(
    TIMESERISE_LAYOUT_BUTTONS[0]
  );

  const { data } = useGetProjectById(Number(projectId));
  const { data: gisData } = useGetGisLayersById(Number(projectId));

  console.log("data", data);
  console.log("gisData", gisData);
  const handleLayoutChange = (layout: TIMESERISE_LAYOUT_BUTTONS_TYPE) => {
    setLayout(layout);
  };
  return (
    <DefaultLayout>
      <SyncMapGroup>
        <SyncMap>
          <ControlSection>
            <TileLayer url="https://tgxe79f6wl.execute-api.ap-northeast-2.amazonaws.com/dev/dev-drone-square-bucket/public/1/manifold/orthomosaic_tiles/{z}/{x}/{y}.png" />
          </ControlSection>
        </SyncMap>
        <SyncMap>
          <ControlSection>
            <TileLayer url="https://tgxe79f6wl.execute-api.ap-northeast-2.amazonaws.com/dev/dev-drone-square-bucket/public/1/manifold/orthomosaic_tiles/{z}/{x}/{y}.png" />
          </ControlSection>
        </SyncMap>
      </SyncMapGroup>

      <div css={multiViewContainer}>
        <div css={layoutContainer}>
          <ButtonToolbar>
            {TIMESERISE_LAYOUT_BUTTONS.map((button) => (
              <IconButton
                key={button.label}
                size="xs"
                appearance={
                  button.label === layout.label ? "primary" : "default"
                }
                icon={<button.icon size={button.buttonSize} />}
                onClick={() => handleLayoutChange(button)}
              ></IconButton>
            ))}
          </ButtonToolbar>
        </div>
        <MapContainer
          center={[data.data.lon, data.data.lat] as OpenlayerLocation}
        >
          <TileLayer url="https://tgxe79f6wl.execute-api.ap-northeast-2.amazonaws.com/dev/dev-drone-square-bucket/public/1/manifold/orthomosaic_tiles/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </DefaultLayout>
  );
}

const multiViewContainer = css`
  display: flex;
`;
const layoutContainer = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50px;
`;
// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(MultiView, { needLogin: true });
