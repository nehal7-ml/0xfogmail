# Email Web App Guidelines

## Project Overview
This is a professional email web application built with React, TypeScript, and Tailwind CSS, featuring a Web3-inspired design theme.

## Design System Guidelines

### Theme System
- **Dark Theme**: Primary colors use neon green (#00ff88) with purple accents (#8b5cf6)
- **Light Theme**: Professional blue (#0066cc) with clean, business-appropriate styling
- **Theme switching**: Available in Settings screen with instant application
- **Font sizes**: Small (12px), Medium (14px), Large (16px) with responsive scaling

### Component Guidelines
- **Web3 Styling**: Use `web3-card`, `web3-button`, `web3-input` classes for consistent theming
- **Button Usage**: 
  - Primary buttons for main actions (Send, Log in)
  - Outline buttons for secondary actions (Cancel, Back)
  - Ghost buttons for minimal actions (navigation, tools)
- **Typography**: 
  - Avoid Tailwind font size classes unless specifically needed
  - Use CSS custom properties for consistent font scaling
  - Maintain proper contrast ratios for accessibility

### Layout Guidelines
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Full Screen Pages**: Settings and Compose screens should be full-screen on all devices
- **Navigation**: Consistent back buttons and clear navigation flow
- **Spacing**: Use consistent padding and margins following the design system

### Code Organization
- **Component Structure**: Separate logical components into their own files
- **Type Safety**: Use TypeScript interfaces for all props and data structures
- **State Management**: Keep state close to where it's used, lift up when needed for sharing
- **Performance**: Use React.forwardRef for components that need ref access

## File Structure Guidelines
- `/components/` - All React components
- `/components/ui/` - Reusable UI components (ShadCN)
- `/components/figma/` - Figma-specific components (protected)
- `/styles/` - Global CSS and styling
- `/.vscode/` - VS Code configuration files only

## Development Guidelines
- **Code Formatting**: Use Prettier with the provided configuration
- **Linting**: Follow ESLint rules for code quality
- **Git**: Use meaningful commit messages and branch names
- **Testing**: Ensure all functionality works across different screen sizes and themes