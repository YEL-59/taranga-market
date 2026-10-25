# 🌟 Taranga Market

**Taranga Market** is a comprehensive online marketplace platform built with Next.js, designed specifically for Senegal. Browse and discover vehicles, properties, electronics, professional services, and job opportunities all in one place.

## ✨ Features

- 🚗 **Vehicles Marketplace** - Cars, motorcycles, and more
- 🏠 **Property Listings** - Rentals, sales, and commercial spaces
- 📱 **Electronics & Phones** - Latest gadgets and devices
- 🛠️ **Professional Services** - Plumbing, cleaning, design, and more
- 💼 **Job Board** - Career opportunities across industries
- ❤️ **Favorites System** - Save and manage your favorite listings
- 🔍 **Advanced Filtering** - Find exactly what you need
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Beautiful, intuitive interface

## 📚 Documentation

- **[User Guide](./USER_GUIDE.md)** - Comprehensive guide for using the platform
- **[Quick Start](./QUICK_START.md)** - Get started in minutes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YEL-59/taranga-market.git
cd taranga-market
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image
- **State Management**: React Context API

## 📁 Project Structure

```
taranga-market/
├── app/                    # Next.js app directory
│   ├── (MainLayout)/      # Main layout pages
│   │   ├── vehicles/      # Vehicles category
│   │   ├── properties/    # Properties category
│   │   ├── products/      # Products/Phones category
│   │   ├── services/      # Services category
│   │   ├── jobs/          # Jobs category
│   │   └── favorites/     # Favorites page
│   └── layout.tsx         # Root layout
├── features/              # Feature modules
│   ├── vehicles/         # Vehicle components & data
│   ├── properties/       # Property components & data
│   ├── phones/           # Phone/Product components & data
│   ├── services/         # Service components & data
│   ├── jobs/             # Job components & data
│   ├── home/             # Homepage sections
│   └── allitems/         # All items page
├── components/           # Shared UI components
│   └── ui/              # Shadcn UI components
├── context/             # React Context providers
├── shared/              # Shared components (navbar, footer)
└── public/              # Static assets
```

## 🎨 Key Features Explained

### Category Pages
Each category (Vehicles, Properties, Products, Services, Jobs) has:
- Dedicated filtering sidebar
- Grid layout with responsive cards
- Detail view with image galleries
- Seller information and contact options

### Filtering System
- Location-based filtering
- Price range selection
- Category-specific filters (e.g., make/model for vehicles)
- Real-time results update

### Favorites
- Save items across all categories
- Persistent storage using Context API
- Quick access from navigation bar
- Easy management and removal

### Responsive Design
- Mobile-first approach
- Touch-optimized interactions
- Adaptive layouts for all screen sizes
- Mobile filter drawer

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (recommended)

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **YEL-59** - [GitHub Profile](https://github.com/YEL-59)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful UI components
- Unsplash for high-quality images
- All contributors and users

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for Senegal** 🇸🇳

