export const getApplePosition = (fieldSize, excludes) => {
  while (true) {
    const x = Math.floor(Math.random() * (fieldSize - 1 - 1)) + 1;
    const y = Math.floor(Math.random() * (fieldSize - 1 - 1)) + 1;
    const conflict = excludes.some((item) => item.x === x && item.y === y);
    if (!conflict) {
      return { x, y };
    }
  }
};

export const initFields = (fieldSize, snake) => {
  const fields = [];
  for (let i = 0; i < fieldSize; i++) {
    const cols = new Array(fieldSize).fill("");
    fields.push(cols);
  }

  fields[snake.y][snake.x] = "snake";

  const apple = getApplePosition(fieldSize, [snake]);
  fields[apple.y][apple.x] = "apple";

  return fields;
};

export const isCollision = (fieldSize, position) => {
  if (position.y < 0 || position.x < 0) {
    return true;
  }
  if (position.y > fieldSize - 1 || position.x > fieldSize - 1) {
    return true;
  }
  return false;
};

export const isEatingMyself = (fields, position) => {
  return fields[position.y][position.x] === "snake";
};
