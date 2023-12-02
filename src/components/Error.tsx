import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { Button } from "rsuite";

const Error = ({
  code,
  description,
}: {
  code: string;
  description: string;
  icon?: string;
}) => {
  const navigate = useNavigate();
  const isNumeric = useMemo((): boolean => {
    if (Number(code)) {
      return true;
    } else {
      // NaN
      return false;
    }
  }, [code]);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            width: 100px;
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.8}
            stroke="#A2A5AD"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <div
          css={css`
            font-size: 40px;
            margin-bottom: 0px;
            padding-bottom: 0px;
            font-weight: 650;
            white-space: pre-line;
            text-align: center;
          `}
        >
          {description}
        </div>
        {isNumeric ? (
          <div
            css={css`
              font-size: 30px;
              color: #a2a5ad;
              margin-top: 10px;
            `}
          >
            Error Code : {code}
          </div>
        ) : (
          <div
            css={css`
              font-size: 18px;
              margin-top: 10px;
            `}
          >
            {code}
          </div>
        )}

        <div
          css={css`
            margin-top: 20px;
          `}
        >
          <Button
            css={css`
              font-size: 20px;
              width: 200px;
              background-color: white;
              color: black;
              font-weight: 500;
            `}
            size="lg"
            ripple={true}
            onClick={() => navigate("/")}
          >
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
