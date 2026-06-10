# World Explorer (Where to fly?)

A modern web application built with Nuxt 4 for exploring countries worldwide, featuring real-time weather data and currency conversion.

[🇺🇦 Читати українською](./README.uk.md)

## 🚀 Features

- **Country Exploration**: Browse and search countries with detailed information.
- **Weather Data**: Real-time weather information for capital cities via OpenWeather API.
- **Currency Converter**: Easy conversion between various currencies.
- **Modern UI**: Built with Nuxt UI and Tailwind CSS for a fast, responsive experience.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Component Library**: [Nuxt UI](https://ui.nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide](https://lucide.dev/) via Iconify
- **API**: [OpenWeather](https://openweathermap.org/api)

## 📦 Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example` and add your OpenWeather API key:
   ```env
   NUXT_PUBLIC_OPEN_WEATHER_API_KEY=your_key_here
   ```

3. **Development Mode**:
   ```bash
   pnpm dev
   ```

4. **Production Build**:
   ```bash
   pnpm build
   ```

## 📝 License

This project is licensed under the MIT License.
