export const EventKeys = {
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
} as const;

export type EventKey = (typeof EventKeys)[keyof typeof EventKeys];

export const CssClasses = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",

  NO_RIGHT: "no-right",
  NO_LEFT: "no-left",

  PLAYER: "player",
  FLIP: "flip",
} as const;

export type CssClass = (typeof CssClasses)[keyof typeof CssClasses];
