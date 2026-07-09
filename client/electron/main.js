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
      process.platform === "darwin"
        ? "hiddenInset"
        : "default",

    titleBarOverlay:
      process.platform === "win32"
        ? {
            color: "#ffffff",
            symbolColor: "#000000",
            height: 30,
          }
        : false,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(
      path.join(__dirname, "../dist/index.html")
    );
  }

  // Handle links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {

    // Google Login
    if (
      url.includes("accounts.google.com") ||
      url.includes("googleusercontent.com")
    ) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // Microsoft Login
    if (
      url.includes("login.microsoftonline.com")
    ) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // GitHub Login
    if (
      url.includes("github.com/login")
    ) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // Any external website
    if (!url.includes("curiousteamlearning.com")) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // Internal website pages
    mainWindow.loadURL(url);

    return {
      action: "deny",
    };
  });

  // Prevent navigation outside app
  mainWindow.webContents.on("will-navigate", (event, url) => {

    if (url.includes("curiousteamlearning.com")) {
      return;
    }

    event.preventDefault();
    shell.openExternal(url);

  });

  // Disable Reload & DevTools
  mainWindow.webContents.on(
    "before-input-event",
    (event, input) => {

      const key = input.key.toUpperCase();

      if (
        key === "F5" ||
        (input.control && key === "R") ||
        (input.meta && key === "R")
      ) {
        event.preventDefault();
      }

      if (
        key === "F12" ||
        (input.control &&
          input.shift &&
          key === "I") ||
        (input.meta &&
          input.alt &&
          key === "I")
      ) {
        event.preventDefault();
      }
    }
  );

  // Disable Right Click
  mainWindow.webContents.on(
    "context-menu",
    (event) => {
      event.preventDefault();
    }
  );

  // Offline Screen
  mainWindow.webContents.on(
    "did-finish-load",
    () => {

      mainWindow.webContents.executeJavaScript(`

        function showOfflinePage(){

          document.body.innerHTML = \`
            <div style="
              display:flex;
              align-items:center;
              justify-content:center;
              flex-direction:column;
              height:100vh;
              font-family:Arial;
              background:#ffffff;
              text-align:center;
            ">

              <h1 style="
                color:#ed7f23;
                margin-bottom:20px;
              ">
                No Internet Connection
              </h1>

              <p style="
                color:#666;
                font-size:18px;
              ">
                Please check your internet connection and try again.
              </p>

            </div>
          \`;

        }

        if(!navigator.onLine){
          showOfflinePage();
        }

        window.addEventListener("offline",showOfflinePage);

      `);

    }
  );
}

app.whenReady().then(() => {

  nativeTheme.themeSource = "light";

  createWindow();

  app.on("activate", () => {

    if (
      BrowserWindow.getAllWindows().length === 0
    ) {
      createWindow();
    }

  });

});

app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }

});