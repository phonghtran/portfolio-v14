'use client';

import { useEffect, useState, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

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

// 🎨 PRESET THEMES - Choose one by changing the theme name below
const MAP_THEMES = {
  // Clean and minimal theme
  light: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: { color: '#8b5cf6', weight: 3, opacity: 0.9, dashArray: '10, 15' },
    markers: {
      user: { color: '#ef4444', size: 16, pulse: true },
      destination: { color: '#3b82f6', size: 16, pulse: false },
    },
  },

  // Dark modern theme
  dark: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: { color: '#10b981', weight: 4, opacity: 1, dashArray: 'solid' },
    markers: {
      user: { color: '#f59e0b', size: 18, pulse: true },
      destination: { color: '#10b981', size: 18, pulse: false },
    },
  },

  // Vibrant colorful theme
  vibrant: {
    tileLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
    },
    line: { color: '#ec4899', weight: 5, opacity: 0.8, dashArray: '5, 5' },
    markers: {
      user: { color: '#8b5cf6', size: 20, pulse: true },
      destination: { color: '#ec4899', size: 20, pulse: true },
    },
  },

  // Professional/corporate theme
  professional: {
    tileLayer: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
    line: { color: '#374151', weight: 2, opacity: 0.7, dashArray: '20, 10' },
    markers: {
      user: { color: '#dc2626', size: 14, pulse: false },
      destination: { color: '#1f2937', size: 14, pulse: false },
    },
  },
};

// 🎨 CHOOSE YOUR THEME HERE - Change 'light' to any theme name above
const CURRENT_THEME = 'light'; // Options: 'light', 'dark', 'vibrant', 'professional'

// Build final config from selected theme
const MAP_CONFIG = {
  ...MAP_THEMES[CURRENT_THEME as keyof typeof MAP_THEMES],

  // Map behavior settings (same for all themes)
  map: {
    initialZoom: 4, // Starting zoom level (1-18)
    minZoom: 2, // Minimum zoom level
    maxZoom: 18, // Maximum zoom level
    padding: 20, // Padding around markers when fitting bounds
  },
};

export function LocationLineMap({ className = '' }: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

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

        // Initialize map - customize map behavior here
        if (!mapRef.current) return;

        const map = L.map(mapRef.current, {
          center: [centerLat, centerLng],
          zoom: MAP_CONFIG.map.initialZoom,
          minZoom: MAP_CONFIG.map.minZoom,
          maxZoom: MAP_CONFIG.map.maxZoom,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true,
        });
        mapInstanceRef.current = map;

        // Add map tiles using configuration
        L.tileLayer(MAP_CONFIG.tileLayer.url, {
          attribution: MAP_CONFIG.tileLayer.attribution,
        }).addTo(map);

        // Create custom icons using configuration
        const userIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background: ${MAP_CONFIG.markers.user.color}; 
            width: ${MAP_CONFIG.markers.user.size}px; 
            height: ${MAP_CONFIG.markers.user.size}px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ${MAP_CONFIG.markers.user.pulse ? 'animation: pulse 2s infinite;' : ''}
          "></div>
          ${
            MAP_CONFIG.markers.user.pulse
              ? `<style>
            @keyframes pulse {
              0% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${MAP_CONFIG.markers.user.color}70; }
              70% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 10px ${MAP_CONFIG.markers.user.color}00; }
              100% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${MAP_CONFIG.markers.user.color}00; }
            }
          </style>`
              : ''
          }`,
          iconSize: [
            MAP_CONFIG.markers.user.size + 6,
            MAP_CONFIG.markers.user.size + 6,
          ],
          iconAnchor: [
            (MAP_CONFIG.markers.user.size + 6) / 2,
            (MAP_CONFIG.markers.user.size + 6) / 2,
          ],
        });

        const brooklynIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background: ${MAP_CONFIG.markers.destination.color}; 
            width: ${MAP_CONFIG.markers.destination.size}px; 
            height: ${MAP_CONFIG.markers.destination.size}px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ${MAP_CONFIG.markers.destination.pulse ? 'animation: pulse 2s infinite;' : ''}
          "></div>
          ${
            MAP_CONFIG.markers.destination.pulse
              ? `<style>
            @keyframes pulse {
              0% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${MAP_CONFIG.markers.destination.color}70; }
              70% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 10px ${MAP_CONFIG.markers.destination.color}00; }
              100% { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 ${MAP_CONFIG.markers.destination.color}00; }
            }
          </style>`
              : ''
          }`,
          iconSize: [
            MAP_CONFIG.markers.destination.size + 6,
            MAP_CONFIG.markers.destination.size + 6,
          ],
          iconAnchor: [
            (MAP_CONFIG.markers.destination.size + 6) / 2,
            (MAP_CONFIG.markers.destination.size + 6) / 2,
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

        // Draw line between locations using configuration
        const line = L.polyline(
          [
            [userLocation.latitude, userLocation.longitude],
            [BROOKLYN_COORDS.latitude, BROOKLYN_COORDS.longitude],
          ],
          {
            color: MAP_CONFIG.line.color,
            weight: MAP_CONFIG.line.weight,
            opacity: MAP_CONFIG.line.opacity,
            dashArray:
              MAP_CONFIG.line.dashArray === 'solid'
                ? undefined
                : MAP_CONFIG.line.dashArray,
            lineCap: 'round',
            lineJoin: 'round',
          }
        ).addTo(map);

        // Fit map to show both points using configuration
        map.fitBounds(line.getBounds(), {
          padding: [MAP_CONFIG.map.padding, MAP_CONFIG.map.padding],
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
