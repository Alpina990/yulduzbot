function isBlinkRefractionSupported() {
  const ua = navigator.userAgent;
  const hasUAData = navigator.userAgentData != null;

  return hasUAData || (
    /\b(?:Chrome|Chromium|Edg)\//.test(ua)
    && !/\b(?:CriOS|EdgiOS|FxiOS|OPiOS)\b/.test(ua)
    && !/iPhone|iPad|iPod/.test(ua)
  );
}

export function resolveGlassMode() {
  const forcedMode = new URLSearchParams(window.location.search).get("glass");
  if (forcedMode === "full" || forcedMode === "lite") return forcedMode;

  if (!isBlinkRefractionSupported()) return "lite";

  const isMobile = navigator.userAgentData?.mobile
    ?? /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const saveData = navigator.connection?.saveData === true;
  const constrainedMobile = isMobile && (
    (typeof memory === "number" && memory <= 4)
    || (typeof cores === "number" && cores <= 4)
  );

  return saveData || constrainedMobile ? "lite" : "full";
}

export function applyGlassMode() {
  const mode = resolveGlassMode();
  document.documentElement.dataset.liquidGlassMode = mode;
  return mode;
}
