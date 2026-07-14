import {
  app,
  BrowserWindow,
  Menu,
  nativeTheme,
  shell,
  ipcMain,
} from "electron";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// DEEP LINK PROTOCOL REGISTRATION
// ==========================================
const PROTOCOL = "cutelearn";

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(PROTOCOL);
}

// ==========================================
// SINGLE INSTANCE LOCK (Windows/Linux deep link)
// ==========================================
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

let mainWindow;

// ==========================================
// HANDLE DEEP LINK URL
// ==========================================
function handleDeepLink(url) {
  if (!url || !mainWindow) return;

  try {
    const parsed = new URL(url);

    // cutelearn://auth?token=xxx&new=true
    if (parsed.hostname === "auth" || parsed.pathname === "//auth") {
      const token = parsed.searchParams.get("token");
      const isNew = parsed.searchParams.get("new");

      if (token) {
        mainWindow.webContents.executeJavaScript(`
          localStorage.setItem('jwtoken', '${token}');
          ${isNew === "true" ? "window.location.href = '/?new=true';" : "window.location.href = '/';"}
        `);

        // Bring window to front
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    }
  } catch (err) {
    console.error("Deep link parse error:", err);
  }
}

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
      preload: path.join(__dirname, "preload.js"),
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

  // Disable Reload & DevTools keyboard shortcuts
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

  // ==========================================
  // INJECT: FLOATING NAV TOOLBAR + OFFLINE SCREEN
  // ==========================================
  mainWindow.webContents.on(
    "did-finish-load",
    () => {

      mainWindow.webContents.executeJavaScript(`

        // ========== OFFLINE SCREEN ==========
        function showOfflinePage(){

          document.body.innerHTML = \\\`
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
          \\\`;

        }

        if(!navigator.onLine){
          showOfflinePage();
        }

        window.addEventListener("offline",showOfflinePage);

        // ========== FLOATING NAV TOOLBAR ==========
        (function(){
          // Don't inject if already exists
          if(document.getElementById('cute-nav-toolbar')) return;

          const toolbar = document.createElement('div');
          toolbar.id = 'cute-nav-toolbar';

          toolbar.innerHTML = \\\`
            <button id="cute-nav-back" title="Go Back" aria-label="Go Back">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button id="cute-nav-reload" title="Reload" aria-label="Reload">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </button>
          \\\`;

          const style = document.createElement('style');
          style.textContent = \\\`
            #cute-nav-toolbar {
              position: fixed;
              top: 12px;
              left: 12px;
              z-index: 99999;
              display: flex;
              gap: 4px;
              padding: 4px;
              border-radius: 12px;
              background: rgba(255,255,255,0.75);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(0,0,0,0.08);
              box-shadow: 0 2px 12px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1);
              transition: opacity 0.3s ease, transform 0.3s ease;
              opacity: 0.55;
              transform: scale(0.96);
            }
            #cute-nav-toolbar:hover {
              opacity: 1;
              transform: scale(1);
              box-shadow: 0 4px 20px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.15);
            }
            #cute-nav-toolbar button {
              width: 32px;
              height: 32px;
              border: none;
              background: transparent;
              border-radius: 8px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333;
              transition: all 0.2s ease;
              padding: 0;
            }
            #cute-nav-toolbar button:hover {
              background: rgba(23, 101, 164, 0.1);
              color: #1765a4;
            }
            #cute-nav-toolbar button:active {
              transform: scale(0.88);
              background: rgba(23, 101, 164, 0.18);
            }
            /* Spinning reload animation */
            #cute-nav-toolbar button.reloading svg {
              animation: cute-spin 0.6s ease;
            }
            @keyframes cute-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          \\\`;

          document.head.appendChild(style);
          document.body.appendChild(toolbar);

          document.getElementById('cute-nav-back').addEventListener('click', () => {
            if(window.electronAPI) {
              window.electronAPI.goBack();
            } else {
              window.history.back();
            }
          });

          document.getElementById('cute-nav-reload').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            btn.classList.add('reloading');
            setTimeout(() => btn.classList.remove('reloading'), 700);
            if(window.electronAPI) {
              window.electronAPI.reload();
            } else {
              window.location.reload();
            }
          });

        })();

      `);

    }
  );
}

// ==========================================
// IPC HANDLERS
// ==========================================
ipcMain.on("nav-back", () => {
  if (mainWindow && mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
  }
});

ipcMain.on("nav-reload", () => {
  if (mainWindow) {
    mainWindow.webContents.reload();
  }
});

ipcMain.on("open-external", (_event, url) => {
  if (url) {
    shell.openExternal(url);
  }
});

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

  // macOS deep link handler
  app.on("open-url", (event, url) => {
    event.preventDefault();
    handleDeepLink(url);
  });

});

// Windows/Linux: deep link comes via second-instance
app.on("second-instance", (event, commandLine) => {
  // The deep link URL is the last argument
  const deepLinkUrl = commandLine.find((arg) =>
    arg.startsWith(`${PROTOCOL}://`)
  );

  if (deepLinkUrl) {
    handleDeepLink(deepLinkUrl);
  }

  // Focus existing window
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }

});