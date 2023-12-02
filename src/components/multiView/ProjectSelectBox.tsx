import { useState } from "react";
import { css } from "@emotion/react";
import { useGetGroupOfTimeseries, useGetProject } from "../../query/queries";

interface ProjectSelectBox {
  projectId: number;
  selectedProjectId?: number;
  handleSelectChange?: (id: number) => void;
}

export default function ProjectSelectBox({
  projectId,
  selectedProjectId,
  handleSelectChange,
}: ProjectSelectBox) {
  // selectedProjectId를 prop으로 내려주지 않는 경우
  const [checkedProjectId, setCheckedProjectId] = useState(projectId);

  const { data: projectData } = useGetProject(
    selectedProjectId ?? checkedProjectId
  );
  const { data: timeseriseGroupData } = useGetGroupOfTimeseries(projectId);

  if (!timeseriseGroupData || !projectData) return;

  return (
    <select
      name="project-list"
      id="project-list"
      css={selectBox}
      value={selectedProjectId ? selectedProjectId : checkedProjectId}
      onChange={(e) => {
        if (!selectedProjectId) {
          setCheckedProjectId(Number(e.target.value!));
        }
        if (handleSelectChange) {
          handleSelectChange(Number(e.target.value!));
        }
      }}
    >
      {timeseriseGroupData.data ? (
        timeseriseGroupData.data.children?.map((project) => (
          <option key={project.id} value={project.id}>
            {project.label}
          </option>
        ))
      ) : (
        <option value={projectData?.data.id}>{projectData?.data.title}</option>
      )}
    </select>
  );
}

const selectBox = css`
  background-color: #41454a;
  appearance: none;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBkPSJNMCA3LjMzbDIuODI5LTIuODMgOS4xNzUgOS4zMzkgOS4xNjctOS4zMzkgMi44MjkgMi44My0xMS45OTYgMTIuMTciIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  padding: 5px 40px 5px 10px;
`;
