import { ChangeEvent, useCallback } from "react";
import { debounce } from "lodash-es";
import { css } from "@emotion/react";
import { AiOutlineSearch } from "react-icons/ai";
import { BUTTON_COLOR, COLOR } from "../style";
import useLocale from "../hooks/useLocale";
import { localeString } from "../utils/localeString";

export default function ProjectHeader({
  changeInputAddress,
  projectCount,
}: {
  changeInputAddress: (value: string) => void;
  projectCount: number;
}) {
  const { locale } = useLocale();

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
        <h1 css={h1Style}>{localeString.projects.project[locale.locale]}</h1>
        <p css={pStyle}>
          {projectCount} {localeString.projects.project[locale.locale]}
        </p>
      </div>
      <div css={SearchDiv}>
        <input
          type="text"
          placeholder={localeString.projects.search[locale.locale]}
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
`;

const ProjectTableContainer = css`
  ${flexStyle};
  padding: 20px 35px 25px;
`;

const h1Style = css`
  font-size: 28px;
  line-height: normal;
`;

const pStyle = css`
  font-size: 16px;
  margin-top: 5px;
  margin-left: 15px;
  color: ${COLOR.Gray400};
`;

const SearchDiv = css`
  display: flex;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${COLOR.Gray650};
  display: flex;
  align-items: center;
  line-height: 0;
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
