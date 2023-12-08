import { Table } from "rsuite";
import { css } from "@emotion/react";
import { getFlagOfProcess } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProjectType, ProjectsDataType } from "../query/model";
import { localeString } from "../utils/localeString";
import useLocale from "../hooks/useLocale";
import { SortType } from "rsuite/esm/Table";

export default function ProjectTable({ data }: ProjectsDataType) {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState<keyof ProjectType>();
  const [sortType, setSortType] = useState<SortType>();

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

  const handleSortColumn = (
    dataKey: string,
    sortType: SortType | undefined
  ) => {
    setTimeout(() => {
      setSortColumn(dataKey as keyof ProjectType);
      setSortType(sortType);
    }, 500);
  };

  return (
    <div css={tableContainer}>
      <Table
        autoHeight={true}
        rowHeight={60}
        loading={false}
        data={getData() as ProjectType[]}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        // bordered={true}
        // cellBordered={true}
        // width={1024}
        onRowClick={(rowData) => {
          navigate(`/multiview/${rowData.id}`);
        }}
      >
        <Column minWidth={200} flexGrow={2} verticalAlign="center" sortable>
          <HeaderCell align="center">
            {localeString.projects.projectName[locale.locale]}
          </HeaderCell>
          <Cell dataKey="title" />
        </Column>
        <Column
          minWidth={200}
          flexGrow={2}
          verticalAlign="center"
          //   fullText={true}
        >
          <HeaderCell align="center">
            {localeString.projects.address[locale.locale]}
          </HeaderCell>
          <Cell dataKey="address" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>
            {localeString.projects.address[locale.locale]}
          </HeaderCell>
          <Cell dataKey="infra_class" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>
            {localeString.projects.objectType[locale.locale]}
          </HeaderCell>
          <Cell dataKey="infra_type" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>
            {localeString.projects.createdDate[locale.locale]}
          </HeaderCell>
          <Cell dataKey="created">
            {(rowData) => `${rowData.created.split(" ")[0]}`}
          </Cell>
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>
            {localeString.projects.updatedDate[locale.locale]}
          </HeaderCell>
          <Cell dataKey="updated">
            {(rowData) =>
              `${
                rowData.updated === null ? "-" : rowData.updated.split(" ")[0]
              }`
            }
          </Cell>
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>
            {localeString.projects.droneImagesCount[locale.locale]}
          </HeaderCell>
          <Cell dataKey="image_count" />
        </Column>
        <Column align="center" verticalAlign="center" sortable>
          <HeaderCell>
            {localeString.projects.droneImageMapping[locale.locale]}
          </HeaderCell>
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
  border: 1px solid #2a2c38;
  border-radius: 5px;
`;
