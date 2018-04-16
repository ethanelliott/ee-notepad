const dev = false;
const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const {
	remote,
	ipcRenderer
} = electron;
const {
	dialog
} = remote;
const win = remote.getCurrentWindow();
class Notepad {
	constructor() {}
	init() {
		$("#close-button").click(() => {
			win.close();
		});
		$("#maximize-button").click(() => {
			if (!win.isMaximized()) {
				win.maximize();
			} else {
				win.unmaximize();
			}
		});
		$("#minimize-button").click(() => {
			win.minimize();
		});
	}
}
ipcRenderer.on('load-complete', (ev, q) => {
	if (dev) {
		win.webContents.openDevTools();
	}
	let n = new Notepad();
	n.init();
});