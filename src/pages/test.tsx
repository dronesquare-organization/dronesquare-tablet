import { ControlSection, SyncMap, SyncMapGroup } from "react-openlayers7";

const Test = () => {
  return (
    <div>
      <SyncMapGroup rotate={90}>
        <SyncMap>
          <ControlSection>
            <h1>hesdsllo</h1>
          </ControlSection>
        </SyncMap>
        <SyncMap>
          <ControlSection>
            <h1>hello</h1>
          </ControlSection>
        </SyncMap>
      </SyncMapGroup>
    </div>
  );
};

export default Test;
