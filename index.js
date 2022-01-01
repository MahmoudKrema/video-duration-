const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;

// var FfmpegCommand = require('fluent-ffmpeg');
let mainWindow;


app.on('ready', () => {
    console.log(`${__dirname}\\index.html`);
    // const mainWindow = new BrowserWindow({ });
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });
    mainWindow.loadURL(`file://${__dirname}\\index.html`); 
    // ffmpeg.ffprobe("D:\Hals\Videos\3afroto.mp4 ", (err,metadata) =>{
    //     console.log(metadata);
    // });
});

ipcMain.on('Video:Submit', (event, theVideoPath) => {
    ffmpeg.ffprobe(theVideoPath, (err,metadata) => {
        console.log(metadata.format.duration);
        mainWindow.webContents.send('Duration:Sent', metadata.format.duration);
    });
});

