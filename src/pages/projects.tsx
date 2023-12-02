import { useState } from "react";

import { css } from "@emotion/css";

import ProjectHeader from "../components/ProjectHeader";
import withAuth from "../hoc/withAuth";
import { useGetSearchProjects } from "../query/queries";
import DefaultLayout from "../layout/DefaultLayout";
import ProjectTable from "../components/ProjectTable";

// eslint-disable-next-line react-refresh/only-export-components
function Projects() {
  const [searchInputAddress, setSearchInputAddress] = useState<string>("");
  const { data } = useGetSearchProjects(searchInputAddress);
  const changeInputAddress = (value: string) => {
    setSearchInputAddress(value);
  };

  return (
    <DefaultLayout>
      {/* <div>Projects</div> */}

      <ProjectHeader
        changeInputAddress={changeInputAddress}
        projectCount={data ? data.data.length : 0}
      />
      <div
        css={css`
          margin: 0 30px;
        `}
      >
        <ProjectTable data={data ? data.data : []} />
      </div>
    </DefaultLayout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Projects, { needLogin: true });
