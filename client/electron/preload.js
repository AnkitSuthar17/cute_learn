import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // Navigation
  goBack: () => ipcRenderer.send("nav-back"),
  reload: () => ipcRenderer.send("nav-reload"),

  // Google Auth - open URL in system browser
  openExternal: (url) => ipcRenderer.send("open-external", url),

  // Receive auth token from deep link
  onAuthToken: (callback) =>
    ipcRenderer.on("auth-token", (_event, data) => callback(data)),

  // Flag to detect Electron
  isElectron: true,
});
