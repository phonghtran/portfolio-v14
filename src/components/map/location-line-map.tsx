'use client';

import { useEffect, useState, useRef } from 'react';
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
    markers: {
      user: {
        cssVar: 'destructive', // Red-ish from theme
        size: 16,
        pulse: true,
      },
      destination: {
        cssVar: 'accent', // Teal from theme
        size: 16,
        pulse: false,
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
    markers: {
      user: {
        cssVar: 'primary', // Hot pink
        size: 18,
        pulse: true,
      },
      destination: {
        cssVar: 'accent', // Cyan
        size: 18,
        pulse: true,
      },
    },
  },

  // Minimalist theme - clean and simple
  minimalist: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: {
      cssVar: 'foreground', // Pure grayscale
      weight: 2,
      opacity: 0.6,
      dashArray: 'solid',
    },
    markers: {
      user: {
        cssVar: 'primary', // Dark gray
        size: 12,
        pulse: false,
      },
      destination: {
        cssVar: 'muted-foreground',
        size: 12,
        pulse: false,
      },
    },
  },

  // Neon theme - electric and vibrant
  neon: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: {
      cssVar: 'accent', // Electric green
      weight: 5,
      opacity: 1,
      dashArray: '8, 8',
      glow: true,
    },
    markers: {
      user: {
        cssVar: 'primary', // Electric purple
        size: 20,
        pulse: true,
      },
      destination: {
        cssVar: 'accent', // Electric green
        size: 20,
        pulse: true,
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
    markers: {
      user: {
        cssVar: 'destructive', // Warm red
        size: 16,
        pulse: false,
      },
      destination: {
        cssVar: 'accent', // Warm orange
        size: 16,
        pulse: false,
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

export function LocationLineMap({ className = '' }: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const { theme } = useTheme();

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

    getUserLocation();

    return () => {
      mounted = false;
    };
  }, []);

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

        // Create custom icons using theme CSS variables
        const userColor = getCSSVariableColor(themeConfig.markers.user.cssVar);
        const destinationColor = getCSSVariableColor(
          themeConfig.markers.destination.cssVar
        );

        const userIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background: ${userColor}; 
            width: ${themeConfig.markers.user.size}px; 
            height: ${themeConfig.markers.user.size}px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ${themeConfig.markers.user.pulse ? 'animation: pulse 2s infinite;' : ''}
            ${themeConfig.line.glow ? 'filter: drop-shadow(0 0 8px currentColor);' : ''}
          "></div>
          ${
            themeConfig.markers.user.pulse
              ? `<style>
            @keyframes pulse {
              0% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${userColor}70; }
              70% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 10px ${userColor}00; }
              100% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${userColor}00; }
            }
          </style>`
              : ''
          }`,
          iconSize: [
            themeConfig.markers.user.size + 6,
            themeConfig.markers.user.size + 6,
          ],
          iconAnchor: [
            (themeConfig.markers.user.size + 6) / 2,
            (themeConfig.markers.user.size + 6) / 2,
          ],
        });

        const brooklynIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background: ${destinationColor}; 
            width: ${themeConfig.markers.destination.size}px; 
            height: ${themeConfig.markers.destination.size}px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ${themeConfig.markers.destination.pulse ? 'animation: pulse 2s infinite;' : ''}
            ${themeConfig.line.glow ? 'filter: drop-shadow(0 0 8px currentColor);' : ''}
          "></div>
          ${
            themeConfig.markers.destination.pulse
              ? `<style>
            @keyframes pulse {
              0% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${destinationColor}70; }
              70% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 10px ${destinationColor}00; }
              100% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${destinationColor}00; }
            }
          </style>`
              : ''
          }`,
          iconSize: [
            themeConfig.markers.destination.size + 6,
            themeConfig.markers.destination.size + 6,
          ],
          iconAnchor: [
            (themeConfig.markers.destination.size + 6) / 2,
            (themeConfig.markers.destination.size + 6) / 2,
          ],
        });

        // Add markers
        const userMarker = L.marker(
          [userLocation.latitude, userLocation.longitude],
          {
            icon: userIcon,
          }
        ).addTo(map);

        const brooklynMarker = L.marker(
          [BROOKLYN_COORDS.latitude, BROOKLYN_COORDS.longitude],
          {
            icon: brooklynIcon,
          }
        ).addTo(map);

        // Add popups
        userMarker.bindPopup(
          `Your Location${userLocation.city ? `<br/>${userLocation.city}, ${userLocation.country}` : ''}`
        );
        brooklynMarker.bindPopup('Brooklyn, NY<br/>11205');

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

        // Fit map to show both points
        map.fitBounds(line.getBounds(), {
          padding: [20, 20],
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
  }, [userLocation]);

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
    <div className={`bg-card rounded-lg border overflow-hidden ${className}`}>
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Connection
        </h3>
        <p className="text-sm text-muted-foreground">
          From your location to Brooklyn, NY
        </p>
      </div>
      <div ref={mapRef} className="h-64 w-full" style={{ height: '300px' }} />
      {userLocation && (
        <div className="p-3 bg-muted/50 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Your Location:</span>
            <span>
              {userLocation.city
                ? `${userLocation.city}, ${userLocation.country}`
                : 'Unknown'}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Destination:</span>
            <span>Brooklyn, NY 11205</span>
          </div>
        </div>
      )}
    </div>
  );
}
