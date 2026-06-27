# Farmers Market Flyer — Design Spec
**Date:** 2026-06-26
**Project:** Pivens.Design marketing

---

## Overview

A print flyer for handing to small business owners at farmers markets. Goal: get them to scan a QR code or visit pivens.design and book a free consultation.

---

## Format

- **Size:** Half-sheet — 5.5" × 8.5" (portrait)
- **Output:** Single self-contained HTML file. User opens in Chrome, prints to PDF (or directly to printer).
- **Page tiling:** The HTML renders one flyer. No tiling built into the file.
- **Print instructions (note embedded in file):** Set Chrome print margins to "None" and uncheck headers/footers in the print dialog.

---

## Visual Design

### Colors

| Role | Hex | Usage |
|---|---|---|
| Background | `#06060e` | Page fill |
| Foreground | `#ededf5` | Body text, headline non-accent words, hook line |
| Accent | `#b5ff47` | Studio label, headline accent, bullet markers, divider, QR border, bars, URL |
| Muted | `#888888` | CTA label ("Scan or visit"), consult note |
| Card bg | `#0e0e1c` | QR code container background |

### Typography

| Role | Family | Weight | Size | Color | Notes |
|---|---|---|---|---|---|
| Studio label | Outfit | 600 | 10px | `#b5ff47` | `text-transform: uppercase; letter-spacing: 3px` |
| Headline (non-accent) | Bricolage Grotesque | 900 | 56px | `#ededf5` | `line-height: 1.0` |
| Headline (accent) | Bricolage Grotesque | 900 | 56px | `#b5ff47` | Same size/weight as above |
| Hook line | Outfit | 400 | 14px | `#ededf5` | `opacity: 0.85; line-height: 1.5` |
| Bullet text | Outfit | 400 | 13px | `#ededf5` | `opacity: 0.85` |
| URL / brand | Bricolage Grotesque | 800 | 22px | `#b5ff47` | |
| CTA label | Outfit | 400 | 10px | `#888888` | `text-transform: uppercase; letter-spacing: 1px` |
| Consult note | Outfit | 400 | 11px | `#888888` | |

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Outfit:wght@300;400;500;600&display=swap
```
Internet connection required at print time. Offline: system fonts substitute (acceptable for test prints only).

### Spacing

- Outer padding: 28px left/right, 0 top/bottom (bars flush to edge)
- Top bar → studio label: 20px top padding on `.content`
- Studio label → headline: 14px
- Headline → accent divider: 20px
- Accent divider: `height: 3px; width: 48px; background: #b5ff47` — left-aligned, no border-radius
- Divider → hook line: 16px
- Hook line → bullets: 14px
- Bullet gap: 8px between each item
- Bullets → QR row: `flex: 1` spacer pushes QR row to bottom
- QR row: `padding: 20px 0`

---

## Layout (top to bottom)

```
┌─────────────────────────────────┐  ← 5px #b5ff47 bar, full width
│ WEB DESIGN STUDIO               │  ← studio label
│                                 │
│ Look Like                       │  ← headline, #ededf5
│ the Business                    │  ← headline, #ededf5
│ You Actually                    │  ← headline, #b5ff47 (explicit <br>)
│ Are.                            │  ← headline, #b5ff47 (explicit <br>)
│                                 │
│ ████                            │  ← 48×3px divider, #b5ff47
│                                 │
│ Your booth draws them in.       │  ← hook line
│ Your website brings them back.  │
│                                 │
│ ● Sites built in days, not months      │ ← bullets; ● is #b5ff47, text #ededf5
│ ● Starting at $499 — no surprises     │
│ ● Built for local businesses like yours│
│                                 │
│              [flex spacer]      │
│                                 │
│ ┌──────┐  SCAN OR VISIT         │  ← CTA row, flex, center-aligned vertically
│ │  QR  │  pivens.design         │  ← URL large, #b5ff47
│ └──────┘  Free consult included │  ← consult note, #888
│                                 │
└─────────────────────────────────┘  ← 5px #b5ff47 bar, full width
```

### Headline markup

```html
<h1 class="headline">
  Look Like<br>
  the Business<br>
  <span class="accent">You Actually<br>
  Are.</span>
</h1>
```

`span.accent { color: #b5ff47 }` — the `<br>` inside the span is fine; both "You Actually" and "Are." render in lime.

### Bullet markers

Each bullet is a `<div>` with a flex row:
- Marker: `width: 6px; height: 6px; border-radius: 50%; background: #b5ff47; flex-shrink: 0; margin-top: 4px`
- Gap between marker and text: `8px`
- No `<ul>` / `<li>` (avoids browser default list styling)

### QR Code

- Container `div#qrcode`: `width: 72px; height: 72px; border: 2px solid #b5ff47; border-radius: 6px; background: #0e0e1c; display: flex; align-items: center; justify-content: center; overflow: hidden`
- qrcode.js constructor: `new QRCode(el, { text: 'https://pivens.design', width: 64, height: 64, colorDark: '#b5ff47', colorLight: '#0e0e1c' })`
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`
- If CDN fails (no internet): container renders empty with lime border — acceptable; QR is a secondary CTA next to the visible URL

### CTA row layout

```html
<div class="cta-row"> <!-- flex; align-items: center; gap: 16px -->
  <div id="qrcode"></div>
  <div class="cta-text"> <!-- flex-column; gap: 3px -->
    <span class="cta-label">Scan or visit</span>
    <span class="cta-url">pivens.design</span>
    <span class="cta-note">Free consult included</span>
  </div>
</div>
```

---

## Copy (finalized, operator-approved)

| Element | Text |
|---|---|
| Studio label | WEB DESIGN STUDIO |
| Headline | Look Like / the Business / You Actually / Are. |
| Hook | Your booth draws them in. Your website brings them back. |
| Bullet 1 | Sites built in days, not months |
| Bullet 2 | Starting at $499 — no surprises |
| Bullet 3 | Built for local businesses like yours |
| CTA label | Scan or visit |
| URL | pivens.design |
| Consult note | Free consult included |

---

## Technical Implementation

### File location
`_workspace/flyer-farmers-market.html`

### Print CSS
```css
@page {
  size: 5.5in 8.5in;
  margin: 0;
}
@media print {
  body { margin: 0; padding: 0; }
  .print-note { display: none; }
}
```

### HTML structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pivens.Design — Farmers Market Flyer</title>
  <link href="[Google Fonts URL]" rel="stylesheet">
  <style>/* all styles inline */</style>
</head>
<body>
  <p class="print-note"><!-- Chrome print instructions --></p>
  <div class="flyer">
    <div class="bar"></div>
    <div class="content">
      <p class="studio-label">WEB DESIGN STUDIO</p>
      <h1 class="headline">Look Like<br>the Business<br><span class="accent">You Actually<br>Are.</span></h1>
      <div class="divider"></div>
      <p class="hook">Your booth draws them in.<br>Your website brings them back.</p>
      <div class="bullets">
        <div class="bullet"><div class="dot"></div><span>Sites built in days, not months</span></div>
        <div class="bullet"><div class="dot"></div><span>Starting at $499 — no surprises</span></div>
        <div class="bullet"><div class="dot"></div><span>Built for local businesses like yours</span></div>
      </div>
      <div class="spacer"></div>
      <div class="cta-row">
        <div id="qrcode"></div>
        <div class="cta-text">
          <span class="cta-label">Scan or visit</span>
          <span class="cta-url">pivens.design</span>
          <span class="cta-note">Free consult included</span>
        </div>
      </div>
    </div>
    <div class="bar"></div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script>
    new QRCode(document.getElementById('qrcode'), {
      text: 'https://pivens.design',
      width: 64, height: 64,
      colorDark: '#b5ff47',
      colorLight: '#0e0e1c'
    });
  </script>
</body>
</html>
```

---

## Out of Scope

- Digital/social media version
- Multiple color variants
- Back of flyer
- Bleed/crop marks for commercial print shop
- Offline-safe font or QR embedding
