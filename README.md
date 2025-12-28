# Auto Theme Switcher

Automatically switches your VS Code theme based on the time of day.

## Features

- Automatically changes themes at specified times
- Fully configurable through VS Code settings
- Checks every minute (configurable)
- Manual switch command available
- Supports precise time configuration (HH:MM format)

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

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `autoThemeSwitcher.schedules` | array | (see above) | Array of time-based theme schedules |
| `autoThemeSwitcher.checkInterval` | number | 60 | How often to check time (in seconds) |

### Schedule Format

Each schedule entry requires:
- `start`: Start time in HH:MM format (24-hour)
- `end`: End time in HH:MM format (24-hour)
- `theme`: Exact VS Code theme name

## Usage

The extension activates automatically when VS Code starts.

To manually trigger a theme switch:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Auto Theme: Switch Now"
3. Press Enter

## Finding Theme Names

To find the exact theme name:
1. Press `Ctrl+Shift+P`
2. Type "Preferences: Color Theme"
3. The theme names shown are exactly what you should use

## Release Notes

### 0.0.3
- Added user-configurable settings
- Configurable check interval
- Settings reload without restart

### 0.0.2
- Initial public release

## License

MIT
