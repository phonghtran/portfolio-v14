/* 
Example: How to quickly change map themes

1. QUICK THEME CHANGE
Just change this one line in location-line-map.tsx:
const CURRENT_THEME = 'dark';  // Try: 'light', 'dark', 'vibrant', 'professional'

2. CREATE YOUR OWN THEME
Add to MAP_THEMES object:

sunset: {
  tileLayer: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap contributors, © CARTO',
  },
  line: { 
    color: '#ff6b35',      // Orange sunset color
    weight: 4, 
    opacity: 0.9, 
    dashArray: 'solid' 
  },
  markers: {
    user: { 
      color: '#ff6b35',    // Warm orange
      size: 18, 
      pulse: true 
    },
    destination: { 
      color: '#ffd23f',    // Sunset yellow
      size: 18, 
      pulse: false 
    }
  },
}

3. INDIVIDUAL CUSTOMIZATION
Modify specific properties:
MAP_THEMES.light.line.color = '#your-color';
MAP_THEMES.light.markers.user.pulse = false;

4. QUICK COLOR ADJUSTMENTS
Change just the colors while keeping everything else:

const myColors = {
  lineColor: '#10b981',      // Green line
  userColor: '#f59e0b',      // Amber user marker  
  destColor: '#8b5cf6',      // Purple destination
};

Then apply in the theme:
line: { 
  color: myColors.lineColor, 
  weight: 3, 
  opacity: 0.9, 
  dashArray: '10, 15' 
}
*/
