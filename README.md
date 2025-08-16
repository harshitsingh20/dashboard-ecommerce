# Dashboard & E-Commerce Application

A modern, responsive web application built with Next.js that combines user management and product catalog functionality. Features a clean design with real-time data fetching from external APIs.

## 🚀 Features

### User Dashboard
- **User Management**: Display all users from JSONPlaceholder API
- **Search Functionality**: Real-time search across user names, emails, and companies
- **Interactive Cards**: Click on any user to view their posts in a modal
- **Responsive Design**: Optimized for desktop and mobile devices

### E-Commerce Product Listing
- **Product Catalog**: Fetch and display products from FakeStore API
- **Advanced Filtering**: Filter products by category (electronics, jewelry, men's clothing, women's clothing)
- **Smart Sorting**: Sort by price (low to high, high to low)
- **Pagination**: Display 10 products per page with navigation controls
- **Product Details**: Click on products to view detailed information in a modal
- **Responsive Grid**: Adaptive layout that works on all screen sizes

## 🎨 Design System

- **Color Palette**: Bold red primary (#DC2626) with yellow accents (#EAB308)
- **Typography**: Geist Sans for headings, Manrope for body text
- **Layout**: Clean, modern interface with generous whitespace
- **Components**: Built with shadcn/ui component library

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **APIs**: 
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for user data
  - [FakeStore API](https://fakestoreapi.com/) for product data

## 📁 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Main page with tab navigation
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── user-dashboard.tsx  # User management interface
│   ├── product-listing.tsx # E-commerce product catalog
│   └── ui/                 # shadcn/ui components
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd dashboard-ecommerce
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Application Screenshots

### Overview Dashboard

<img width="1305" height="682" alt="image" src="https://github.com/user-attachments/assets/05fe4c63-d70a-4638-b439-8be265ca97a0" />

### User Dashboard

<img width="1834" height="890" alt="image" src="https://github.com/user-attachments/assets/1cc3fe1c-e845-41e7-b698-e3bd041ec197" />

<img width="1834" height="890" alt="image" src="https://github.com/user-attachments/assets/9c19926a-58c8-497a-8de6-f7b96f306323" />


### Product Catalog

<img width="1834" height="890" alt="image" src="https://github.com/user-attachments/assets/e068a49a-cb72-4b8d-8891-d7555d2b191e" />

### Product Details Modal

<img width="1834" height="890" alt="image" src="https://github.com/user-attachments/assets/c089d39d-4a3f-46c1-9bcf-8c94e7b70b29" />


## 🔧 API Integration

### User Data
- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Features**: User profiles with contact information and company details
- **Posts**: `https://jsonplaceholder.typicode.com/posts?userId={id}`

### Product Data
- **Endpoint**: `https://fakestoreapi.com/products`
- **Features**: Product catalog with images, prices, categories, and ratings
- **Categories**: `https://fakestoreapi.com/products/categories`

## 🎯 Key Features Implementation

### Search Functionality
- Real-time filtering across multiple user fields
- Debounced input for optimal performance
- Case-insensitive matching

### Pagination System
- 10 products per page
- Previous/Next navigation
- Numbered page controls
- Automatic reset on filter changes

### Modal System
- User posts display
- Product detail views
- Responsive design with proper focus management

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes

## 🚀 Deployment

Vercel Link:- https://dashboard-ecommerce-neon.vercel.app/



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and modern web technologies.
