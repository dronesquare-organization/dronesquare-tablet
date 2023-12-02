import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdRefresh, MdOutlineArrowBack } from "react-icons/md";
import useAuthentication from "../hooks/useAuthentication";
import { COLOR } from "../style";
import { useGetProject } from "../query/queries";
import { breakPoint } from "../store/breakPoint";
import { useRecoilValue } from "recoil";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.pathname.split("/").pop();
  const { data: projectData } = useGetProject(Number(projectId));
  const { data: currentUser, signOut } = useAuthentication();
  const size = useRecoilValue(breakPoint);
  console.log("size", size);
  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
        `}
      >
        <div>isWide: {size.isWide ? "true" : "false"}</div>
        <div>isSmall: {size.isSmall ? "true" : "false"}</div>
        <div>isDisabled: {size.isDisabled ? "true" : "false"}</div>
      </div>
      <header css={headerStyle}>
        <section css={flexStyle}>
          <div
            css={css`
              /* display: flex; */
              width: 80px;

              background-color: red;
            `}
          >
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <MdOutlineArrowBack size={24} />
            </button>
            <button onClick={() => navigate(0)}>
              <MdRefresh size={24} />
            </button>
          </div>
          <div
            css={logoStyle}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="/logo_dronesquare_white.png" alt="logo" />
          </div>
          <div
            css={css`
              margin: 0;
              /* width: 100%; */

              font-size: large;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              word-break: keep-all;
            `}
          >
            {projectData &&
              `${projectData.data.title} | ${projectData.data.infra_class} | ${projectData.data.address}`}
          </div>
        </section>
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
                  /* width: 100%; */
                  word-break: keep-all;
                `}
              >
                {currentUser ? "로그아웃" : "로그인"}
              </button>
            </li>
            <li>
              <button>ko/en</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

const flexStyle = css`
  display: flex;
  align-items: center;
`;

const headerStyle = css`
  ${flexStyle};

  justify-content: space-between;
  height: 57px;
  padding: 0 10px;
  border-bottom: 1px solid ${COLOR.Gray550};
  button {
    border: none;
    line-height: 0;
    padding: 8px;
    font-size: 16px;
  }
`;

const logoStyle = css`
  line-height: 0;
  margin-left: 10px;
`;
