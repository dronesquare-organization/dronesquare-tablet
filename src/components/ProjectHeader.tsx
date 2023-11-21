import { ChangeEvent, useCallback } from "react";
import { debounce } from "lodash-es";
import { css } from "@emotion/react";
import { AiOutlineSearch } from "react-icons/ai";
import { BUTTON_COLOR, COLOR } from "../style";

export default function ProjectHeader({
  changeInputAddress,
}: {
  changeInputAddress: (value: string) => void;
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

const ProjectTableContainer = css`
  padding: 0 10%;
  height: 50px;

  border-bottom: 1px solid ${COLOR.Gray750};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
`;

const SearchDiv = css`
  width: 160px;
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
  width: 140px;
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
