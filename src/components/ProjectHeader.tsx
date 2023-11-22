import { ChangeEvent, useCallback } from "react";
import { debounce } from "lodash-es";
import { css } from "@emotion/react";
import { AiOutlineSearch } from "react-icons/ai";
import { BUTTON_COLOR, COLOR } from "../style";

export default function ProjectHeader({
  changeInputAddress,
  projectCount,
}: {
  changeInputAddress: (value: string) => void;
  projectCount: number;
}) {
  const handleSearchAddress = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounceAddress(e.target.value);
    },
    []
  );

  const debounceAddress = debounce((item) => {
    changeInputAddress(item);
  }, 300);

  return (
    <div css={ProjectTableContainer}>
      <div css={flexStyle}>
        <h1 css={h1Style}>프로젝트</h1>
        <p css={pStyle}>{projectCount} 프로젝트</p>
      </div>
      <div css={SearchDiv}>
        <input
          type="text"
          placeholder="검색"
          onChange={handleSearchAddress}
          css={searchInput}
        />
        <AiOutlineSearch size={23} css={SearchIcon} />
      </div>
    </div>
  );
}

const flexStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellow; */
`;

const ProjectTableContainer = css`
  ${flexStyle};

  padding: 15px 40px;
  /* width: 100%; */
`;

const h1Style = css`
  font-size: 32px;

  line-height: normal;
`;

const pStyle = css`
  font-size: 16px;
  margin-top: 2px;
  margin-left: 15px;
`;

const SearchDiv = css`
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${COLOR.Gray750};
  display: flex;
  align-items: center;
  opacity: 1;
  :focus {
    border-color: ${BUTTON_COLOR.Primary};
    outline: ${BUTTON_COLOR.Primary};
  }
  :hover {
    border-color: ${BUTTON_COLOR.Primary};
  }
`;

const searchInput = css`
  width: 180px;
  border: none;
  margin-left: 10px;
  overflow: auto;
  font-size: 15px;
  :focus {
    border: none;
    outline: none;
  }
`;

const SearchIcon = css`
  margin: 5px 10px 3px 0;
  &:hover {
    cursor: pointer;
  }
`;
