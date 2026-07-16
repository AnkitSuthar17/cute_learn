import {
  app,
  BrowserWindow,
  Menu,
  nativeTheme,
  shell,
  protocol,
  net,
} from "electron";

import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// CUSTOM PROTOCOL FOR SPA ROUTING
// Must be called BEFORE app.ready
// Fixes: React Router 404 when loading from file://
// ==========================================
protocol.registerSchemesAsPrivileged([{
  scheme: "cuteapp",
  privileges: {
    standard: true,
    secure: true,
    supportFetchAPI: true,
    corsEnabled: true,
    stream: true,
  },
}]);

let mainWindow;

// Offline page HTML
const OFFLINE_HTML = '<div style="display:flex;align-items:center;justify-content:center;flex-direction:column;height:100vh;font-family:Arial;background:#ffffff;text-align:center;"><h1 style="color:#ed7f23;margin-bottom:20px;">No Internet Connection</h1><p style="color:#666;font-size:18px;">Please check your internet connection and try again.</p></div>';

// ==========================================
// GOOGLE AUTH POPUP (shows inside app)
// ==========================================
function openGoogleAuthPopup(authUrl) {
  const popup = new BrowserWindow({
    width: 500,
    height: 700,
    parent: mainWindow,
    modal: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    title: "Sign in with Google",
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  popup.setMenuBarVisibility(false);
  popup.loadURL(authUrl);

  // Check if URL contains our auth token (from server redirect)
  function tryExtractToken(url) {
    try {
      if (!url || !url.includes("token=")) return false;
      // Only match our frontend URL with token
      if (!url.includes("curiousteamlearning.com") && !url.includes("localhost")) return false;

      const parsed = new URL(url);
      const token = parsed.searchParams.get("token");
      if (!token) return false;

      const isNew = parsed.searchParams.get("new");
      const nav = isNew === "true" ? "/?new=true" : "/";

      // Inject token into main window and navigate
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

  // Catch token in redirect (renderer-initiated navigation)
  popup.webContents.on("will-navigate", (event, url) => {
    if (url.includes("token=")) {
      event.preventDefault();
      tryExtractToken(url);
    }
  });

  // Catch token after navigation completes (HTTP redirects)
  popup.webContents.on("did-navigate", (_event, url) => {
    tryExtractToken(url);
  });

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

  // Hide menu bar but don't null it (null removes keyboard shortcuts)
  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // Use custom protocol so React Router SPA routing works
    mainWindow.loadURL("cuteapp://./index.html");
  }

  // Handle window.open links
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
    if (url.includes("login.microsoftonline.com")) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // GitHub Login
    if (url.includes("github.com/login")) {
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
    return { action: "deny" };
  });

  // Handle navigation — intercept Google auth, open in popup
  mainWindow.webContents.on("will-navigate", (event, url) => {

    // Allow internal navigation
    if (url.includes("curiousteamlearning.com")) return;
    if (url.includes("localhost")) return;
    if (url.startsWith("cuteapp://")) return;

    // Google auth — open in popup window
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
  // KEYBOARD SHORTCUTS (invisible, no UI)
  // F5 / Ctrl+R = Reload
  // Alt+Left = Back
  // F12 / Ctrl+Shift+I = Blocked (DevTools)
  // ==========================================
  mainWindow.webContents.on(
    "before-input-event",
    (event, input) => {

      const key = input.key.toUpperCase();

      // Block DevTools
      if (
        key === "F12" ||
        (input.control && input.shift && key === "I") ||
        (input.meta && input.alt && key === "I")
      ) {
        event.preventDefault();
        return;
      }

      // Reload: F5 or Ctrl+R / Cmd+R
      if (
        key === "F5" ||
        (input.control && key === "R") ||
        (input.meta && key === "R")
      ) {
        mainWindow.webContents.reload();
        return;
      }

      // Back: Alt + Left Arrow
      if (input.alt && key === "ARROWLEFT") {
        if (mainWindow.webContents.canGoBack()) {
          mainWindow.webContents.goBack();
        }
        return;
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

  // ==========================================
  // REGISTER PROTOCOL HANDLER (SPA fallback)
  // Any unknown route → serves index.html
  // ==========================================
  protocol.handle("cuteapp", (request) => {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    // Default to index.html
    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }

    const distPath = path.join(__dirname, "..", "dist");
    const filePath = path.join(distPath, pathname);

    // Security: ensure path is within dist
    const normalizedFilePath = path.resolve(filePath);
    const normalizedDistPath = path.resolve(distPath);
    if (!normalizedFilePath.startsWith(normalizedDistPath)) {
      return new Response("Forbidden", { status: 403 });
    }

    // If file exists, serve it directly
    try {
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return net.fetch(pathToFileURL(filePath).toString());
      }
    } catch (e) {
      // Fall through to index.html
    }

    // SPA fallback: serve index.html for any unmatched route
    // This is what makes React Router work in the packaged app
    return net.fetch(pathToFileURL(path.join(distPath, "index.html")).toString());
  });

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