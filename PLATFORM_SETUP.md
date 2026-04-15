# Platform Setup Guide

This project is scaffolded with Expo + React Native.

## 1) Web

```bash
npm run web
```

## 2) iOS (iPhone + iPad)

```bash
npm run ios
```

Use the iPad simulator in Xcode to validate tablet behavior.

Notes:
- `app.json` already has `ios.supportsTablet: true`.

## 3) macOS

Expo does not directly produce a macOS runtime target out of the box. The recommended skeleton flow is:

1. Generate native iOS project:
   ```bash
   npm run prebuild:ios
   ```
2. Open the iOS workspace in Xcode.
3. Add one of the following:
   - A Mac Catalyst target from the iOS app target, or
   - A dedicated React Native macOS target using `react-native-macos` tooling.
4. Keep shared app logic in JavaScript/TypeScript and bridge native modules as needed.

`macos/` is provided as a placeholder for platform-specific native files and notes.

## 4) watchOS

React Native does not natively run directly on watchOS. Standard architecture is:

1. Keep core logic/UI in React Native for phone/web.
2. Add a watchOS companion target in Xcode under the iOS project.
3. Implement watch UI in SwiftUI and sync data with the phone app.

Suggested first command:

```bash
npm run prebuild:ios
```

Then add watch targets in Xcode.

`watchos/` is provided as a placeholder for watch-specific native code.
