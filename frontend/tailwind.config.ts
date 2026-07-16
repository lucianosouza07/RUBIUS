import type { Config } from 'tailwindcss'
import tailwindForms from '@tailwindcss/forms'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        surface: "var(--surface)",
        "surface-variant": "var(--surface-variant)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        border: "var(--border)",
        outline: "var(--outline)",
        error: "var(--error)",
        // Aliases para retrocompatibilidade com os mockups
        "surface-light": "var(--surface)",
        "surface-dark": "var(--surface)",
        "surface-variant-light": "var(--surface-variant)",
        "surface-variant-dark": "var(--surface-variant)",
        "text-light": "var(--on-surface)",
        "text-dark": "var(--on-surface)",
        "text-muted": "var(--on-surface-variant)",
        "text-muted-light": "var(--on-surface-variant)",
        "text-muted-dark": "var(--on-surface-variant)",
        "text-primary": "var(--on-surface)",
        "border-light": "var(--border)",
        "border-dark": "var(--border)",
        "on-primary": "#ffffff",
      },
      borderRadius: {
        "DEFAULT": "8px",
        "sm": "4px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
        "2xl": "24px",
        "full": "9999px",
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
        "3xl": "64px",
        "sidebar-width": "260px",
        "max-content-width": "960px",
        "gutter": "16px"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "stat": ["JetBrains Mono", "monospace"],
        "mono": ["JetBrains Mono", "monospace"],
        // Aliases diretos para as classes estáticas
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "headline-lg-mobile": ["Space Grotesk", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "stat-mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["22px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.55", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["13px", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "600" }],
        "stat-mono": ["14px", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "500" }]
      }
    },
  },
  plugins: [tailwindForms],
} satisfies Config
