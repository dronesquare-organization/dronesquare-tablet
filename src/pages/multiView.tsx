import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Location as OpenlayerLocation,
  SyncMapGroup,
  SyncMap,
  useMap,
} from "react-openlayers7";
import { Control } from "ol/control";
import { css } from "@emotion/react";
import { ButtonToolbar, IconButton } from "rsuite";
import withAuth from "../hoc/withAuth";
import { useGetProject } from "../query/queries";
import SyncOpenLayerMap from "../components/multiView/SyncOpenLayerMap";
import {
  TIMESERISE_LAYOUT_BUTTONS,
  TIMESERISE_LAYOUT_BUTTONS_TYPE,
} from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import { COLOR } from "../style";
import { CompassIcon } from "../components/CompassIcon";

export interface Path {
  pathname: string;
  search: string;
  hash: string;
}

function MultiView() {
  const location: Path = useLocation();
  const navigate = useNavigate();
  const map = useMap();
  const ref = useRef<HTMLDivElement | null>(null);
  const projectId = Number(location.pathname.split("/").pop());
  const { data, isError } = useGetProject(projectId);

  // mouseDown -> mouseMove -> mouseEnd
  const [mouseDown, setMouseDown] = useState(false);
  // touchstart -> touchmove -> touchend
  const [touchY, setTouchY] = useState(0);
  const [rotate, setRotate] = useState(0);

  const handleMouseDown = useCallback(() => {
    // touch시 mouse 이벤트가 같이 일어나므로
    if ("ontouchstart" in document.documentElement) return;
    setMouseDown(true);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const yvalue = e.touches[0];
    setTouchY(yvalue.pageY);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (mouseDown) {
        // const { movementY } = e;

        const abjustedMovementY = e.movementY;
        setRotate((prevRotation) => {
          let newRotation = (prevRotation + abjustedMovementY) % 360;

          // 회전각은 0 ~ 360도 사이
          if (newRotation < 0) {
            newRotation += 360;
          }

          return newRotation;
        });
      }
    },
    [mouseDown, setRotate]
  );

  const handleTouchMove = useCallback(
    (ev: TouchEvent) => {
      if (touchY) {
        const touch = ev.touches[0];

        let movementY = touch.pageY - touchY;

        if (movementY < 0) {
          movementY += 360;
        }

        setRotate(movementY);
      }
    },
    [touchY]
  );

  const handleMouseUp = useCallback(() => {
    setMouseDown(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTouchY(0);
  }, []);

  const compassContainer = useMemo(() => {
    return css`
      background-color: white;
      width: 40px;
      height: 40px;
      padding: 6px 0 0 0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(${rotate}deg);
    `;
  }, [rotate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const [layout, setLayout] = useState<TIMESERISE_LAYOUT_BUTTONS_TYPE>(
    TIMESERISE_LAYOUT_BUTTONS[0]
  );
  const handleLayoutChange = (layout: TIMESERISE_LAYOUT_BUTTONS_TYPE) => {
    setLayout(layout);
  };

  // 레이아웃 별로 Component 생성
  const syncMapComponent = useMemo(() => {
    const components = [];

    for (let i = 0; i < layout.columns * layout.rows; i++) {
      components.push(
        <SyncMap height="100%" width="100%" key={i}>
          <SyncOpenLayerMap key={i} />
        </SyncMap>
      );
    }
    return components;
  }, [layout, rotate]);

  const syncMapComponentStyle = useMemo(() => {
    return css`
      display: grid;
      gap: 4px;
      width: calc(100% - 51px);
      height: calc(100vh - 57px);
      grid-template-columns: repeat(${layout.columns}, 1fr);
      grid-template-rows: repeat(${layout.rows}, 1fr);
      background-color: ${COLOR.Gray1000};
    `;
  }, [layout]);

  useEffect(() => {
    const customControl = new Control({
      element: ref.current ? ref.current : undefined,
    });

    map?.addControl(customControl);
  }, [map]);

  if (isError) {
    navigate("/404?code=not-exist-project-id");
  }

  if (!data) return;
  return (
    <DefaultLayout projectId={projectId}>
      <div css={multiViewContainer}>
        <div css={layoutContainer}>
          <ButtonToolbar css={alignStyle}>
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
          <div css={alignStyle}>
            <div
              ref={ref}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              css={compassContainer}
            >
              <CompassIcon width={32} height={32} />
            </div>
          </div>
        </div>
        <div css={syncMapComponentStyle}>
          <SyncMapGroup
            center={[data.data.lon, data.data.lat] as OpenlayerLocation}
            rotate={rotate}
          >
            {syncMapComponent}
          </SyncMapGroup>
        </div>
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
  height: 100vh;
  width: 51px;
`;

const alignStyle = css`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(MultiView, { needLogin: true });
