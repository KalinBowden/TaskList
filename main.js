/*
    Desc:   The main js for the Electron app.
    Dev:    Kalin Bowden.
    Date: 11.29.2017.
*/


const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


app.on('ready', _=>{
    console.log('electron is starting');

    mainWindow = new BrowserWindow();
})