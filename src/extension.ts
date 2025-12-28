import * as vscode from "vscode";

// Configure your themes here - use "HH:MM" format (24-hour)
const THEMES = [
  { start: "06:00", end: "12:00", theme: "Default Light+" },
  { start: "12:00", end: "18:00", theme: "Solarized Light" },
  { start: "18:00", end: "21:00", theme: "One Dark Pro" },
  { start: "21:00", end: "06:00", theme: "Default Dark+" },
];

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getThemeForCurrentTime(): string {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const period of THEMES) {
    const start = timeToMinutes(period.start);
    const end = timeToMinutes(period.end);

    if (start < end) {
      // Normal range (e.g., 06:00 - 12:00)
      if (currentMinutes >= start && currentMinutes < end) return period.theme;
    } else {
      // Overnight range (e.g., 21:00 - 06:00)
      if (currentMinutes >= start || currentMinutes < end) return period.theme;
    }
  }
  return THEMES[THEMES.length - 1].theme;
}

async function switchTheme() {
  const targetTheme = getThemeForCurrentTime();
  const config = vscode.workspace.getConfiguration();
  const currentTheme = config.get<string>("workbench.colorTheme");

  if (currentTheme !== targetTheme) {
    await config.update("workbench.colorTheme", targetTheme, true);
    vscode.window.showInformationMessage(`Theme switched to: ${targetTheme}`);
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Auto Theme Switcher: Extension activated!");
  console.log("Current hour:", new Date().getHours());
  console.log("Target theme:", getThemeForCurrentTime());
  switchTheme();

  const interval = setInterval(switchTheme, 60 * 1000); // Check every minute
  const command = vscode.commands.registerCommand(
    "auto-theme-switcher.switch",
    switchTheme
  );

  context.subscriptions.push(command);
  context.subscriptions.push({ dispose: () => clearInterval(interval) });
}

export function deactivate() {}
