# Chrome Extension Project

This project is a Chrome extension built with React and TypeScript.

## Setup Instructions

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/mrruby/admin-messages
   cd admin-messages
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the mock API server:

   ```
   pnpm mock-api
   ```

   This will start a JSON server on port 3001 with a 4-second delay, simulating a real API.

4. Build the extension:

   ```
   pnpm build
   ```

5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `dist` folder in your project directory

## Assumptions

- The extension is designed to work with Chrome and may not be compatible with other browsers.
- Users have basic familiarity with Chrome extensions and how to load unpacked extensions.
- The project uses pnpm as the package manager, assuming users have it installed globally.

## Architectural Decisions

- React and TypeScript: Chosen for their strong typing system and component-based architecture, enhancing maintainability and scalability.
- Vite: Used as the build tool for its fast build times and modern development experience.
- Background Script: Implemented to handle long-running tasks and communicate with the Chrome API.
- Popup Component: Serves as the main user interface for the extension, accessible from the browser toolbar.
- Component-based Structure: Organized components (e.g., StatusMessage, MessageList) to promote reusability and separation of concerns.
- Mock API: Included for development and testing purposes, simulating backend interactions.

## Future Improvements

- Cross-browser Compatibility: Extend support to other browsers like Firefox and Edge.
- Testing: Add unit and integration tests to ensure reliability and ease of maintenance.
- Localization: Implement i18n support for multi-language capabilities.
- Performance Optimization: Analyze and optimize performance, especially for handling large message lists (pagination, lazy loading, etc.).
- User Settings: Add customizable options for users to personalize their experience.
- Offline Support: Add functionality to work offline and sync when connection is restored.
- Accessibility: Improve accessibility features to ensure the extension is usable by all.

## Demo Video

Check out this demo video to see the Admin Messages Chrome extension in action:

[![Admin Messages Chrome Extension Demo](https://cdn.loom.com/sessions/thumbnails/a3b544b81147492185d39c423cbade43-with-play.gif)](https://www.loom.com/share/a3b544b81147492185d39c423cbade43?sid=60588c47-085f-4ab2-ae79-4d0ded30420c)

This video provides a walkthrough of the extension's features and functionality.
