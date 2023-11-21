import { useState } from "react";
import { Table } from "rsuite";
import { css } from "@emotion/css";
import { getFlagOfProcess } from "../utils";
import ProjectHeader from "../components/ProjectHeader";
import withAuth from "../hoc/withAuth";
import { useGetSearchProjectList } from "../query/queries";
import DefaultLayout from "../layout/DefaultLayout";

// eslint-disable-next-line react-refresh/only-export-components
function Projects() {
  const { Column, HeaderCell, Cell } = Table;
  const [searchInputAddress, setSearchInputAddress] = useState<string>("");
  const { data } = useGetSearchProjectList(searchInputAddress);
  const changeInputAddress = (value: string) => {
    setSearchInputAddress(value);
    console.log("searchInputAddress", value);
  };

  return (
    <DefaultLayout>
      {/* <div>Projects</div> */}

      <ProjectHeader changeInputAddress={changeInputAddress} />
      <div css={tableContainer}>
        <Table
          autoHeight={true}
          rowHeight={60}
          data={data?.data}
          loading={false}
          width={1024}
          onRowClick={(rowData) => {
            console.log("RowData", rowData);
          }}
        >
          <Column minWidth={180} flexGrow={1} align="center">
            <HeaderCell>프로젝트 명</HeaderCell>
            <Cell dataKey="title" />
          </Column>
          <Column minWidth={180} flexGrow={1} align="center">
            <HeaderCell>주소</HeaderCell>
            <Cell dataKey="address" />
          </Column>
          <Column align="center">
            <HeaderCell>인프라 타입</HeaderCell>
            <Cell dataKey="infra_class" />
          </Column>
          <Column align="center">
            <HeaderCell>객체 타입</HeaderCell>
            <Cell dataKey="infra_type" />
          </Column>
          <Column align="center">
            <HeaderCell>생성 날짜</HeaderCell>
            <Cell dataKey="created">
              {(rowData) => `${rowData.created.split(" ")[0]}`}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>수정 날짜</HeaderCell>
            <Cell dataKey="updated">
              {(rowData) =>
                `${
                  rowData.updated === null ? "-" : rowData.updated.split(" ")[0]
                }`
              }
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>드론 이미지 수</HeaderCell>
            <Cell dataKey="image_count" />
          </Column>
          <Column align="center">
            <HeaderCell>이미지 매핑</HeaderCell>
            <Cell dataKey="current_state">
              {(rowData) => `${getFlagOfProcess(rowData.current_state)}`}
            </Cell>
          </Column>
        </Table>
      </div>
    </DefaultLayout>
  );
}

const tableContainer = css`
  display: flex;
  justify-content: center;
  background-color: yellow;
`;
// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Projects, { needLogin: true });
