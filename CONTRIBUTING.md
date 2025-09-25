
# Contributing to VitalitySync

Thank you for your interest in contributing to VitalitySync! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:
1. Check if the issue already exists
2. Provide a clear description of the problem
3. Include steps to reproduce the issue
4. Add screenshots if applicable
5. Specify your browser and operating system

### Suggesting Features

We welcome feature suggestions! Please:
1. Check if the feature has already been requested
2. Provide a detailed description of the feature
3. Explain the use case and benefits
4. Consider the technical feasibility

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/JBLinx-Studio/VitalitySync.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Test your changes thoroughly

4. **Submit a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Components**: Create small, focused, reusable components
- **Styling**: Use Tailwind CSS for all styling
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add comments for complex logic

### File Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Shadcn/UI base components
│   └── [Feature]/ # Feature-specific components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── contexts/      # React contexts
├── services/      # API and external services
└── lib/           # Utility functions
```

### Component Guidelines

- Keep components under 200 lines
- Use TypeScript interfaces for props
- Implement proper error handling
- Make components responsive by default
- Use semantic HTML elements

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(food-tracker): add nutrition search functionality
fix(dashboard): resolve chart rendering issue
docs(readme): update installation instructions
```

## 🧪 Testing

Before submitting a PR:

1. **Manual Testing**
   - Test your changes in different browsers
   - Verify responsive design on mobile devices
   - Check accessibility features

2. **Code Quality**
   - Run TypeScript type checking: `npm run type-check`
   - Ensure no console errors or warnings
   - Follow the existing patterns and conventions

## 🏗️ Building and Deployment

### Local Development
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Production Build
- Builds are automatically deployed to GitHub Pages
- Manual builds generate files in the `dist/` directory
- Ensure all assets are properly referenced

## 📱 Responsive Design

All components must be responsive:
- Mobile-first approach using Tailwind CSS
- Test on various screen sizes
- Use appropriate breakpoints (sm, md, lg, xl)
- Ensure touch-friendly interactions

## ♿ Accessibility

Please ensure your contributions are accessible:
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers when possible

## 🎨 Design System

We use a consistent design system:
- **Colors**: Primary (teal), Secondary (purple), Success (green), etc.
- **Typography**: Consistent font sizes and weights
- **Spacing**: Use Tailwind spacing utilities
- **Components**: Extend Shadcn/UI components when possible

## 🔧 Technical Considerations

### Performance
- Optimize images and assets
- Use lazy loading when appropriate
- Minimize bundle size
- Implement proper caching strategies

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

### Data Handling
- Implement proper error handling
- Use TypeScript for type safety
- Validate user inputs
- Handle loading and error states

## 📞 Getting Help

If you need help:
1. Check the documentation
2. Look at existing code examples
3. Create an issue with the "question" label
4. Contact the maintainers

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

## 📜 Code of Conduct

Please be respectful and professional in all interactions. We're all here to build something great together!

---

Thank you for contributing to VitalitySync! Your efforts help make health tracking accessible and effective for everyone.

**Made with ❤️ by JBLinx Studio**
