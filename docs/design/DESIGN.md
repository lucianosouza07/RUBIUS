---
name: Rubius World Cup Intelligence
colors:
  surface: '#f9f9f6'
  surface-dim: '#dadad7'
  surface-bright: '#f9f9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#3d4947'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#006b2c'
  on-tertiary: '#ffffff'
  tertiary-container: '#00873a'
  on-tertiary-container: '#f7fff2'
  error: '#DC2626'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f9f9f6'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
  primary-hover: '#0F766E'
  surface-variant-light: '#F4F4F0'
  surface-dark: '#100E12'
  surface-variant-dark: '#1A181D'
  text-primary: '#100E12'
  text-muted: '#6C7278'
  border: '#E5E5E0'
  info: '#0EA5E9'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.55'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  stat-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  sidebar-width: 260px
  max-content-width: 960px
  gutter: 16px
---

## Brand & Style

The design system is engineered for **Rubius**, a high-performance World Cup AI assistant. The brand personality is analytical, technical, and objective, serving as a sophisticated companion for fans and analysts. The visual identity avoids typical sports-app clutter, opting instead for a **Corporate / Modern** aesthetic with a **Minimalist** execution.

The emotional response should be one of "calm authority"—a premium, focused environment for consuming dense real-time data and AI-generated insights. The interface prioritizes clarity and speed, using a flat-layered approach that emphasizes information architecture over decorative effects. The tone is strictly non-biased, reflecting the precision of a technical tool.

## Colors

This design system utilizes a high-contrast, accessibility-first palette (WCAG AA) anchored by off-white and deep charcoal neutrals to reduce visual fatigue during long tournament sessions.

- **Primary (Teal):** Represents AI intelligence and core interactions. Used for active states and primary CTAs.
- **Secondary (Amber):** Reserved strictly for "Cup Moments"—trophy highlights, champions, and high-priority alerts.
- **Tertiary (Pitch Green):** Dedicated to live positive events, such as goals and confirmed qualifications.
- **Neutral (Off-White):** A warm surface base that provides a premium, "paper-like" feel, avoiding the harshness of pure white.

Depth is achieved through tonal variations (`surface-variant`) rather than shadows, ensuring a clean and modern digital-first appearance.

## Typography

The typographic system is tri-fold, balancing personality, readability, and technical precision.

1. **Space Grotesk (Headlines):** Provides a distinctive, geometric character for section titles and high-level navigation.
2. **Inter (Body/UI):** Chosen for its exceptional legibility in conversational threads and streaming AI text.
3. **JetBrains Mono (Data):** A technical monospace reserved for sports statistics, scores, timestamps, and tactical data to ensure numerical alignment and authority.

No more than two families should appear within a single container. Labels use Inter with increased letter-spacing and uppercase styling to denote metadata and statuses clearly.

## Layout & Spacing

The system follows a **Fixed-Fluid Hybrid** grid model based on an 8px square unit.

- **Sidebar:** A fixed 260px left-hand navigation persists on desktop, housing primary app sections and user profile.
- **Stage:** A central fluid container with a maximum width of 960px, ensuring conversational threads remain readable and do not stretch excessively on ultra-wide monitors.
- **Breakpoints:**
    - **Desktop (>1024px):** Full sidebar + central stage + optional right-hand "Artifact" panel.
    - **Tablet (640-1024px):** Sidebar collapses to an icon-only rail to maximize reading area.
    - **Mobile (<640px):** Sidebar transforms into a bottom-sheet; margins reduce to 16px.

All layouts prioritize "Safe Areas" for conversation, with the "Ask Input" anchored at the bottom of the viewport.

## Elevation & Depth

This design system rejects heavy drop-shadows and skeuomorphism in favor of a **Flat-Layered** philosophy. Visual hierarchy is communicated through tonal layering and hair-line borders.

- **Base Layer (L0):** The primary surface color (`surface-light`).
- **Content Layer (L1):** Cards and panels are defined by 1px borders in `border-light` or a slight tonal shift to `surface-variant`.
- **Interactive Layer (L2):** Hover states and active navigation items use `surface-variant` to signify selection.
- **Overlays:** Modals use a semi-transparent dark scrim (60% opacity) to focus the user, but the modal itself remains flat with a crisp border.

For AI streaming, a subtle 12% opacity pulse in the primary color is used to indicate activity, avoiding any blurring or shadow-based elevation.

## Shapes

The shape language is "Contextual Geometry." It balances the technical rigidity of data with the approachability of a conversation.

- **Analytical Elements:** Stats, badges, and small inputs use `rounded-sm` (4px) to feel precise and sharp.
- **Standard UI:** Buttons, cards, and sidebar items use `rounded-md` (8px).
- **Conversational Hero:** The "Ask Input" uses `rounded-2xl` (24px) or `rounded-full` to stand out as the primary interface "mouthpiece."
- **Avatars:** National team flags and user avatars are strictly `rounded-full` (circular).

Do not mix sharp 4px corners and pill-shaped corners within the same component.

## Components

### Buttons
- **Primary:** Background `primary`, text white, `rounded-md`. Transitions to `primary-hover` on interaction.
- **Secondary:** Ghost-style; `1px` border in `border-light`, text `text-primary`.

### Ask Input (The Hero)
The primary interaction point. A tall (min 64px), `rounded-2xl` field with `surface-light` background and a `1px` border. It features a persistent micro-interaction: when the AI is processing, the border pulses in `primary` at 20% opacity.

### Smart Prompt Chips
Small, `rounded-full` pills using `surface-variant` background. These act as "quick-start" actions below the main input.

### Entity Cards
Used for "Spaces" or "Skills." They feature `rounded-lg` (12px) corners, no shadow, and a `1px` border that shifts to `primary` on hover.

### Stat Badges
Compact containers for live scores or minutes. Always use `stat-mono` (JetBrains Mono) for the content and `rounded-sm` for the container to signify technical data.

### Live Indicator
A `tertiary` (green) dot with a soft pulse animation, paired with the `label-sm` text "AO VIVO".