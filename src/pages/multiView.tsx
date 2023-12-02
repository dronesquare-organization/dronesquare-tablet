import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Location as OpenlayerLocation,
  SyncMapGroup,
  SyncMap,
} from "react-openlayers7";
import { css } from "@emotion/react";
import { ButtonToolbar, IconButton, Slider } from "rsuite";
import withAuth from "../hoc/withAuth";
import { useGetProject } from "../query/queries";
import SyncOpenLayerMap from "../components/multiView/SyncOpenLayerMap";
import {
  TIMESERISE_LAYOUT_BUTTONS,
  TIMESERISE_LAYOUT_BUTTONS_TYPE,
} from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import { COLOR } from "../style";

export interface Path {
  pathname: string;
  search: string;
  hash: string;
}

function MultiView() {
  const location: Path = useLocation();
  const projectId = Number(location.pathname.split("/").pop());
  const { data } = useGetProject(projectId);

  const [layout, setLayout] = useState<TIMESERISE_LAYOUT_BUTTONS_TYPE>(
    TIMESERISE_LAYOUT_BUTTONS[0]
  );
  const handleLayoutChange = (layout: TIMESERISE_LAYOUT_BUTTONS_TYPE) => {
    setLayout(layout);
  };

  const [rotate, setRotate] = useState(0);

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
  }, [layout]);

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

  if (!data) return;

  return (
    <DefaultLayout>
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
          <Slider
            style={{ height: 200 }}
            vertical
            min={0}
            max={360}
            value={rotate}
            onChange={(value) => {
              setRotate(value);
            }}
          />
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

  > * {
    display: flex;
    justify-content: center;

    margin: 10px 0;
  }
`;
// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(MultiView, { needLogin: true });
