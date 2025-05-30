/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    fontFamily: {
      title_font: ['Parkinsans', 'sans-serif'],
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
};
// ✅ Add the safelist here
export const safelist = [
  // --- Text colors
  { pattern: /text-(slate|gray|red|yellow|green|blue|indigo|purple|pink)-(50|100|200|300|400|500|600|700|800|900)/ },

  // --- Background colors
  { pattern: /bg-(white|black|slate|gray|red|yellow|green|blue|indigo|purple|pink)-(50|100|200|300|400|500|600|700|800|900)/ },

  // --- Padding and Margin
  { pattern: /p[trblxy]?-(0|1|2|3|4|5|6|8|10|12|16|20)/ },
  { pattern: /m[trblxy]?-(0|1|2|3|4|5|6|8|10|12|16|20)/ },

  // --- Text styles
  'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
  'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
  'italic', 'underline', 'line-through', 'uppercase', 'lowercase', 'capitalize',
  'text-left', 'text-center', 'text-right', 'text-justify',

  // --- Layout
  'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid',
  'flex-row', 'flex-col', 'items-center', 'justify-center', 'justify-between', 'gap-2', 'gap-4', 'gap-6',

  // --- Borders & Radius
  { pattern: /border(-(2|4|8))?/ },
  { pattern: /border-(slate|gray|red|yellow|green|blue|indigo|purple|pink)-(100|200|300|400|500|600|700)/ },
  { pattern: /rounded(-(none|sm|md|lg|xl|2xl|3xl|full))?/ },

  // --- Shadow
  'shadow', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',

  // --- Width & Height
  { pattern: /w-(auto|full|screen|max|min|[0-9]+\/[0-9]+)/ },
  { pattern: /h-(auto|full|screen|max|min|[0-9]+\/[0-9]+)/ },
  { pattern: /max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)/ },

  // --- Position
  'relative', 'absolute', 'fixed', 'sticky',
  { pattern: /top-(0|1|2|4|8|16)/ },
  { pattern: /left-(0|1|2|4|8|16)/ },

  // --- Overflow, Display
  'overflow-hidden', 'overflow-scroll', 'overflow-auto',
  'hidden', 'visible',

  // --- Z-index
  { pattern: /z-(0|10|20|30|40|50)/ },

  // --- Misc
  'cursor-pointer', 'select-none', 'transition', 'duration-150', 'duration-300', 'ease-in-out',

  // --- Lists
  'list-disc', 'list-decimal', 'list-none', 'pl-4', 'pl-6',

  // --- Code blocks
  'bg-gray-900', 'text-white', 'p-4', 'rounded', 'overflow-x-auto',
];
export const plugins = [
  import('tailwindcss-animate'),
  import('@tailwindcss/typography'),
];
