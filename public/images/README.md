# Images Folder

This folder contains SVG illustrations for the pricing carousel.

## Plan Images

Each plan has a unique, custom-designed SVG image:

### 1. Starter Plan (plan-starter.svg)
- **Colors**: Black gradient (#2C2C2C to #1A1A1A)
- **Icon**: Mobile phone with signal bars
- **Theme**: Simple, basic connectivity
- **Size**: 200x200px

### 2. Popular Plan (plan-popular.svg)
- **Colors**: Red gradient (#FF4444 to #CC0000)
- **Icon**: Flame with WiFi waves
- **Theme**: Hot deal, trending choice
- **Size**: 200x200px

### 3. Best Value Plan (plan-bestvalue.svg)
- **Colors**: Blue gradient (#3399FF to #0066CC)
- **Icon**: Lightning bolt with speed lines
- **Theme**: Fast, powerful, energetic
- **Size**: 200x200px

### 4. Premium Plan (plan-premium.svg)
- **Colors**: Silver/Gray gradient (#E0E0E0 to #CCCCCC)
- **Icon**: Crown with WiFi tower
- **Theme**: Luxury, top-tier service
- **Size**: 200x200px

## Usage

These SVG images are used in the `PricingCarousel.vue` component:

```vue
<img :src="plan.image" :alt="plan.speed + ' plan'" class="plan-image-svg" />
```

## Features

- ✅ **Scalable**: SVG format ensures crisp display at any size
- ✅ **Lightweight**: Small file sizes for fast loading
- ✅ **Animated**: Float animation applied via CSS
- ✅ **Accessible**: Includes alt text for screen readers
- ✅ **Responsive**: Adapts to different screen sizes

## Design Notes

All images include:
- Gradient backgrounds matching the plan theme
- WiFi-related iconography (signals, waves, towers)
- Professional drop shadows for depth
- Consistent circular composition
- Label text at the bottom
