/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        colors: {
            "primary-container": "#22ff44",
            "on-tertiary-fixed": "#1c1b1b",
            "secondary-fixed-dim": "#c9c6c5",
            "surface-container-highest": "#333535",
            "secondary-fixed": "#e5e2e1",
            "on-background": "#e2e2e2",
            "surface-container": "#1e2020",
            "on-surface": "#e2e2e2",
            "on-error-container": "#ffdad6",
            "on-error": "#690005",
            "surface-container-low": "#1a1c1c",
            "primary": "#edffe4",
            "on-tertiary": "#313030",
            "tertiary-container": "#dfdcdc",
            "outline-variant": "#3b4b37",
            "tertiary-fixed-dim": "#c8c6c5",
            "on-primary": "#003906",
            "secondary-container": "#4a4949",
            "error-container": "#93000a",
            "surface-container-high": "#282a2b",
            "secondary": "#c9c6c5",
            "on-secondary-container": "#bab8b7",
            "on-primary-fixed-variant": "#00530d",
            "tertiary": "#fcf9f8",
            "on-secondary-fixed-variant": "#474646",
            "surface-tint": "#00e637",
            "primary-fixed": "#73ff6f",
            "surface-bright": "#38393a",
            "on-primary-container": "#007115",
            "on-surface-variant": "#baccb2",
            "inverse-primary": "#006e15",
            "tertiary-fixed": "#e5e2e1",
            "surface": "#121414",
            "inverse-surface": "#e2e2e2",
            "inverse-on-surface": "#2f3131",
            "surface-dim": "#121414",
            "on-tertiary-container": "#616060",
            "error": "#ffb4ab",
            "on-tertiary-fixed-variant": "#474746",
            "on-secondary": "#313030",
            "primary-fixed-dim": "#00e637",
            "on-primary-fixed": "#002202",
            "surface-variant": "#333535",
            "on-secondary-fixed": "#1c1b1b",
            "background": "#121414",
            "outline": "#84967e",
            "surface-container-lowest": "#0c0f0f"
        },
        borderRadius: {
            DEFAULT: "0.125rem",
            lg: "0.25rem",
            xl: "0.5rem",
            full: "0.75rem"
        },
        spacing: {
            "container-max": "1280px",
            "section-padding-mobile": "64px",
            "gutter": "24px",
            "section-padding-desktop": "120px",
            "base": "8px"
        },
        fontFamily: {
            "headline-lg": ["Sora"],
            "label-caps": ["Sora"],
            "headline-md": ["Sora"],
            "headline-lg-mobile": ["Sora"],
            "body-md": ["Sora"],
            "body-lg": ["Sora"],
            "display-lg": ["Sora"],
            "sans": ["Sora", "sans-serif"]
        },
        fontSize: {
            "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
            "label-caps": ["12px", { lineHeight: "1.0", letterSpacing: "0.15em", fontWeight: "700" }],
            "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
            "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
            "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
            "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
            "display-lg": ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }]
        }
    }
  },
  plugins: [],
}
