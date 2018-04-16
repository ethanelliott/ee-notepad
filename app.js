const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
let mainWindow;
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		frame: false,
		transparent: false,
		menu: false,
		show: false,
		backgroundColor: '#000000',
		webPreferences: {
			experimentalFeatures: true
		}
	});
	mainWindow.webContents.on('did-finish-load', () => {
		console.log("DONE");
		mainWindow.show();
		mainWindow.focus();
		mainWindow.webContents.send('load-complete');
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol: 'file:',
		slashes: true
	}));
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});