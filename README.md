# Algo Plus - IT Solutions & Digital Marketing Agency Website

> Your Trusted IT Solutions Partner in UAE | Dubai, Abu Dhabi, Sharjah & GCC

![React](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646cff?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3?logo=bootstrap)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 🚀 About Algo Plus

Algo Plus is a leading IT solutions and digital marketing agency serving businesses across the United Arab Emirates and expanding throughout the GCC region. We specialize in:

- **Microsoft Solutions** - Azure, Office 365, Dynamics 365, Power Platform
- **ERP & CRM Systems** - Salesforce, SAP, Odoo, custom implementations
- **AI Voice Agents** - Multilingual customer service automation (English & Arabic)
- **Digital Marketing** - SEO, PPC, Social Media, Content Marketing for UAE/GCC
- **AI Content & Video Production** - Generative AI tools and professional video services
- **Ecommerce Growth** - Shopify, WooCommerce, Magento with UAE payment gateways

**Website:** [https://algopluss.com](https://algopluss.com)
**Location:** 140 Sheikh Zayed Rd - Al Wasl, Dubai, UAE
**Phone:** +971-50-485-2446
**Email:** info@algopluss.com

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [SEO Optimization](#seo-optimization)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Content Management](#content-management)
- [License](#license)

## ✨ Features

### Core Features
- ✅ **Fully Responsive** - Mobile-first design optimized for all devices
- ✅ **SEO Optimized** - Enhanced meta tags, structured data, sitemap for UAE/GCC markets
- ✅ **Multi-Language Support** - Content structure ready for English and Arabic
- ✅ **Fast Performance** - Vite build system with code splitting and lazy loading
- ✅ **Modern UI/UX** - Bootstrap 5.3.8 with custom theming
- ✅ **Accessibility** - WCAG compliant with skip links and semantic HTML
- ✅ **Schema Markup** - Rich LocalBusiness and Service structured data
- ✅ **Geographic Targeting** - Optimized for Dubai, Abu Dhabi, Sharjah, Ajman, and GCC

### Technical Features
- React 19.1.0 with modern hooks
- React Router DOM 7.7.1 for client-side routing
- Swiper 11.2.10 for carousels
- Animate.css 4.1.1 for scroll animations
- React Intersection Observer for performance
- Custom hooks for animations and counters
- Modular component architecture
- Optimized image formats (WebP)

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.1.0 |
| **Build Tool** | Vite | 7.0.4 |
| **Routing** | React Router DOM | 7.7.1 |
| **UI Framework** | Bootstrap | 5.3.8 |
| **Carousel** | Swiper | 11.2.10 |
| **Animations** | Animate.css | 4.1.1 |
| **Linting** | ESLint | 9.30.1 |
| **Node.js** | Node | 18+ recommended |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (or yarn/pnpm)

### Installation

1. **Clone or extract the project:**
   ```bash
   cd marko_main_files/marko-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
marko-react/
├── public/                      # Static assets
│   ├── assets/
│   │   ├── images/             # Images (WebP optimized)
│   │   ├── css/                # Vendor CSS
│   │   └── audio/              # Audio files
│   ├── robots.txt              # SEO robots configuration
│   └── sitemap.xml             # XML sitemap for search engines
│
├── src/
│   ├── Components/             # Reusable React components
│   │   ├── Card/              # Card components (services, testimonials, etc.)
│   │   ├── FAQs/              # FAQ component
│   │   ├── Form/              # Contact form
│   │   ├── Hooks/             # Custom React hooks
│   │   ├── Video/             # Video modal components
│   │   └── ...
│   │
│   ├── Data/                   # Data files (JSON-like)
│   │   ├── SiteData.js        # Main site data (services, blog, FAQs)
│   │   ├── ServiceData.jsx    # Service listings
│   │   ├── FaqData.jsx        # FAQ data
│   │   ├── TestimonialData.jsx# Client testimonials
│   │   ├── CaseStudiesData.jsx# Case studies
│   │   ├── TeamData.jsx       # Team member data
│   │   └── ...
│   │
│   ├── Page/                   # Page components
│   │   ├── Home/              # Homepage
│   │   ├── About/             # About page
│   │   ├── Service/           # Services pages
│   │   ├── Contact/           # Contact page
│   │   ├── Blog/              # Blog listing
│   │   ├── FAQs/              # FAQ page
│   │   └── ...
│   │
│   ├── App.jsx                 # Root application component
│   ├── Routers.jsx             # Route definitions
│   └── main.jsx                # Application entry point
│
├── index.html                  # HTML template with SEO meta tags
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🔍 SEO Optimization

### Implemented SEO Features

#### 1. **Enhanced Meta Tags**
- Geographic targeting for UAE cities (Dubai, Abu Dhabi, Sharjah, Ajman)
- Open Graph tags for social media sharing
- Twitter Card meta tags
- Canonical URLs
- Multi-region hreflang tags for GCC expansion

#### 2. **Structured Data (Schema.org)**
- LocalBusiness schema with multi-city coverage
- Service schema for all 6 core services
- WebSite schema with search action
- BreadcrumbList schema
- Organization schema with contact points

#### 3. **Technical SEO**
- XML sitemap (`/sitemap.xml`)
- Optimized robots.txt
- Mobile-first responsive design
- Fast loading with code splitting
- WebP image format for performance
- Semantic HTML5 structure

#### 4. **Content Optimization**
- UAE/GCC focused keywords
- Localized content for Dubai, Abu Dhabi, Sharjah markets
- FAQ schema markup
- Multilingual content structure (English/Arabic ready)

### Key SEO Keywords
- IT solutions UAE
- Digital marketing Dubai
- AI voice agents UAE
- ERP CRM Dubai
- Microsoft solutions Abu Dhabi
- Ecommerce growth UAE
- Digital transformation GCC

## 💻 Development

### Available Scripts

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Guidelines

1. **Adding New Services:**
   - Edit `src/Data/SiteData.js` → `serviceData` array
   - Add icon, title, description, and content
   - Include UAE/GCC focused keywords

2. **Updating FAQs:**
   - Edit `src/Data/FaqData.jsx`
   - Ensure questions include location keywords (Dubai, UAE, etc.)
   - Answer with specific regional context

3. **Managing Blog Posts:**
   - Edit `src/Data/BlogPostData.jsx`
   - Update with relevant UAE tech/marketing topics

4. **Testimonials:**
   - Edit `src/Data/TestimonialData.jsx`
   - Replace with actual client testimonials

5. **Case Studies:**
   - Edit `src/Data/CaseStudiesData.jsx`
   - Update with real project results

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with:
- Minified JavaScript and CSS
- Code splitting for optimal loading
- Compressed assets
- Source maps for debugging

### Deployment Checklist

- [ ] Update all placeholder content with actual data
- [ ] Replace dummy images with real company assets
- [ ] Configure analytics (Google Analytics, Facebook Pixel)
- [ ] Set up contact form backend
- [ ] Test on multiple devices and browsers
- [ ] Verify all SEO meta tags
- [ ] Submit sitemap to Google Search Console
- [ ] Test page speed (target: 90+ on PageSpeed Insights)
- [ ] Configure CDN for assets
- [ ] Set up SSL certificate (HTTPS)

### Recommended Hosting
- **Vercel** - Automatic deployments, edge network, great for React
- **Netlify** - Continuous deployment, form handling, serverless functions
- **AWS Amplify** - Full AWS integration
- **Azure Static Web Apps** - Microsoft ecosystem integration

## 📝 Content Management

### Updating Company Information

1. **Contact Details** (`index.html` + data files):
   - Phone: +971-50-485-2446
   - Email: info@algopluss.com
   - Address: 140 Sheikh Zayed Rd - Al Wasl, Dubai, UAE

2. **Social Media Links** (`index.html` structured data):
   - Facebook: https://facebook.com/algoplus
   - LinkedIn: https://linkedin.com/company/algoplus
   - Instagram: https://instagram.com/algoplus

3. **Services** (`src/Data/SiteData.js`):
   - Microsoft Solutions
   - ERP & CRM Systems
   - AI Voice Agents
   - Digital Marketing
   - AI Content & Video
   - Ecommerce Growth

### Logo & Branding
- Logo: `public/assets/images/marko-logo.webp` (replace with Algo Plus logo)
- Favicon: `public/assets/images/favicon.webp`
- Update meta OG images in `index.html`

## 📄 License

**Proprietary - Algo Plus**

This website is the property of Algo Plus. All rights reserved.

---

## 📞 Contact & Support

**Algo Plus**
Your Trusted IT Solutions Partner

- **Website:** [https://algopluss.com](https://algopluss.com)
- **Email:** info@algopluss.com
- **Phone:** +971-50-485-2446
- **Location:** Dubai, United Arab Emirates

**Business Hours:**
- Monday - Thursday: 09:00 - 18:00 GST
- Friday: 09:00 - 14:00 GST
- Saturday - Sunday: Closed

---

**Serving:** Dubai | Abu Dhabi | Sharjah | Ajman | UAE | GCC

*Built with React + Vite | Optimized for UAE & GCC Markets*
