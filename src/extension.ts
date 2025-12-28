import * as vscode from "vscode";

interface ThemeSchedule {
  start: string;
  end: string;
  theme: string;
}

function getSchedules(): ThemeSchedule[] {
  const config = vscode.workspace.getConfiguration("autoThemeSwitcher");
  return config.get<ThemeSchedule[]>("schedules") || [];
}

function getCheckInterval(): number {
  const config = vscode.workspace.getConfiguration("autoThemeSwitcher");
  return (config.get<number>("checkInterval") || 60) * 1000;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getThemeForCurrentTime(): string | null {
  const schedules = getSchedules();
  if (schedules.length === 0) {
    return null;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const period of schedules) {
    const start = timeToMinutes(period.start);
    const end = timeToMinutes(period.end);

    if (start < end) {
      // Normal range (e.g., 06:00 - 12:00)
      if (currentMinutes >= start && currentMinutes < end) {
        return period.theme;
      }
    } else {
      // Overnight range (e.g., 21:00 - 06:00)
      if (currentMinutes >= start || currentMinutes < end) {
        return period.theme;
      }
    }
  }
  return schedules[schedules.length - 1].theme;
}

async function switchTheme() {
  const targetTheme = getThemeForCurrentTime();
  if (!targetTheme) {
    return;
  }

  const config = vscode.workspace.getConfiguration();
  const currentTheme = config.get<string>("workbench.colorTheme");

  if (currentTheme !== targetTheme) {
    await config.update("workbench.colorTheme", targetTheme, true);
    vscode.window.showInformationMessage(`Theme switched to: ${targetTheme}`);
  }
}

let intervalId: ReturnType<typeof setInterval> | undefined;

function startInterval() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(switchTheme, getCheckInterval());
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Auto Theme Switcher: Extension activated!");
  switchTheme();
  startInterval();

  // Re-read settings when they change
  const configListener = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("autoThemeSwitcher")) {
      console.log("Auto Theme Switcher: Settings changed, reloading...");
      startInterval();
      switchTheme();
    }
  });

  const command = vscode.commands.registerCommand(
    "auto-theme-switcher.switch",
    switchTheme
  );

  context.subscriptions.push(command);
  context.subscriptions.push(configListener);
  context.subscriptions.push({ dispose: () => clearInterval(intervalId) });
}

export function deactivate() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}
