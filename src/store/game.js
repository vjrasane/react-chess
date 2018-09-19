import { times } from "lodash";
import { forLetter, Pawn } from "../pieces";
import { Coordinates } from "../Coordinates";

const officers = (color, row) =>
  "RNBQKBNR".split("").map((l, i) => ({
    type: forLetter(l)[color],
    coordinates: new Coordinates(i, row)
  }));

const pawns = color =>
  times(8, c => ({
    type: Pawn[color],
    coordinates: new Coordinates(c, Pawn[color].startRow)
  }));

const init = {
  turn: "white",
  castling: {
    white: ["kings", "queens"],
    black: ["kings", "queens"]
  },
  pieces: [
    ...officers("white", 1),
    ...officers("black", 6),
    ...pawns("white"),
    ...pawns("black")
  ]
};

export default (state = [], action) => {
  switch (action.type) {
    case "INIT_GAME":
      return [init];
    default:
      return state;
  }
};
