import { Table } from "rsuite";
import { css } from "@emotion/react";
import { getFlagOfProcess } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProjectType } from "../query/model";

export default function ProjectTable({ data }: ProjectsDataType) {
  const navigate = useNavigate();

  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState<keyof ProjectType>();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];
        let numberX = 0;
        let numberY = 0;
        if (sortColumn === "updated" || sortColumn === "created") {
          numberX = new Date(x as string).getTime();
          numberY = new Date(y as string).getTime();
          if (sortType === "asc") {
            return numberX - numberY;
          } else {
            return numberY - numberX;
          }
        }
        if (typeof x === "number" && typeof y === "number") {
          numberX = x;
          numberY = y;
        }

        if (typeof x === "string" && typeof y === "string") {
          numberX = x.charCodeAt(0);
          numberY = y.charCodeAt(0);
        }
        if (sortType === "asc") {
          return numberX - numberY;
        } else {
          return numberY - numberX;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <div css={tableContainer}>
      <Table
        autoHeight={true}
        rowHeight={60}
        loading={false}
        bordered={true}
        data={getData() as ProjectType[]}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        // cellBordered={true}
        // width={1024}
        onRowClick={(rowData) => {
          navigate(`/multiview/${rowData.id}`);
        }}
      >
        <Column minWidth={200} flexGrow={2} verticalAlign="center" sortable>
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
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>인프라 타입</HeaderCell>
          <Cell dataKey="infra_class" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>객체 타입</HeaderCell>
          <Cell dataKey="infra_type" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>생성 날짜</HeaderCell>
          <Cell dataKey="created">
            {(rowData) => `${rowData.created.split(" ")[0]}`}
          </Cell>
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>수정 날짜</HeaderCell>
          <Cell dataKey="updated">
            {(rowData) =>
              `${
                rowData.updated === null ? "-" : rowData.updated.split(" ")[0]
              }`
            }
          </Cell>
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>드론 이미지 수</HeaderCell>
          <Cell dataKey="image_count" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
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
