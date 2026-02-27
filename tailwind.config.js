/** @type {import('tailwindcss').Config} */


const spacing = Object.fromEntries(
  [
    ['px', 1], [0, 0], [0.5, 2], [1, 4], [1.5, 6], [2, 8], [2.5, 10],
    [3, 12], [3.5, 14], [4, 16], [5, 20], [6, 24], [7, 28], [8, 32],
    [9, 36], [10, 40], [11, 44], [12, 48], [14, 56], [16, 64], [20, 80],
    [24, 96], [28, 112], [32, 128], [36, 144], [40, 160], [44, 176],
    [48, 192], [52, 208], [56, 224], [60, 240], [64, 256], [72, 288],
    [80, 320], [96, 384],
  ].map(([k, v]) => [String(k), `${v}px`]),
);

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    spacing,
    fontFamily: {
      roobert: ['Roobert-Regular'],
      'roobert-semibold': ['Roobert-SemiBold'],
    },
    extend: {
      fontSize: {
        '2xl': ['24px', { lineHeight: '28px' }],
        xl:    ['20px', ],
        lg:    ['18px', ],
        base:  ['16px', ],
        sm:    ['14px', ],
        xs:    ['12px', ],
      },
      colors: {
        ink:          '#0B0B0B',
        card:         '#F1F1F0',
        canvas:       '#FFFFFF',
        primary:      '#E94560',
        'primary-dark':  '#C73652',
        'primary-light': '#FF6B84',
        secondary:    '#1F2937',
        muted:        '#6B7280',
        subtle:       '#9CA3AF',
        border:       '#F3F4F6',
      },
      borderRadius: {
        '3xl':   '24px',
        button:  '17px',
      },
    },
  },
  plugins: [],
};
