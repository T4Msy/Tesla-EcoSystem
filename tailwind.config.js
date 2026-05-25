/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tesla: {
          red: '#E82127',
          'red-soft': '#FF3A41',
          'red-deep': '#A8131A',
          black: '#0A0A0B',
          ink: '#0F1012',
          panel: '#15171B',
          surface: '#1B1E24',
          border: '#26292F',
          mute: '#6B7280',
          ghost: '#9CA3AF',
          chrome: '#E6E7E8'
        }
      },
      fontFamily: {
        display: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"SF Pro Text"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'JetBrains Mono', 'monospace']
      },
      boxShadow: {
        glow: '0 0 24px rgba(232, 33, 39, 0.35)',
        'glow-soft': '0 0 40px rgba(232, 33, 39, 0.18)',
        elev: '0 10px 30px rgba(0,0,0,0.45)',
        card: '0 8px 32px rgba(0,0,0,0.55)'
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #E82127 0%, #A8131A 100%)',
        'noise':
          'radial-gradient(circle at 20% 10%, rgba(232,33,39,0.08), transparent 40%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.04), transparent 50%)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2.2s ease-in-out infinite alternate',
        'scan': 'scan 2.2s linear infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'ping-slow': 'ping 2.6s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'sweep': 'sweep 3s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 8px rgba(232,33,39,0.4)' },
          '100%': { boxShadow: '0 0 36px rgba(232,33,39,0.8)' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
