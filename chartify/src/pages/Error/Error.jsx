import React, { memo } from "react";

const Error = () => {
  return (
    <div className="flex min-h-dvh justify-center items-center">
      <h1>Error 404: Page does not exists</h1>
    </div>
  );
};

export default memo(Error);
