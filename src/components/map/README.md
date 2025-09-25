# Location Line Map Component

A React component that displays an interactive OpenStreetMap showing a line from the user's location to Brooklyn, NY (zip code 11205).

## Features

- **IP Geolocation**: Uses ipapi.co to get user's location from IP address
- **Browser Geolocation Fallback**: Falls back to browser geolocation API if IP lookup fails
- **Interactive Map**: Uses Leaflet.js with OpenStreetMap tiles
- **Visual Connection**: Draws a dashed line between user location and Brooklyn
- **Responsive Design**: Works on mobile and desktop
- **Location Info**: Shows city/country information when available

## API Dependencies

- **ipapi.co**: Free IP geolocation service (no API key required)
- **OpenStreetMap**: Free map tiles
- **Browser Geolocation**: Native browser API (fallback)

## Technical Details

- Uses dynamic imports to avoid SSR issues with Leaflet
- Loads Leaflet CSS dynamically
- Custom markers with different colors for user (red) and destination (blue)
- Automatically fits map bounds to show both locations
- Graceful error handling for location failures

## Usage

```tsx
import { LocationLineMap } from '@/components/map/location-line-map';

// In your component
<LocationLineMap className="w-full" />;
```

## Dependencies

- leaflet
- @types/leaflet
- lucide-react (for icons)

Install with: `npm install leaflet @types/leaflet`
