// Loading.js

import React from "react";
import { css } from "@emotion/react";
import { ClockLoader } from "react-spinners";
import "../styles/style.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <ClockLoader color={"#123abc"} loading={true} css={css`loading-override`} size={60} />
    </div>
  );
};

export default Loading;
