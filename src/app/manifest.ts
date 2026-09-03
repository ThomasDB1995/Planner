import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Perceel Werkplanning & Materieelbeheer",
    short_name: "Planner",
    description:
      "Werkplanning van maandag tot zondag per werknemer met materieel en conflictwaarschuwingen.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5fbf7",
    theme_color: "#006b4e",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
