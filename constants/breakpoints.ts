export const BREAKPOINTS = {
  MOBILE_MIN: 320,
  MOBILE_ADAPTIVE: 393,
  TABLET: 768,
  DESKTOP: 1440,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
