import {
  app,
  BrowserWindow,
  Menu,
  nativeTheme,
  shell,
} from "electron";

import path from "path";
import fs from "fs";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let localServer;
let localPort;

// Offline page HTML
const OFFLINE_HTML = '<div style="display:flex;align-items:center;justify-content:center;flex-direction:column;height:100vh;font-family:Arial;background:#ffffff;text-align:center;"><h1 style="color:#ed7f23;margin-bottom:20px;">No Internet Connection</h1><p style="color:#666;font-size:18px;">Please check your internet connection and try again.</p></div>';

// ==========================================
// LOCAL HTTP SERVER
// Serves dist files reliably from ASAR + handles Google auth callback
// ==========================================
function startLocalServer() {
  return new Promise((resolve, reject) => {
    const distPath = path.join(__dirname, "..", "dist");

    localServer = http.createServer((req, res) => {
      const url = new URL(req.url, "http://localhost");

      // ---- Google Auth Callback ----
      if (url.pathname === "/auth-callback") {
        const token = url.searchParams.get("token");
        const isNew = url.searchParams.get("new");

        if (token && mainWindow && !mainWindow.isDestroyed()) {
          const nav = isNew === "true" ? "/?new=true" : "/";
          mainWindow.webContents.executeJavaScript(
            "localStorage.setItem('jwtoken','" + token + "');" +
            "window.location.href='" + nav + "';"
          );
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.focus();
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          '<!DOCTYPE html><html><head><title>Login Successful</title></head>' +
          '<body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f0f9ff;">' +
          '<div style="text-align:center;padding:3rem;background:white;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:400px;">' +
          '<h2 style="color:#1765a4;margin-bottom:0.5rem;">✅ Login Successful!</h2>' +
          '<p style="color:#666;margin-bottom:1.5rem;">You can close this tab and return to the app.</p>' +
          '</div></body></html>'
        );
        return;
      }

      // ---- Serve Static Files ----
      let pathname = decodeURIComponent(url.pathname);
      if (pathname === "/") pathname = "/index.html";

      let filePath = path.join(distPath, pathname);

      // SPA fallback: if file doesn't exist, serve index.html
      let isFile = false;
      try {
        const stat = fs.statSync(filePath);
        isFile = stat.isFile();
      } catch (e) {
        isFile = false;
      }

      if (!isFile) {
        filePath = path.join(distPath, "index.html");
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".html": "text/html; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".mjs": "application/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".webp": "image/webp",
        ".webmanifest": "application/manifest+json",
        ".map": "application/json",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
      };

      const contentType = mimeTypes[ext] || "application/octet-stream";

      try {
        // Read file synchronously to guarantee clean delivery from app.asar on Windows
        const content = fs.readFileSync(filePath);
        res.writeHead(200, {
          "Content-Type": contentType,
          "Content-Length": content.length,
          "Cache-Control": ext === ".html" ? "no-cache" : "max-age=31536000",
        });
        res.end(content);
      } catch (e) {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    localServer.listen(0, "127.0.0.1", () => {
      localPort = localServer.address().port;
      console.log("Local server on port", localPort);
      resolve(localPort);
    });

    localServer.on("error", reject);
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
      process.platform === "darwin" ? "hiddenInset" : "default",
    titleBarOverlay:
      process.platform === "win32"
        ? { color: "#ffffff", symbolColor: "#000000", height: 30 }
        : false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  // Load from local HTTP server (packaged) or Vite dev server
  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadURL("http://127.0.0.1:" + localPort);
  }

  // ---- Handle window.open links ----
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // External links → open in system browser
    if (
      url.includes("accounts.google.com") ||
      url.includes("googleusercontent.com") ||
      url.includes("login.microsoftonline.com") ||
      url.includes("github.com/login")
    ) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // External sites
    if (
      !url.includes("curiousteamlearning.com") &&
      !url.includes("127.0.0.1") &&
      !url.includes("localhost")
    ) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    // Internal
    mainWindow.loadURL(url);
    return { action: "deny" };
  });

  // ---- Handle navigation ----
  mainWindow.webContents.on("will-navigate", (event, url) => {
    // Allow internal (localhost / our domain)
    if (url.includes("127.0.0.1")) return;
    if (url.includes("localhost")) return;
    if (url.includes("curiousteamlearning.com")) return;

    // Google auth → open in SYSTEM BROWSER (shows all accounts!)
    if (url.includes("/auth/google")) {
      event.preventDefault();
      const separator = url.includes("?") ? "&" : "?";
      const authUrl = url + separator + "callbackPort=" + localPort;
      shell.openExternal(authUrl);
      return;
    }

    // Everything else → system browser
    event.preventDefault();
    shell.openExternal(url);
  });

  // ==========================================
  // MOUSE BACK / FORWARD BUTTONS (Hardware buttons)
  // ==========================================
  mainWindow.on("app-command", (event, command) => {
    if (command === "browser-backward") {
      if (mainWindow.webContents.canGoBack()) {
        mainWindow.webContents.goBack();
      }
      mainWindow.webContents.executeJavaScript("window.history.back()").catch(() => {});
    } else if (command === "browser-forward") {
      if (mainWindow.webContents.canGoForward()) {
        mainWindow.webContents.goForward();
      }
      mainWindow.webContents.executeJavaScript("window.history.forward()").catch(() => {});
    }
  });

  // ==========================================
  // KEYBOARD SHORTCUTS (invisible, no UI)
  // F5 / Ctrl+R = Reload
  // Alt+Left / Backspace = Back
  // ==========================================
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    const key = input.key.toUpperCase();

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
      mainWindow.webContents.executeJavaScript("window.history.back()").catch(() => {});
      return;
    }

    // Back: Backspace (only if not typing in input/textarea)
    if (key === "BACKSPACE" && !input.control && !input.alt && !input.meta) {
      mainWindow.webContents.executeJavaScript(
        "(function() {" +
        "  const tag = (document.activeElement && document.activeElement.tagName) ? document.activeElement.tagName.toUpperCase() : '';" +
        "  const isEditable = document.activeElement && (document.activeElement.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA');" +
        "  if (!isEditable) { window.history.back(); }" +
        "})()"
      ).catch(() => {});
    }
  });

  // Disable Right Click
  mainWindow.webContents.on("context-menu", (event) => {
    event.preventDefault();
  });

  // Offline Screen
  mainWindow.webContents.on("did-finish-load", () => {
    const script =
      "(function(){" +
      "function showOfflinePage(){" +
      "document.body.innerHTML=" + JSON.stringify(OFFLINE_HTML) + ";" +
      "}" +
      "if(!navigator.onLine){showOfflinePage();}" +
      "window.addEventListener('offline',showOfflinePage);" +
      "})();";
    mainWindow.webContents.executeJavaScript(script).catch(console.error);
  });
}

// ==========================================
// APP READY
// ==========================================
app.whenReady().then(async () => {
  nativeTheme.themeSource = "light";

  // Start local server for packaged app
  if (app.isPackaged) {
    await startLocalServer();
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (localServer) {
    localServer.close();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});