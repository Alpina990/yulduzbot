import React from "react";
import { createRoot } from "react-dom/client";
import { Glass } from "@samasante/liquid-glass";

const baseOptics = {
  strength: 0.07,
  depth: 0.62,
  curvature: 0.42,
  bend: 0.65,
  bendWidth: 0.16,
  dispersion: 0.42,
  frost: 0,
  saturate: 1,
  sheen: 0.32,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  glow: 0.1,
  glowSpread: 1,
  glowFalloff: 0.5,
  specular: 1,
  sheenAngle: 45,
  brightness: 0,
};

const variants = {
  collection: {
    optics: {
      ...baseOptics,
      strength: 0.085,
      depth: 0.72,
      curvature: 0.52,
      bend: 0.78,
      dispersion: 0.5,
      mapSize: 256,
    },
    tint: "rgba(255,255,255,0.22)",
  },
  payment: {
    optics: { ...baseOptics, mapSize: 128 },
    tint: "rgba(255,255,255,0.28)",
  },
};

function LiquidGlassLayer({ variant }) {
  const config = variants[variant] || variants.payment;

  return React.createElement(
    Glass,
    {
      className: "liquid-glass-surface",
      optics: config.optics,
      style: {
        position: "absolute",
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
        background: config.tint,
        pointerEvents: "none",
      },
    },
    React.createElement("span", {
      className: "liquid-glass-probe",
      "aria-hidden": "true",
    }),
  );
}

export function mountLiquidGlass(root = document) {
  root.querySelectorAll("[data-liquid-glass-host]").forEach((host) => {
    if (host.dataset.liquidGlassMounted === "true") return;
    host.dataset.liquidGlassMounted = "true";

    const reactRoot = createRoot(host);
    reactRoot.render(
      React.createElement(LiquidGlassLayer, {
        variant: host.dataset.liquidGlassHost,
      }),
    );
  });
}
