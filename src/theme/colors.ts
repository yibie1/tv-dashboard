export const Colors = {
  // Backgrounds
  bgPrimary: '#0A0A0A',
  bgSecondary: '#111111',
  bgCard: '#161616',
  bgGlass: 'rgba(16,16,16,0.88)',
  bgSidebar: 'rgba(8,8,8,0.95)',

  // Gold palette
  gold: '#D4A017',
  goldLight: '#F0C040',
  goldDark: '#A07810',
  goldGlow: 'rgba(212,160,23,0.35)',
  goldBorder: 'rgba(212,160,23,0.6)',

  // Emerald / Ethiopian green
  emerald: '#1A6B3C',
  emeraldLight: '#2A8B4C',
  emeraldGlow: 'rgba(26,107,60,0.35)',

  // Accent
  warmOrange: '#C85A00',
  deepBrown: '#3D1A00',
  crimson: '#8B1A1A',

  // Text
  textPrimary: '#F5F0E8',
  textSecondary: '#B0A898',
  textMuted: '#6B6358',
  textGold: '#D4A017',

  // Borders
  borderGlass: 'rgba(212,160,23,0.2)',
  borderActive: 'rgba(212,160,23,0.8)',

  // Focus glow
  focusGlow: 'rgba(212,160,23,0.5)',
  focusGlowGreen: 'rgba(26,107,60,0.5)',

  // Gradients (as arrays for LinearGradient)
  gradientHero: ['#1A0F00', '#0A0A0A'],
  gradientSidebar: ['rgba(8,8,8,0.98)', 'rgba(12,8,0,0.95)'],
  gradientCard: ['rgba(26,20,10,0.9)', 'rgba(10,10,10,0.95)'],
  gradientGold: ['#D4A017', '#A07810'],
  gradientEmerald: ['#1A6B3C', '#0D3D22'],
};

export const Shadows = {
  goldGlow: {
    shadowColor: '#D4A017',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
};
