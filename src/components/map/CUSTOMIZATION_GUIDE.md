# Location Line Map Component

A React component that displays an interactive OpenStreetMap showing a line from the user's location to Brooklyn, NY (zip code 11205).

## 🎨 Visual Customization

The map component is highly customizable with preset themes and detailed styling options.

### Quick Theme Selection

Change the `CURRENT_THEME` variable in the component to instantly switch styles:

```typescript
const CURRENT_THEME = 'dark'; // Options: 'light', 'dark', 'vibrant', 'professional'
```

### Available Themes

- **light**: Clean, minimal design with light map tiles
- **dark**: Modern dark theme with neon accents
- **vibrant**: Colorful theme with bright markers and lines
- **professional**: Corporate/business styling with muted colors

### Custom Styling Options

You can modify the `MAP_THEMES` object to create your own themes:

```typescript
// Custom theme example
myTheme: {
  tileLayer: {
    url: 'your-map-tile-url',
    attribution: 'attribution text',
  },
  line: {
    color: '#ff0000',      // Line color
    weight: 4,             // Line thickness (1-10)
    opacity: 0.8,          // Transparency (0-1)
    dashArray: '5, 10'     // Dash pattern or 'solid'
  },
  markers: {
    user: {
      color: '#00ff00',    // User marker color
      size: 20,            // Size in pixels
      pulse: true          // Pulsing animation
    },
    destination: {
      color: '#0000ff',
      size: 18,
      pulse: false
    }
  },
}
```

### Map Tile Options

Choose from different map styles by changing the `tileLayer.url`:

- **Standard**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Light**: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`
- **Dark**: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- **Satellite**: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`

### Line Styling

Customize the connection line appearance:

```typescript
line: {
  color: '#8b5cf6',        // Any CSS color value
  weight: 3,               // Line thickness (1-10)
  opacity: 0.9,            // Transparency (0-1)
  dashArray: '10, 15',     // 'solid' or 'dash_length, gap_length'
}
```

### Marker Customization

Style the location markers:

```typescript
markers: {
  user: {
    color: '#ef4444',      // CSS color for user marker
    size: 16,              // Size in pixels
    pulse: true,           // Enable pulsing animation
  },
  destination: {
    color: '#3b82f6',      // CSS color for destination marker
    size: 16,              // Size in pixels
    pulse: false,          // Disable animation
  }
}
```

## Features

- **IP Geolocation**: Uses ipapi.co to get user's location from IP address
- **Browser Geolocation Fallback**: Falls back to browser geolocation API if IP lookup fails
- **Interactive Map**: Uses Leaflet.js with customizable tile providers
- **Visual Connection**: Draws a styled line between user location and Brooklyn
- **Responsive Design**: Works on mobile and desktop
- **Location Info**: Shows city/country information when available
- **Themeable**: Multiple preset themes and full customization options

## Usage

```tsx
import { LocationLineMap } from '@/components/map/location-line-map';

// Basic usage
<LocationLineMap />

// With custom className
<LocationLineMap className="w-full h-96 rounded-lg" />
```

## Dependencies

- leaflet
- @types/leaflet
- lucide-react (for icons)

Install with: `npm install leaflet @types/leaflet`

## API Dependencies

- **ipapi.co**: Free IP geolocation service (no API key required)
- **Map Tiles**: Free tile providers (OpenStreetMap, CartoDB, etc.)
- **Browser Geolocation**: Native browser API (fallback)
