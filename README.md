# React Weather App

A React and TypeScript weather dashboard with OpenWeather forecasts and an interactive Leaflet map.

## Features

- Search locations and choose preset locations.
- View current weather, hourly and daily forecasts, and additional metrics.
- Click the map to select coordinates.
- Switch weather overlays and view their legends.
- Show skeletons while forecast data loads.

## Requirements

- Node.js `^20.19.0 || >=22.12.0` and npm.
- An OpenWeather key with access to the One Call 3.0 API, geocoding, and the map tiles used by the app.
- A MapTiler key for the base map.

## Run locally

```sh
git clone https://github.com/PravatKumaraMishra/React-Weather-app.git
cd React-Weather-app
npm ci
```

Copy `.env.example` to `.env.local` and fill in:

```dotenv
VITE_API_KEY=your_openweather_api_key
```

The MapTiler key is currently configured directly in `src/components/Map.tsx` inside `MapTileLayer`. Replace that value with your own MapTiler key locally. There is no separate MapTiler environment variable in the current source.

Search for a city or click the map, then choose a map overlay.

```sh
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Available commands

| Command | Script |
| --- | --- |
| `npm run dev` | `vite` |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | `eslint .` |
| `npm run preview` | `vite preview` |

`npm run preview` serves the output of `npm run build`; it does not build the project itself.

## Project structure

- `src/hooks/api.ts`: OpenWeather forecast and geocoding calls.
- `src/schema/`: Zod response schemas.
- `src/components/cards/`: weather panels.
- `src/components/Map.tsx`: base map, overlays, and coordinate selection.
- `src/components/skeletons/`: loading UI.

## Notes

Forecasts depend on API access and provider quotas. A valid key without One Call 3.0 access can still fail. MapTiler and OpenWeather are separate services. Browser API keys are visible in client requests; do not paste backend secrets into frontend variables.
