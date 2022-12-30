import React, { useEffect, useState } from "react";

export const BuildspaceLogo = () => {
  const svgId = "buildspace";

  const originalSvg = (
    <div className="absolute overflow-hidden top-0 left-0 h-0 w-0">
      <svg
        width="235"
        height="200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        id={svgId}
      >
        <path d="m94.005 16.289 9.332-9.734c6.691-7.787 19.567-9.414 27.769-.608l98.837 106.12c8.145 8.745 6.021 22.797-4.345 28.744l-98.837 56.701c-6.811 3.907-14.546 2.957-20.123-1.067L9.325 140.618c-10.366-5.947-12.49-19.999-4.345-28.744a11.812 11.812 0 0 1 14.55-2.179l87.108 50.119v-37.648L49.802 89.674c-8.026-4.643-9.659-15.539-3.348-22.33l.012-.013.009-.01a14.441 14.441 0 0 1 17.779-2.654l42.384 24.013V52.34l-13.484-8.485c-8.26-4.77-15.716-9.779-9.215-16.758l10.066-10.808Z"></path>
      </svg>
    </div>
  );

  return (
    <div>
      {originalSvg}
      <div style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
          viewBox="0 -16 235 235"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          className="text-gray-700 fill-current"
        >
          <use href="#buildspace"></use>
        </svg>
      </div>
    </div>
  );
};
