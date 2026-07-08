import { app, BrowserWindow, Menu, nativeTheme } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,

    autoHideMenuBar: true,

    backgroundColor: "#ffffff",

    titleBarStyle: "hidden",

    titleBarOverlay: {
      color: "#ffffff",
      symbolColor: "#000000",
      height: 30,
    },

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Hide menu completely
  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Open links inside same window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    mainWindow.loadURL(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {

  // Force light mode
  nativeTheme.themeSource = "light";

  createWindow();

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});