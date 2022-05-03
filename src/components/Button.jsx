import React from "react";

export const Button = ({ onStart }) => {
  return (
    <div className="button">
      <button onClick={onStart}>start</button>
    </div>
  );
};
