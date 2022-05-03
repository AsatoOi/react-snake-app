export const initFields = (fieldSize, initPosition) => {
  const fields = [];
  for (let i = 0; i < fieldSize; i++) {
    const cols = new Array(fieldSize).fill("");
    fields.push(cols);
  }

  fields[initPosition.y][initPosition.x] = "snake";

  return fields;
};
