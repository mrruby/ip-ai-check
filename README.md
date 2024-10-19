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
