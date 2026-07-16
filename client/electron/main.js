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

// Offline page HTML
const OFFLINE_HTML = '<div style="display:flex;align-items:center;justify-content:center;flex-direction:column;height:100vh;font-family:Arial;background:#ffffff;text-align:center;"><h1 style="color:#ed7f23;margin-bottom:20px;">No Internet Connection</h1><p style="color:#666;font-size:18px;">Please check your internet connection and try again.</p></div>';

// ==========================================
// GOOGLE AUTH POPUP
// ==========================================
function openGoogleAuthPopup(authUrl) {
  const popup = new BrowserWindow({
    width: 500,
    height: 700,
    parent: mainWindow,
    modal: true,
    title: "Sign in with Google",
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      partition: "persist:google-auth",
    },
  });

  popup.setMenuBarVisibility(false);
  popup.loadURL(authUrl);

  // Check if URL contains our auth token
  function tryExtractToken(url) {
    try {
      if (!url || !url.includes("token=")) return false;

      const parsed = new URL(url);
      const token = parsed.searchParams.get("token");
      if (!token) return false;

      const isNew = parsed.searchParams.get("new");

      // Inject token into main window
      const nav = isNew === "true" ? "/?new=true" : "/";
      mainWindow.webContents.executeJavaScript(
        "localStorage.setItem('jwtoken','" + token + "');" +
        "window.location.href='" + nav + "';"
      );

      if (!popup.isDestroyed()) popup.close();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Catch the redirect back from server with token
  popup.webContents.on("will-navigate", (event, url) => {
    if (url.includes("token=")) {
      event.preventDefault();
      tryExtractToken(url);
    }
  });

  popup.webContents.on("did-navigate", (_event, url) => {
    tryExtractToken(url);
  });

  // Also handle close without login
  popup.on("closed", () => {
    // User closed popup without completing login — do nothing
  });
}

// ==========================================
// CREATE WINDOW
// ==========================================
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

  // Handle links (window.open)
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

  // Handle navigation — intercept Google auth, open in popup
  mainWindow.webContents.on("will-navigate", (event, url) => {

    // Allow internal navigation
    if (url.includes("curiousteamlearning.com")) {
      return;
    }

    // Allow localhost navigation (dev mode)
    if (url.includes("localhost")) {
      return;
    }

    // Google auth — open in popup window instead of navigating away
    if (url.includes("/auth/google")) {
      event.preventDefault();
      openGoogleAuthPopup(url);
      return;
    }

    // Everything else — open in external browser
    event.preventDefault();
    shell.openExternal(url);

  });

  // ==========================================
  // KEYBOARD SHORTCUTS
  // Back = Alt+Left, Reload = F5 / Ctrl+R (invisible, no UI)
  // Only block: DevTools (F12 / Ctrl+Shift+I)
  // ==========================================
  mainWindow.webContents.on(
    "before-input-event",
    (event, input) => {

      const key = input.key.toUpperCase();

      // Block DevTools
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

      // Back navigation: Alt + Left Arrow
      if (input.alt && key === "ARROWLEFT") {
        if (mainWindow.webContents.canGoBack()) {
          mainWindow.webContents.goBack();
        }
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

      const script =
        "(function(){" +
        "function showOfflinePage(){" +
        "document.body.innerHTML=" + JSON.stringify(OFFLINE_HTML) + ";" +
        "}" +
        "if(!navigator.onLine){showOfflinePage();}" +
        "window.addEventListener('offline',showOfflinePage);" +
        "})();";

      mainWindow.webContents.executeJavaScript(script).catch(function(err) {
        console.error("Offline screen injection error:", err);
      });

    }
  );
}

// ==========================================
// APP READY
// ==========================================
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