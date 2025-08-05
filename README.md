# ProMail - Professional Email Client

A modern, responsive email web application built with React, TypeScript, and Tailwind CSS. Features a clean Material Design-inspired interface with full email functionality including compose, reply, forward, and settings management.

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Full Email Functionality**: Compose, reply, reply all, and forward emails
- **Rich Text Editor**: Format emails with bold, italic, underline, alignment, and bullet points
- **Professional Landing Page**: Clean, modern design with feature highlights
- **Settings Management**: Comprehensive settings with user account management
- **Text Selection Quoting**: Quote only selected text when replying
- **Dark Mode Support**: Built-in dark/light theme switching

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible component primitives
- **Lucide React** for icons
- **Vite** for build tooling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd promail-email-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components (shadcn/ui)
│   │   ├── ComposeScreen.tsx # Email composition screen
│   │   ├── EmailLayout.tsx   # Main email interface
│   │   ├── SettingsScreen.tsx # Settings management
│   │   └── ...
│   ├── styles/
│   │   └── globals.css      # Global styles and CSS variables
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
```

## Key Components

- **App.tsx**: Main application with screen navigation
- **EmailLayout**: Core email interface with sidebar and email list
- **ComposeScreen**: Full-screen email composition with rich text editing
- **SettingsScreen**: Comprehensive settings management
- **LandingPage**: Professional landing page for logged-out users

## Customization

The application uses CSS custom properties for theming. You can customize colors, spacing, and other design tokens in `styles/globals.css`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.