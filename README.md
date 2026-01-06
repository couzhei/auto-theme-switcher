# Theme Manager (Auto Theme Switcher)

Automatically switches between VS Code themes based on time of day.

## Features

- ⏰ Automatically changes themes at specified times
  - 🌗 Supports both normal and overnight time ranges
- ⚙️ Fully configurable through VS Code settings
- 🔄 Settings reload without restarting VS Code
- ⏱️ Configurable check interval (minimum 10 seconds)
- 💾 Manual switch command available

## Installation

The extension activates automatically when VS Code starts.

## Configuration

Add to your `settings.json`:

```json
{
  "autoThemeSwitcher.schedules": [
    { "start": "06:00", "end": "12:00", "theme": "Default Light+" },
    { "start": "12:00", "end": "18:00", "theme": "Solarized Light" },
    { "start": "18:00", "end": "21:00", "theme": "One Dark Pro" },
    { "start": "21:00", "end": "06:00", "theme": "Default Dark+" }
  ],
  "autoThemeSwitcher.checkInterval": 60
}
```

### Settings

| Setting                           | Type   | Default     | Description                                                    |
| --------------------------------- | ------ | ----------- | -------------------------------------------------------------- |
| `autoThemeSwitcher.schedules`     | array  | (see above) | Array of time-based theme schedules with start, end, and theme |
| `autoThemeSwitcher.checkInterval` | number | 60          | How often to check the time and apply theme changes (seconds)  |

### Schedule Format

Each schedule entry requires:

- `start`: Start time in HH:MM format (24-hour)
- `end`: End time in HH:MM format (24-hour)
- `theme`: Exact VS Code theme name

**Note:** Overnight ranges (e.g., 23:59 - 01:30) are supported. The extension determines the appropriate theme by checking if the current time falls within any defined range.

## Usage

The extension activates automatically when VS Code starts and switches themes based on your schedule.

To manually trigger a theme switch:

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Auto Theme: Switch Now"
3. Press Enter

## Finding Theme Names

To find the exact theme name for your configuration:

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Preferences: Color Theme"
3. Use the exact theme names shown in the list

## How It Works

- The extension checks your schedule every 60 seconds (configurable)
- It calculates which theme should be active based on the current time
- If the active theme differs from the current theme, it switches automatically
- Changes to settings are applied immediately without requiring a restart
- A notification is shown when the theme is switched

## License

MIT (Whatever that is)
