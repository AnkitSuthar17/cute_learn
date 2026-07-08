import {
  app,
  BrowserWindow,
  Menu,
  nativeTheme,
  shell,
} from "electron";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,

    title: "CuTe Learning",

    backgroundColor: "#ffffff",

    autoHideMenuBar: true,

    titleBarStyle:
      process.platform === "darwin" ? "hiddenInset" : "default",

    titleBarOverlay:
      process.platform === "win32"
        ? {
            color: "#ffffff",
            symbolColor: "#000000",
            height: 30,
          }
        : false,

    // Uncomment after adding icon.ico/icon.icns
    // icon: path.join(__dirname, "../build/icon.png"),

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Hide Menu
  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Disable Reload & DevTools
  mainWindow.webContents.on("before-input-event", (event, input) => {
    const key = input.key.toUpperCase();

    // Reload
    if (
      key === "F5" ||
      (input.control && key === "R") ||
      (input.meta && key === "R")
    ) {
      event.preventDefault();
    }

    // DevTools
    if (
      key === "F12" ||
      (input.control && input.shift && key === "I") ||
      (input.meta && input.alt && key === "I")
    ) {
      event.preventDefault();
    }
  });

  // Disable Right Click
  mainWindow.webContents.on("context-menu", (e) => {
    e.preventDefault();
  });

  // Offline Detection
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.executeJavaScript(`
      window.addEventListener("offline", () => {
        document.body.innerHTML = \`
          <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Arial;
            background:#ffffff;
            flex-direction:column;
            text-align:center;
            padding:20px;
          ">
            <h1 style="color:#ff7b00;">
              No Internet Connection
            </h1>

            <p style="font-size:18px;color:#666;">
              Please check your internet connection and try again.
            </p>
          </div>
        \`;
      });
    `);
  });
}

app.whenReady().then(() => {
  // Force Light Theme
  nativeTheme.themeSource = "light";

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});