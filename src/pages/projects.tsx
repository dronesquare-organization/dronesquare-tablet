import { useState } from "react";
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

  if (!data) return;
  return (
    <DefaultLayout>
      <ProjectHeader
        changeInputAddress={changeInputAddress}
        projectCount={data.data.length}
      />
      <ProjectTable data={data.data} />
    </DefaultLayout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Projects, { needLogin: true });
