import { useState, useEffect } from "react";

import { Navigation } from "./components/Navigation";
import { Field } from "./components/Field";
import { Button } from "./components/Button";
import { Controller } from "./components/Controller";
import { initFields } from "./utils";

const initPosition = { x: 17, y: 17 };
const initValue = initFields(35, initPosition);
const defaultInterval = 100;
const GameStatus = {
  init: "initial",
  playing: "playing",
  suspended: "suspended",
  gameOver: "gameOver",
};

let timer = undefined;

const unsubscribe = () => {
  if (!timer) {
    return;
  }
  clearInterval(timer);
};

export const App = () => {
  const [fields, setFields] = useState(initValue);
  const [position, setPosition] = useState(initPosition);
  const [status, setStatus] = useState(GameStatus.init);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, defaultInterval);
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (!position || status !== GameStatus.playing) {
      return;
    }
    goUp();
    // eslint-disable-next-line
  }, [tick]);

  const goUp = () => {
    const { x, y } = position;
    const nextY = Math.max(y - 1, 0);
    fields[y][x] = "";
    fields[nextY][x] = "snake";
    setPosition({ x, y: nextY });
    setFields(fields);
  };
  const onStart = () => setStatus(GameStatus.playing);

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <div style={{ padding: "16px" }}>
        <button onClick={goUp}>進む</button>
      </div>
      <footer className="footer">
        <Button onStart={onStart} />
        <Controller />
      </footer>
    </div>
  );
};
