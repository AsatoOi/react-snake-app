import { useCallback, useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Field } from "./components/Field";
import { Button } from "./components/Button";
import {
  initPosition,
  initValue,
  defaultInterval,
  defaultDifficulty,
  Difficulty,
  GameStatus,
  Direction,
  OppositeDirection,
  Diff,
  KeyCode,
} from "./constants";
import {
  initFields,
  getApplePosition,
  isCollision,
  isEatingMyself,
} from "./utils";

let timer = null;

const unsubscribe = () => {
  if (!timer) {
    return;
  }
  clearInterval(timer);
};

export const App = () => {
  const [fields, setFields] = useState(initValue);
  const [body, setBody] = useState([]);
  const [status, setStatus] = useState(GameStatus.init);
  const [direction, setDirection] = useState(Direction.up);
  const [difficulty, setDifficulty] = useState(defaultDifficulty);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setBody([initPosition]);
    const interval = Difficulty[difficulty - 1];
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, interval);
    return unsubscribe;
  }, [difficulty]);

  useEffect(() => {
    if (body.length === 0 || status !== GameStatus.playing) {
      return;
    }
    const canContinue = handleMoving();
    if (!canContinue) {
      unsubscribe();
      setStatus(GameStatus.gameOver);
    }
    // eslint-disable-next-line
  }, [tick]);

  const onStart = () => setStatus(GameStatus.playing);
  const onStop = () => setStatus(GameStatus.suspended);
  const onRestart = () => {
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, defaultInterval);
    setStatus(GameStatus.init);
    setBody([initPosition]);
    setDirection(Direction.up);
    setFields(initFields(fields.length, initPosition));
  };
  const onChangeDirection = useCallback(
    (newDirection) => {
      if (status !== GameStatus.playing) {
        return;
      }
      if (OppositeDirection[direction] === newDirection) {
        return;
      }
      setDirection(newDirection);
    },
    [direction, status]
  );
  const onChangeDifficulty = useCallback(
    (difficulty) => {
      if (status !== GameStatus.init) {
        return;
      }
      if (difficulty < 1 || difficulty > Difficulty.length) {
        return;
      }
      setDifficulty(difficulty);
    },
    [status]
  );
  useEffect(() => {
    const handleKeyDown = (event) => {
      const newDirection = KeyCode[event.keyCode];
      if (!newDirection) {
        return;
      }
      onChangeDirection(newDirection);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener[("keydown", handleKeyDown)];
  }, [onChangeDirection]);

  const handleMoving = () => {
    const { x, y } = body[0];
    const diff = Diff[direction];
    const newPosition = {
      x: x + diff.x,
      y: y + diff.y,
    };
    if (
      isCollision(fields.length, newPosition) ||
      isEatingMyself(fields, newPosition)
    ) {
      return false;
    }
    const newBody = [...body];
    if (fields[newPosition.y][newPosition.x] !== "apple") {
      const removingTrack = newBody.pop();
      fields[removingTrack.y][removingTrack.x] = "";
    } else {
      const apple = getApplePosition(fields.length, [...newBody, newPosition]);
      fields[apple.y][apple.x] = "apple";
    }
    fields[newPosition.y][newPosition.x] = "snake";
    newBody.unshift(newPosition);
    setBody(newBody);
    setFields(fields);
    return true;
  };

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation
          length={body.length}
          difficulty={difficulty}
          onChangeDifficulty={onChangeDifficulty}
        />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button
          status={status}
          onStart={onStart}
          onStop={onStop}
          onRestart={onRestart}
        />
      </footer>
    </div>
  );
};
