export const colors = {
  blue: "#2ea3f0",
  green: "#50df28",
  lightBlue: "#2ce9ef",
  orange: "#fc8e23",
  pink: "#ec28ea",
  red: "#e62121",
  violet: "#7a24e8",
  yellow: "#fcf324",
  black: "#343434",
  transparent: "",
} as const;

export type BlockKeys = keyof typeof blocks;

export const blocks = {
  s1: {
    color: "green",
    positions: [
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  square: {
    color: "orange",
    positions: [
      [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  line: {
    color: "violet",
    positions: [
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
      ],
    ],
  },
  t: {
    color: "lightBlue",
    positions: [
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  l1: {
    color: "blue",
    positions: [
      [
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  s2: {
    color: "red",
    positions: [
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  l2: {
    color: "pink",
    positions: [
      [
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  // out of scope
  rectangle: {
    color: "yellow",
    positions: [
      [
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
} as const;

export const allBlocksVariants = Object.keys(blocks)
  .map((key) => {
    const typedKey = key as BlockKeys;
    const block = blocks[typedKey];
    return block;
  })
  .flat();

export type ColorsKeys = keyof typeof colors;

export type BoardCell = {
  value: 0 | 1;
  color: ColorsKeys;
};

const emptyBlock = (): BoardCell => ({
  value: 0,
  color: "black",
});

const transparentBlock = (): BoardCell => ({
  value: 0,
  color: "transparent",
});

export const ROWS_QUANTITY = 18;
export const COLUMNS_QUANTITY = 10;

export const emptyBoard: BoardCell[][] = Array.from(
  { length: ROWS_QUANTITY },
  (_, i) => Array.from({ length: COLUMNS_QUANTITY }, (_, i) => 0)
).map((row) => row.map(emptyBlock));

export const transparentBoard: BoardCell[][] = Array.from(
  { length: ROWS_QUANTITY },
  (_, i) => Array.from({ length: COLUMNS_QUANTITY }, (_, i) => 0)
).map((row) => row.map(transparentBlock));
