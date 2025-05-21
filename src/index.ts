import type {Vh, VhCalc} from "./types/vhjs";

export const vhCalc: VhCalc = () => {
  const setVh = (): void => {
    document.documentElement.style.setProperty(
      "--vh-min-avail",
      `${document.documentElement.clientHeight}px`
    );
  };

  setVh();
  window.addEventListener("resize", setVh);
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
