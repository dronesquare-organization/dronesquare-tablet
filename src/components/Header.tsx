import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { MdRefresh, MdOutlineArrowBack } from "react-icons/md";
import useAuthentication from "../hooks/useAuthentication";
import { COLOR } from "../style";
import { useGetProject } from "../query/queries";
import { AiOutlineGlobal } from "react-icons/ai";
import useLocale from "../hooks/useLocale";
import { localeString } from "../utils/localeString";
import { useCallback, useEffect } from "react";

export default function Header({ projectId }: { projectId?: number }) {
  const navigate = useNavigate();
  const { locale, setLocale } = useLocale();

  const { data: projectData } = useGetProject(Number(projectId));
  const { data: currentUser, signOut } = useAuthentication();

  const toggleLocale = useCallback(() => {
    if (locale.locale === "ko") {
      setLocale({ locale: "en" });
      localStorage.setItem("ds-locale", "en");
    } else {
      setLocale({ locale: "ko" });
      localStorage.setItem("ds-locale", "ko");
    }
  }, [locale]);

  useEffect(() => {
    const locale = localStorage.getItem("ds-locale") as "en" | "ko";
    if (locale) {
      setLocale({ locale });
    }
  }, []);

  return (
    <header css={headerStyle}>
      <section css={flexStyle}>
        <div
          css={css`
            display: flex;
          `}
        >
          <button
            css={navigateButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            <MdOutlineArrowBack size={24} />
          </button>
          <button css={navigateButton} onClick={() => navigate(0)}>
            <MdRefresh size={24} />
          </button>
        </div>
        <div
          css={logoButton}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/logo_dronesquare_white.png" alt="logo" />
        </div>
      </section>
      <div
        css={css`
          margin: 0;
          font-size: large;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          word-break: keep-all;
          margin-right: 30px;
        `}
      >
        {projectData &&
          `${projectData.data.title} | ${projectData.data.infra_class} | ${projectData.data.address}`}
      </div>
      <nav>
        <ul css={flexStyle}>
          <li>
            <button
              onClick={() => {
                if (currentUser) {
                  signOut();
                } else {
                  navigate("/login");
                }
              }}
              css={css`
                width: 100%;
                margin-right: 30px;
                word-break: keep-all;
              `}
            >
              {currentUser
                ? localeString.header.logout[locale.locale]
                : localeString.header.login[locale.locale]}
            </button>
          </li>
          <li
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 2px;
              word-break: keep-all;
              width: 100%;
            `}
          >
            <AiOutlineGlobal />
            <button
              css={css`
                outline: none;
                border: none;
                padding: 4px;
                font-weight: ${locale.locale === "ko" ? 700 : 400};
                color: ${locale.locale === "ko" ? "white" : "#797979"};
              `}
              onClick={toggleLocale}
            >
              ko
            </button>
            /
            <button
              css={css`
                outline: none;
                border: none;
                padding: 4px;
                font-weight: ${locale.locale === "en" ? 700 : 400};
                color: ${locale.locale === "en" ? "white" : "#797979"};
              `}
              onClick={toggleLocale}
            >
              en
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const flexStyle = css`
  display: flex;
  align-items: center;
`;

const headerStyle = css`
  ${flexStyle};
  font-size: 16px;
  justify-content: space-between;
  height: 57px;
  padding: 0 20px;
  border-bottom: 1px solid ${COLOR.Gray550};
`;

const logoButton = css`
  margin: 0 5px;
`;

const navigateButton = css`
  outline: none;
  border: none;
  padding-right: 10px;
  line-height: 0;
`;
