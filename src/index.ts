import type {Vh, VhCalc} from "./types/vhjs";

export const vhCalc: VhCalc = () => {
  let maxBarHeight: number | null = null;

  const setVh = (): void => {
    const documentClientHeight = document.documentElement.clientHeight;
    const innerHeight = window.innerHeight;
    const outerHeight = window.outerHeight;
    const availHeight = window.screen.availHeight;
    const viewportHeight = window?.visualViewport?.height ?? 0;
    const newBarHeight = availHeight - viewportHeight;

    if (maxBarHeight === null || (maxBarHeight && newBarHeight > maxBarHeight))
      maxBarHeight = newBarHeight;

    const calculatedVh =
      maxBarHeight &&
      (outerHeight === viewportHeight || innerHeight !== documentClientHeight)
        ? availHeight - maxBarHeight
        : viewportHeight;

    document.documentElement.style.setProperty(
      "--vh-min-avail",
      `${calculatedVh}px`
    );
  };

  setVh();
  let resizeTimeout: number | undefined = undefined;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(setVh, 15);
  });

  window.addEventListener("orientationchange", setVh);
};

const vh: Vh = () => {
  if (document.readyState !== "loading") {
    vhCalc();
  } else {
    document.addEventListener("DOMContentLoaded", vhCalc);
  }
};

export default vh;
