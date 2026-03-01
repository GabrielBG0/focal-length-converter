# Lens Equivalence Calculator

A modern web-based lens equivalence calculator for photographers.

Convert full-frame focal length and aperture values into equivalent values for APS-C, Micro Four Thirds, smartphone sensors, and more — accounting for crop factor and depth-of-field equivalence.

---

## Features

- Focal length conversion (Full Frame → Crop Sensor)
- Aperture equivalence (Depth of field adjusted)
- Multiple sensor format support
- Clean, responsive UI
- SEO optimized
- Accessible form inputs and tooltips
- Automatic sitemap and robots configuration

---

## Why This Exists

Different sensor sizes change:

- Field of view (via crop factor)
- Depth of field characteristics
- Perceived lens equivalence

This tool allows photographers to standardize comparisons using 35mm full-frame as reference.

---

## How It Works

### Crop Factor

Equivalent focal length is calculated using:

```
Equivalent Focal Length = Full Frame Focal Length / Crop Factor
```

Crop factor is derived from sensor diagonal relative to full-frame (43.27mm).

### Aperture Equivalence

To maintain similar depth-of-field characteristics:

```
Equivalent Aperture = Full Frame Aperture / Crop Factor
```

Note: Exposure does **not** change. Only depth of field equivalence is adjusted.

---

## Project Structure

app/
  page.tsx
  sitemap.ts
  robots.ts
components/
  LensCalculator.tsx
