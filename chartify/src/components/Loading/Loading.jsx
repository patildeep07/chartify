import React, { memo } from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[80dvh]">
      <h1 className="font-bold text-3xl">Loading...</h1>
    </div>
  );
};

export default memo(Loading);
