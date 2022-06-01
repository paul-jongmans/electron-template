const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const updateInstaller = require('./update_installer');
const path = require('path');

const createMainWindow = () => {
    // Create the browser window.
    const window = new BrowserWindow({
        title: 'Electron Template',
        frame: false,
        width: 1280,
        height: 710,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
        backgroundColor: '#0c0d10',
        webPreferences: {
            preload: path.join(__dirname, '..', 'html', 'preload.js'),
        },
    });

    window.webContents.openDevTools({ mode: 'detach' });
    window.loadURL(path.join(__dirname, '..', 'html', 'index.html'));

    window.on('closed', () => {
        mainWindow = null;
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    ipcMain.on('user-input', (event, args) => {
        switch (args) {
            case 'minimize':
                window.minimize();
                break;
            case 'close':
                dialog
                    .showMessageBox(window, {
                        type: 'question',
                        title: 'Are you sure?',
                        message: 'Are you sure you want to quit the program?',
                        noLink: true,
                        cancelId: 1,
                        buttons: ['Quit', 'Cancel'],
                    })
                    .then((confirmation) => {
                        switch (confirmation.response) {
                            case 0:
                                app.quit();
                                break;
                        }
                    });
                break;
            default:
                throw new Error('Unknown user input');
        }
    });
};

// quit application when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return; // on macOS it is common for applications to stay open until the user explicitly quits
    app.quit();
});

// on macOS it is common to re-create a window even after all windows have been closed
app.on('activate', () => {
    if (mainWindow !== null) return;
    mainWindow = createMainWindow();
});

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
    mainWindow = createMainWindow();
    updateInstaller();
});
