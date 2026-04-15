# Todoist React Native Skeleton

This folder contains a React Native skeleton app built with Expo (TypeScript) and prepared for these targets:

- Web
- iOS (iPhone)
- iPad
- macOS (skeleton setup path included)
- watchOS (skeleton setup path included)

## Quick Start

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run web
npm run ios
npm run ios:ipad
```

For macOS and watchOS setup instructions, see `PLATFORM_SETUP.md`.

## Scripts

- `npm run start` - Start Expo dev server
- `npm run dev` - Alias for start
- `npm run web` - Run in web browser
- `npm run ios` - Run on iOS simulator/device
- `npm run ios:ipad` - Run iOS target (use iPad simulator)
- `npm run prebuild:ios` - Generate native iOS project
- `npm run mac` - Prebuild iOS and print macOS next steps
- `npm run watch` - Prebuild iOS and print watchOS next steps
- `npm run clean` - Restart Expo with cache cleared
