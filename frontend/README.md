# GreenSwap - Clean Frontend

A modern, clean frontend for the GreenSwap sustainable item swapping application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎨 Clean Design
- Modern, minimalist interface with excellent typography
- Consistent spacing and visual hierarchy
- Smooth transitions and hover effects
- Responsive design for all screen sizes

### 🚀 Technology Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Radix UI** components for accessibility

### 📱 Pages
- **Home Page**: Landing page with authentication and feature highlights
- **Swipe Page**: Tinder-like interface for discovering items
- **Profile Page**: User profile management and item listing
- **Matches Page**: View and manage swap matches

### 🎯 Key Improvements
- **Better Typography**: Using Inter font for improved readability
- **Consistent Color Scheme**: Emerald green primary with slate grays
- **Improved Spacing**: Better use of whitespace and padding
- **Enhanced Components**: Reusable UI components with proper TypeScript support
- **Better UX**: Smooth transitions, loading states, and intuitive navigation

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend-clean/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── swipe/          # Swipe page
│   │   ├── profile/        # Profile page
│   │   └── matches/        # Matches page
│   ├── components/
│   │   └── ui/             # Reusable UI components
│   └── lib/
│       └── utils.ts        # Utility functions
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Design Principles

### Color Palette
- **Primary**: Emerald green (`#059669`) for sustainability theme
- **Secondary**: Slate grays for text and backgrounds
- **Accent**: Soft pinks and blues for highlights
- **Success**: Green variants for positive actions

### Typography
- **Font**: Inter for clean, modern readability
- **Hierarchy**: Clear heading sizes and text weights
- **Spacing**: Consistent line heights and letter spacing

### Components
- **Consistent**: All components follow the same design patterns
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design approach
- **Reusable**: Modular components for easy maintenance

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new components
3. Ensure responsive design for all screen sizes
4. Test components thoroughly before submitting

## License

This project is part of the Technova 2025 hackathon.