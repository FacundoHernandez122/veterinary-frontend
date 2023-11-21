import React from "react";

function Alert({ alert }) {
  return (
    <div
      className={`${
        alert.error
          ? `opacity-90 text-white text-center from-red-600 to-red-900`
          : `from-cyan-500 to-cyan-700 text-white text-center opacity-90`
      } bg-gradient-to-br p-2 rounded-xl uppercase font-bold text-sm mb-5  `}
    >
      {alert.msg}
    </div>
  );
}

export default Alert;
