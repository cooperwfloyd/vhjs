import type {Vh, VhCalc} from "./types/vhjs";

export const vhCalc: VhCalc = () => {
  let previousWidth = window.innerWidth;
  let minAvailHeight: number | null = null;

  const calcMinAvailHeight = (): void => {
    const innerHeight = window.innerHeight;
    const screenHeight = window.screen.height;

    if (screenHeight === innerHeight) {
      minAvailHeight = innerHeight;
      return;
    }

    const innerWidth = window.innerWidth;
    const visualViewportHeight = window?.visualViewport?.height ?? 0;
    const isMinimumChange =
      !minAvailHeight || visualViewportHeight < minAvailHeight;
    const isOrientationChange = previousWidth !== innerWidth;

    if (previousWidth !== innerWidth) previousWidth = innerWidth;

    if (isOrientationChange || isMinimumChange) {
      minAvailHeight = visualViewportHeight;
      return;
    }
  };

  const setVh = (): void => {
    document.documentElement.style.setProperty(
      "--vh-min-avail",
      `${minAvailHeight ?? 0}px`
    );
  };

  calcMinAvailHeight();
  setVh();

  window.addEventListener("resize", () => {
    calcMinAvailHeight();
    setVh();
  });

  window.addEventListener("orientationchange", () => {
    calcMinAvailHeight();
    setVh();
  });
};

const vh: Vh = () => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    vhCalc();
  } else {
    document.addEventListener("DOMContentLoaded", vhCalc);
  }
};

export default vh;
