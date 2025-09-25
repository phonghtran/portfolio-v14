'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { useTheme, type Theme } from '@/contexts/theme-context';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface MapComponentProps {
  className?: string;
  debugMode?: boolean; // Enable custom location inputs
}

// Brooklyn, NY coordinates for zip code 11205
const BROOKLYN_COORDS = {
  latitude: 40.6942,
  longitude: -73.9442,
};

// 🎨 MAP THEMES - Integrated with website theme system
const MAP_THEMES: Record<Theme, any> = {
  // Classic theme - clean and professional
  classic: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: {
      cssVar: 'primary', // Uses CSS variable hsl(var(--primary))
      weight: 3,
      opacity: 0.8,
      dashArray: '10, 15',
    },
    circles: {
      user: {
        cssVar: 'destructive', // Red-ish from theme
        opacity: 0.6,
        fillOpacity: 0.2,
      },
      destination: {
        cssVar: 'accent', // Teal from theme
        opacity: 0.6,
        fillOpacity: 0.2,
      },
    },
  },

  // Cyberpunk theme - neon and futuristic
  cyberpunk: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: {
      cssVar: 'accent', // Cyan accent
      weight: 4,
      opacity: 1,
      dashArray: 'solid',
      glow: true, // Special cyberpunk glow effect
    },
    circles: {
      user: {
        cssVar: 'primary', // Hot pink
        opacity: 0.7,
        fillOpacity: 0.25,
      },
      destination: {
        cssVar: 'accent', // Cyan
        opacity: 0.7,
        fillOpacity: 0.25,
      },
    },
  },

  // Vintage theme - warm and nostalgic
  vintage: {
    tileLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
    },
    line: {
      cssVar: 'primary', // Warm brown
      weight: 3,
      opacity: 0.8,
      dashArray: '15, 10',
    },
    circles: {
      user: {
        cssVar: 'destructive', // Warm red
        opacity: 0.5,
        fillOpacity: 0.15,
      },
      destination: {
        cssVar: 'accent', // Warm orange
        opacity: 0.5,
        fillOpacity: 0.15,
      },
    },
  },
};

// 🎨 CHOOSE YOUR THEME HERE - Change 'light' to any theme name above
const CURRENT_THEME = 'light'; // Options: 'light', 'dark', 'vibrant', 'professional'

// Build final config from selected theme
// No longer needed - using theme context directly

// Utility function to get CSS variable values as hex colors
function getCSSVariableColor(cssVar: string): string {
  if (typeof window === 'undefined') return '#000000';

  const hslValue = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${cssVar}`)
    .trim();

  if (!hslValue) return '#000000';

  // Convert HSL to hex for Leaflet compatibility
  const [h, s, l] = hslValue
    .split(' ')
    .map(v => parseFloat(v.replace('%', '')));
  return hslToHex(h || 0, (s || 0) / 100, (l || 0) / 100);
}

// Convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Calculate distance between two points using Haversine formula (in kilometers)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate appropriate circle radius based on distance between points
function calculateCircleRadius(distanceKm: number): number {
  if (distanceKm < 10) {
    // Same city/neighborhood - small circles
    return 500; // 500m
  } else if (distanceKm < 50) {
    // Same metropolitan area - slightly larger
    return 1000; // 1km
  } else if (distanceKm < 100) {
    // Same region/state - medium circles
    return 1500; // 1.5km
  } else if (distanceKm < 300) {
    // Same large state/small country - larger
    return 6000; // 3km
  } else if (distanceKm < 500) {
    // Regional distance - medium-large
    return 12000; // 4.5km
  } else if (distanceKm < 1000) {
    // Same country/continent - larger circles
    return 50000; // 6km
  } else if (distanceKm < 2000) {
    // Continental distance - large
    return 75000; // 10km
  } else if (distanceKm < 5000) {
    // Cross-continental - very large
    return 300000; // 15km
  } else if (distanceKm < 10000) {
    // Near global distance - extra large
    return 300000; // 20km
  } else {
    // Global distance - maximum visibility
    return 600000; // 25km
  }
}

export function LocationLineMap({
  className = '',
  debugMode = false,
}: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const { theme } = useTheme();

  // Preset cities for debug mode
  const presetCities = [
    { name: 'New York City', state: 'New York', lat: 40.7128, lng: -74.006 },
    {
      name: 'Philadelphia',
      state: 'Pennsylvania',
      lat: 39.9526,
      lng: -75.1652,
    },
    { name: 'Los Angeles', state: 'California', lat: 34.0522, lng: -118.2437 },
    { name: 'Chicago', state: 'Illinois', lat: 41.8781, lng: -87.6298 },
    { name: 'Houston', state: 'Texas', lat: 29.7604, lng: -95.3698 },
    { name: 'Miami', state: 'Florida', lat: 25.7617, lng: -80.1918 },
    { name: 'Seattle', state: 'Washington', lat: 47.6062, lng: -122.3321 },
    {
      name: 'Charleston',
      state: 'South Carolina',
      lat: 32.7765,
      lng: -79.9311,
    },
    { name: 'London', state: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', state: 'France', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', state: 'Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney', state: 'Australia', lat: -33.8688, lng: 151.2093 },
  ];

  // Handle debug city selection
  const handleCitySelect = useCallback((city: (typeof presetCities)[0]) => {
    setUserLocation({
      latitude: city.lat,
      longitude: city.lng,
      city: city.name,
      country: city.state,
    });
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    let mounted = true;

    const getUserLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try IP geolocation first
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to get location from IP');
        }

        const data = await response.json();

        if (data.latitude && data.longitude) {
          if (mounted) {
            setUserLocation({
              latitude: data.latitude,
              longitude: data.longitude,
              city: data.city,
              country: data.country_name,
            });
          }
        } else {
          throw new Error('Invalid location data received');
        }
      } catch (err) {
        console.warn('IP geolocation failed, trying browser geolocation:', err);

        // Fallback to browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              if (mounted) {
                setUserLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              }
            },
            geoError => {
              console.error('Geolocation failed:', geoError);
              if (mounted) {
                setError('Unable to determine your location');
              }
            }
          );
        } else {
          if (mounted) {
            setError('Geolocation not supported');
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Only run location fetching if not in debug mode or no debug location set
    if (!debugMode || !userLocation) {
      getUserLocation();
    }

    return () => {
      mounted = false;
    };
  }, [debugMode]); // Only re-run when debug mode changes

  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    const loadLeaflet = async () => {
      try {
        // Get current theme configuration
        const themeConfig = MAP_THEMES[theme];

        // Dynamically import Leaflet to avoid SSR issues
        const L = await import('leaflet');

        // Import Leaflet CSS
        if (typeof window !== 'undefined') {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Clean up existing map
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // Calculate center point between user and Brooklyn
        const centerLat =
          (userLocation.latitude + BROOKLYN_COORDS.latitude) / 2;
        const centerLng =
          (userLocation.longitude + BROOKLYN_COORDS.longitude) / 2;

        // Initialize map with theme-appropriate settings
        if (!mapRef.current) return;

        const map = L.map(mapRef.current, {
          center: [centerLat, centerLng],
          zoom: 4, // Starting zoom level
          minZoom: 2, // Minimum zoom level
          maxZoom: 18, // Maximum zoom level
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true,
        });
        mapInstanceRef.current = map;

        // Add map tiles using theme configuration
        L.tileLayer(themeConfig.tileLayer.url, {
          attribution: themeConfig.tileLayer.attribution,
        }).addTo(map);

        // Create dashed circles using theme CSS variables
        const userColor = getCSSVariableColor(themeConfig.circles.user.cssVar);
        const destinationColor = getCSSVariableColor(
          themeConfig.circles.destination.cssVar
        );

        // Calculate distance and determine appropriate radius sizes
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          BROOKLYN_COORDS.latitude,
          BROOKLYN_COORDS.longitude
        );
        const radius = calculateCircleRadius(distance);

        // Add dashed circles to represent general areas
        const userCircle = L.circle(
          [userLocation.latitude, userLocation.longitude],
          {
            color: userColor,
            fillColor: userColor,
            fillOpacity: themeConfig.circles.user.fillOpacity,
            opacity: themeConfig.circles.user.opacity,
            radius: radius,
            dashArray: '10, 10', // Dashed border
            weight: 3,
          }
        ).addTo(map);

        const brooklynCircle = L.circle(
          [BROOKLYN_COORDS.latitude, BROOKLYN_COORDS.longitude],
          {
            color: destinationColor,
            fillColor: destinationColor,
            fillOpacity: themeConfig.circles.destination.fillOpacity,
            opacity: themeConfig.circles.destination.opacity,
            radius: radius,
            dashArray: '10, 10', // Dashed border
            weight: 3,
          }
        ).addTo(map);

        // Add popups to circles
        userCircle.bindPopup(
          `Your General Area${userLocation.city ? `<br/>${userLocation.city}, ${userLocation.country}` : ''}`
        );
        brooklynCircle.bindPopup('Brooklyn Area, NY<br/>11205');

        // Draw line between locations using theme CSS variables
        const lineColor = getCSSVariableColor(themeConfig.line.cssVar);

        const line = L.polyline(
          [
            [userLocation.latitude, userLocation.longitude],
            [BROOKLYN_COORDS.latitude, BROOKLYN_COORDS.longitude],
          ],
          {
            color: lineColor,
            weight: themeConfig.line.weight,
            opacity: themeConfig.line.opacity,
            dashArray:
              themeConfig.line.dashArray === 'solid'
                ? undefined
                : themeConfig.line.dashArray,
            lineCap: 'round',
            lineJoin: 'round',
          }
        ).addTo(map);

        // Fit map to show both circles with adequate padding
        const group = L.featureGroup([userCircle, brooklynCircle, line]);
        map.fitBounds(group.getBounds(), {
          padding: [30, 30],
        });
      } catch (err) {
        console.error('Failed to load map:', err);
        setError('Failed to load map');
      }
    };

    loadLeaflet();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, theme]); // Re-render when theme changes

  if (loading) {
    return (
      <div className={`bg-card rounded-lg border p-6 ${className}`}>
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Getting your location...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-card rounded-lg border p-6 ${className}`}>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Map shows connection to Brooklyn, NY
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border overflow-hidden ${className}`}>
      {debugMode && (
        <div className="p-4 border-b bg-muted/50">
          <h3 className="text-sm font-medium mb-3">Debug Mode - Test Cities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {presetCities.map(city => (
              <button
                key={`${city.name}-${city.state}`}
                onClick={() => handleCitySelect(city)}
                className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded text-left transition-colors"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-muted-foreground">{city.state}</div>
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-muted-foreground space-y-1">
            <div>
              Current:{' '}
              {userLocation
                ? `${userLocation.city}, ${userLocation.country} (${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)})`
                : 'None'}
            </div>
            {userLocation && (
              <>
                <div>
                  Distance to Brooklyn:{' '}
                  {calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    BROOKLYN_COORDS.latitude,
                    BROOKLYN_COORDS.longitude
                  ).toFixed(0)}{' '}
                  km
                </div>
                <div>
                  Circle Radius:{' '}
                  {(() => {
                    const distance = calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      BROOKLYN_COORDS.latitude,
                      BROOKLYN_COORDS.longitude
                    );
                    const radius = calculateCircleRadius(distance);
                    return `${radius}m (both circles)`;
                  })()}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        className={`w-full ${className?.includes('h-full') ? 'h-full' : 'h-64'}`}
        style={
          className?.includes('h-full')
            ? { height: '100%' }
            : { height: '300px' }
        }
      />
    </div>
  );
}
