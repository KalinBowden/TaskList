/*
    Desc:   The main js for the Electron app.
    Dev:    Kalin Bowden.
    Date: 11.29.2017.
*/

// Constants for the instance of the Electron window
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;

//  Create the main GUI window for the app
app.on('ready', _=>{
    // Starting-up notification
    console.log('TaskList has started');

    // Create the window
    mainWindow = new BrowserWindow({ width:300, height:200});

    //
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Destroy window
    mainWindow.on('closed', _=>{mainWindow = null; console.log('TaskList has closed');})
})

const template =
[
    {label: electron.app.getName(), submenu: 
        [
            {label: 'About'},
            {type: 'separator'}, 
            {label: 'Quit', click: _=>{app.quit()},accelerator: 'Crlt+Q'}
        ]},
        {
            label: 'Dev Tools',
            click: function(item, focusedWindow){focusedWindow.toggleDevTools()},
            accelerator: 'ctrl+i'
        }
]

ipc.on('countdown-start', (evt, arg) => 
{
    let count = 3;
    let timer = setInterval(() =>
    {
        console.log('Count: ' + count);
        mainWindow.webContents.send('countdown', count)
        if(count === 0)
        {
            clearInterval(timer);
        }
        count--;
    }, 1000);
})