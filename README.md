# Weather App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the required dependencies

```bash
yarn
# or
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

### File Structure

Entry point of the application is located in `index.tsx`.

There are 3 react components, located in `src/components`:

- `WeatherApp` The weather app main component
- `CitySearch` The autocomplete input component to search for the weather of a city
- `WeatherDisplay` The component to display weather information

There are 2 API routes endpoints, located in `src/pages/api`:

- `weather` Fetch weather information from Open-Meteo, and response with a structured JSON object
- `country` Fetch city names, latitude and longitude from a JSON file

There are 2 react hooks, located in `src/hooks`:

- `useWeather` With a given latitude and longitude, fetch weather information from `weather` API route
- `useCity` With a given keyworkd, fetch city names, latitude and longitude from `country` API route
# weather-app
