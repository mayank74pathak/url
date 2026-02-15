# URL Shortener 🔗

A modern, full-featured URL shortener application built with React and Supabase. Create short, memorable links and track their performance with detailed analytics.

## ✨ Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Short URLs**: Create personalized short links
- **QR Code Generation**: Generate QR codes for your shortened URLs
- **Analytics Dashboard**: Track clicks, locations, and device types
- **User Authentication**: Secure login and signup with Supabase
- **Link Management**: View and manage all your shortened URLs in one place
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Routing**: React Router DOM
- **Backend**: Supabase (Authentication + Database)
- **Charts**: Recharts
- **Form Validation**: Yup
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- A Supabase account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd url-main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Create the necessary tables in your Supabase database:
   - `urls` table for storing shortened URLs
   - `clicks` table for tracking analytics
3. Set up authentication in your Supabase project

### 4. Configure environment variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
```

### 5. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Usage

1. **Create an Account**: Sign up with your email
2. **Shorten a URL**: Enter a long URL on the landing page or dashboard
3. **Customize**: Add a custom short URL (optional)
4. **Share**: Copy your short link or use the generated QR code
5. **Track**: View analytics for clicks, locations, and devices

## 📁 Project Structure

```
url-main/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── create-link.jsx
│   │   ├── header.jsx
│   │   ├── login.jsx
│   │   └── ...
│   ├── db/             # Supabase API functions
│   │   ├── apiUrls.js
│   │   ├── apiClicks.js
│   │   ├── apiauth.js
│   │   └── supabase.js
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   │   ├── landing.jsx
│   │   ├── dashboard.jsx
│   │   ├── auth.jsx
│   │   └── ...
│   ├── lib/            # Utility functions
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🔒 Security

- Environment variables are used for sensitive data
- Authentication is handled by Supabase
- All API requests are secured through Supabase Row Level Security (RLS)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues

If you encounter any issues or have suggestions, please file an issue on the GitHub repository.

## 📧 Support

For support or questions, please open an issue or contact the maintainers.

---

Made with ❤️ using React and Supabase
