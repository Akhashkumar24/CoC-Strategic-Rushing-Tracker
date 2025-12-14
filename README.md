# CoC Strategic Rushing Tracker

A React-based tracker for Clash of Clans strategic rushing progress from TH8 to TH18.

## Features

- Track building upgrades (Clan Castle, Army Camps, Storages, Defenses, etc.)
- Monitor laboratory research progress (Dragons, Balloons, Spells)
- Top 4 highest level tracking for Archer Towers and Cannons
- Visual progress bars and completion indicators
- Support for TH8 through TH18

## Installation

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm run dev
```

4. Build for production:
```bash
   npm run build
```

## Usage

1. Paste your account JSON data into the text area
2. The tracker will automatically detect your Town Hall level
3. View your progress across all tracked buildings and lab upgrades

## JSON Format

Your JSON should contain:
- `tag`: Player tag
- `buildings`: Array of building objects with `data` (ID) and `lvl` (level)
- `units`: Array of unit objects
- `spells`: Array of spell objects

## Bug Fixes

### Version 1.1.0
- **Fixed**: Top 4 Archer Tower and Cannon logic now correctly displays all 4 slots even when all levels are identical (e.g., 17,17,17,17,17,17,17 now shows 17/21, 17/21, 17/21, 17/21 instead of 17/21, 17/21, 0/21, 0/21)