import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: transparent;
          color: white;
        }
        html {
          font-family: "Noto Sans KR", "Inter", sans-serif;
        }
        body {
          -ms-overflow-style: none;
          background-color: black;
        }

        ::-webkit-scrollbar {
          display: none;
        }
        ol,
        ul {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: "";
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
      `}
    />
  );
}
