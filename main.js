const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'html\\preload.js'),
        },
    });

    mainWindow.loadURL(path.join(__dirname, 'html\\index.html')); // Load the index.html of the app.
    mainWindow.webContents.openDevTools(); // Open the DevTools.
    mainWindow.setMenu(null); // Remove default menu.
};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
