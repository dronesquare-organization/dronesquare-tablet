import { Loader } from "rsuite";
import { css } from "@emotion/react";

const BigLoadingIndicator = ({ description }: { description: string }) => {
  return (
    <Loader
      center
      css={loaderStyle}
      size="lg"
      speed="slow"
      backdrop
      vertical
      content={description}
    />
  );
};

const loaderStyle = css`
  z-index: 100;
  font-size: 20px;
`;

export default BigLoadingIndicator;
