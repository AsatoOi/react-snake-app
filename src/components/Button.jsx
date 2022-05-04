import React from "react";

import { GameStatus } from "../constants";

export const Button = ({ status, onStart, onStop, onRestart }) => {
  return (
    <div className="button">
      {status === GameStatus.gameOver ? (
        <button onClick={onRestart} className="btn btn-gameover">
          game over
        </button>
      ) : status === GameStatus.init ? (
        <button onClick={onStart} className="btn btn-init">
          start
        </button>
      ) : status === GameStatus.suspended ? (
        <button onClick={onStart} className="btn btn-suspended">
          start
        </button>
      ) : (
        //status === GameStatus.playing
        <button onClick={onStop} className="btn btn-playing">
          stop
        </button>
      )}
    </div>
  );
};
