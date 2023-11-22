import { Table } from "rsuite";
import { css } from "@emotion/react";
import { ProjectsDataType } from "../query/repository";
import { getFlagOfProcess } from "../utils";
import { useNavigate } from "react-router-dom";

export default function ProjectTable({ data }: ProjectsDataType) {
  const { Column, HeaderCell, Cell } = Table;
  const navigate = useNavigate();
  return (
    <div css={tableContainer}>
      <Table
        autoHeight={true}
        rowHeight={60}
        data={data}
        loading={false}
        bordered={true}
        // cellBordered={true}
        // width={1024}
        onRowClick={(rowData) => {
          navigate(`/multiview/${rowData.id}`);
        }}
      >
        <Column minWidth={80} flexGrow={1} verticalAlign="center">
          <HeaderCell align="center">프로젝트 명</HeaderCell>
          <Cell dataKey="title" />
        </Column>
        <Column
          minWidth={200}
          flexGrow={2}
          verticalAlign="center"

          //   fullText={true}
        >
          <HeaderCell align="center">주소</HeaderCell>
          <Cell dataKey="address" />
        </Column>
        <Column align="center" verticalAlign="center">
          <HeaderCell>인프라 타입</HeaderCell>
          <Cell dataKey="infra_class" />
        </Column>
        <Column align="center" verticalAlign="center">
          <HeaderCell>객체 타입</HeaderCell>
          <Cell dataKey="infra_type" />
        </Column>
        <Column align="center" verticalAlign="center">
          <HeaderCell>생성 날짜</HeaderCell>
          <Cell dataKey="created">
            {(rowData) => `${rowData.created.split(" ")[0]}`}
          </Cell>
        </Column>
        <Column align="center" verticalAlign="center">
          <HeaderCell>수정 날짜</HeaderCell>
          <Cell dataKey="updated">
            {(rowData) =>
              `${
                rowData.updated === null ? "-" : rowData.updated.split(" ")[0]
              }`
            }
          </Cell>
        </Column>
        <Column align="center" verticalAlign="center">
          <HeaderCell>드론 이미지 수</HeaderCell>
          <Cell dataKey="image_count" />
        </Column>
        <Column align="center" verticalAlign="center">
          <HeaderCell>이미지 매핑</HeaderCell>
          <Cell dataKey="current_state">
            {(rowData) => `${getFlagOfProcess(rowData.current_state)}`}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}
const tableContainer = css`
  margin: 0 20px;
  // 가운데 정렬 어캐
`;
