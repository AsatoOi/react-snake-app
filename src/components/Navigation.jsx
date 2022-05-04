import React from "react";

import { Difficulty } from "../constants";

export const Navigation = ({ length, difficulty, onChangeDifficulty }) => {
  const upVisibility = difficulty < Difficulty.length ? "" : "is-hidden";
  const downVisibility = difficulty > 1 ? "" : "is-hidden";
  const onUpDifficulty = () => onChangeDifficulty(difficulty + 1);
  const onDownDifficulty = () => onChangeDifficulty(difficulty - 1);
  return (
    <div className="navigation">
      <div className="navigation-item">
        <span className="navigation-label">Length: </span>
        <div className="navigation-item-number-container">
          <div className="num-board">{length}</div>
        </div>
      </div>
      <div className="navigation-item">
        <span className="navigation-label">Difficulty: </span>
        <div className="navigation-item-number-container">
          <span className="num-board">{difficulty}</span>
          <div className="difficulty-button-container">
            <div
              className={`difficulty-button difficulty-up ${upVisibility}`}
              onClick={onUpDifficulty}
            ></div>
            <div
              className={`difficulty-button difficulty-down ${downVisibility}`}
              onClick={onDownDifficulty}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
