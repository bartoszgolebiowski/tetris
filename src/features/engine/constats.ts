export const KEYBOARD_KEYS = {
  LEFT_ARROW: "arrowleft",
  RIGHT_ARROW: "arrowright",
  DOWN_ARROW: "arrowdown",
  SPACE: "",
  R: "r",
} as const;

export type KeyboardValues = typeof KEYBOARD_KEYS[keyof typeof KEYBOARD_KEYS];
