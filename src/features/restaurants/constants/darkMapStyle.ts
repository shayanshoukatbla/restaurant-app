/**
 * Dark-mode style for Google Maps (Android) — matched to Apple Maps dark mode on iOS.
 */
export const darkMapStyle = [
  // ── Base geometry ─────────────────────────────────────────────
  { elementType: 'geometry', stylers: [{ color: '#1C1C1E' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8E8E93' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1C1C1E' }] },

  // ── Administrative ────────────────────────────────────────────
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#38383A' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8E8E93' }],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#AEAEB2' }],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#636366' }],
  },

  // ── POI (points of interest) ──────────────────────────────────
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#636366' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#1A2E1A' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4A6A4A' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1C1C1E' }],
  },

  // ── Roads ─────────────────────────────────────────────────────
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2C2C2E' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1C1C1E' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8E8E93' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{ color: '#3A3A3C' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#48484A' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2C2C2E' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [{ color: '#545456' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#636366' }],
  },

  // ── Transit ───────────────────────────────────────────────────
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#636366' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#2C2C2E' }],
  },

  // ── Landscape ─────────────────────────────────────────────────
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1C1C1E' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1C1C1E' }],
  },

  // ── Water (muted navy blue — matching Apple Maps dark) ────────
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#191A2E' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3A3A5C' }],
  },
];
