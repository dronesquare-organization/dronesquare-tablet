import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font: inherit;
          color: inherit;
          background-color: transparent;
        }
        html {
          font-family: "Noto Sans KR", "Inter", sans-serif;
        }
        body {
          -ms-overflow-style: none;
          color: white;
        }

        ::-webkit-scrollbar {
          display: none;
        }
        ol,
        ul {
          list-style: none;
          margin: 0;
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
