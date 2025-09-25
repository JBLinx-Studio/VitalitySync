
# VitalitySync - Complete Health & Wellness Tracking Platform

<div align="center">
  <img src="public/favicon.png" alt="VitalitySync Logo" width="80" height="80">
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://jblinx-studio.github.io/VitalitySync/)
  [![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://jblinx-studio.github.io/VitalitySync/)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
  [![Made by](https://img.shields.io/badge/Made%20by-JBLinx%20Studio-purple?style=for-the-badge)](https://github.com/JBLinx-Studio)
</div>

## 🎯 Overview

**VitalitySync** is a comprehensive health and wellness tracking platform designed to help users monitor and optimize every aspect of their health journey. Built with modern web technologies, it provides an intuitive interface for tracking nutrition, exercise, sleep, mental wellness, body measurements, and more.

## ✨ Features

### 🍎 **Nutrition Tracking**
- Comprehensive food database powered by USDA FoodData Central
- Macro and micronutrient analysis
- Water intake monitoring
- Meal planning and recommendations
- Calorie tracking with goal setting

### 🏃‍♂️ **Exercise & Fitness**
- Workout logging and progress tracking
- Exercise database with detailed instructions
- Performance analytics and insights
- Goal setting and achievement tracking
- Custom workout creation

### 🧠 **Mental Wellness**
- Mood tracking and analysis
- Stress level monitoring
- Mindfulness and meditation tracking
- Mental health insights and trends
- Personalized wellness recommendations

### 😴 **Sleep Analysis**
- Sleep duration and quality tracking
- Sleep pattern analysis
- Sleep goal setting and monitoring
- Insights for better sleep hygiene
- Correlation with other health metrics

### 📏 **Body Measurements**
- Weight and body composition tracking
- Progress photos and measurements
- BMI and health metric calculations
- Visual progress tracking with charts
- Goal setting and milestone celebrations

### 🎯 **Addiction Recovery**
- Habit tracking and breaking
- Progress monitoring
- Support system integration
- Milestone celebrations
- Recovery insights and analytics

### 🏆 **Achievements & Gamification**
- Achievement system with badges
- Progress milestones
- Streak tracking
- Personal records
- Motivation through gamification

## 🚀 Live Demo

Experience VitalitySync live at: **[https://jblinx-studio.github.io/VitalitySync/](https://jblinx-studio.github.io/VitalitySync/)**

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with automated CI/CD

## 📱 Key Pages & Features

- **🏠 Landing Page**: Beautiful hero section with feature highlights
- **📊 Dashboard**: Comprehensive health overview with analytics
- **🥗 Food Tracker**: Detailed nutrition logging and analysis
- **💪 Exercise Tracker**: Workout logging and fitness analytics
- **😴 Sleep Tracker**: Sleep quality and pattern monitoring
- **🧘 Mental Wellness**: Mood and stress tracking
- **📐 Body Measurements**: Physical progress tracking
- **🚭 Addiction Tracker**: Habit breaking and recovery support
- **🏆 Achievements**: Gamification and milestone tracking
- **👤 User Profile**: Personal settings and preferences

## 🏗️ Installation & Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JBLinx-Studio/VitalitySync.git
   cd VitalitySync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. Every push to the main branch triggers a new deployment.

### Manual Deployment
```bash
npm run build
# Files will be generated in the 'dist' directory
```

## 🏗️ Project Structure

```
VitalitySync/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/UI components
│   │   ├── Layout/       # Layout components
│   │   ├── FoodDiary/    # Food tracking components
│   │   └── ...
│   ├── pages/            # Application pages
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── .github/workflows/    # GitHub Actions
└── docs/                 # Documentation
```

## 🔧 Configuration

### Environment Variables
The application uses environment-based configuration for different deployment scenarios:
- **Development**: Runs on `localhost:8080`
- **Production**: Deployed on GitHub Pages with `/VitalitySync/` base path

### Routing Configuration
Smart routing detection automatically configures the correct base path:
- Lovable preview: No base path
- GitHub Pages: `/VitalitySync/` base path
- Local development: No base path

## 📊 Data Sources

- **USDA FoodData Central**: Comprehensive nutrition database
- **Exercise Database**: Curated exercise library with instructions
- **Local Storage**: User data persistence (client-side)

## 🤝 Contributing

We welcome contributions to VitalitySync! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow existing component patterns
- Use Tailwind CSS for styling
- Ensure responsive design
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About JBLinx Studio

**VitalitySync** is proudly developed by **JBLinx Studio**, a innovative software development company specializing in modern web applications and digital health solutions.

### Contact & Support
- **Website**: [JBLinx Studio](https://github.com/JBLinx-Studio)
- **GitHub**: [@JBLinx-Studio](https://github.com/JBLinx-Studio)
- **Issues**: [Report a Bug](https://github.com/JBLinx-Studio/VitalitySync/issues)

## 🙏 Acknowledgments

- **USDA FoodData Central** for comprehensive nutrition data
- **Shadcn/UI** for beautiful, accessible UI components
- **Lucide** for the comprehensive icon library
- **Recharts** for powerful data visualization
- **Tailwind CSS** for utility-first styling
- **React & TypeScript** for robust application architecture

## 📈 Roadmap

- [ ] **Mobile App**: React Native version
- [ ] **Backend Integration**: User accounts and data synchronization
- [ ] **Social Features**: Community challenges and sharing
- [ ] **Advanced Analytics**: AI-powered health insights
- [ ] **Wearable Integration**: Smartwatch and fitness tracker sync
- [ ] **Nutrition AI**: Meal photo recognition and analysis
- [ ] **Telemedicine**: Healthcare provider integration

---

<div align="center">
  <p><strong>Made with ❤️ by JBLinx Studio</strong></p>
  <p>Empowering healthier lives through technology</p>
</div>
