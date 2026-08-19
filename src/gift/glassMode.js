export function resolveGlassMode() {
  const forcedMode = new URLSearchParams(window.location.search).get("glass");
  if (forcedMode === "live" || forcedMode === "full") return "live";
  if (forcedMode === "baked" || forcedMode === "lite") return "baked";

  // Production always uses the package-derived baked surfaces. They preserve
  // the liquid-glass look without a live backdrop filter / displacement pass.
  return "baked";
}

export function applyGlassMode() {
  const mode = resolveGlassMode();
  document.documentElement.dataset.liquidGlassMode = mode;
  return mode;
}
