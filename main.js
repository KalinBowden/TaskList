/*
    Desc:   The main js for the Electron app.
    Dev:    Kalin Bowden.
    Date: 11.29.2017.
*/

// Constants for the instance of the Electron window
const electron = require('electron');
const url = require('url');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;

//
let mainMenu;
let addWindow;

//  Create the main GUI window for the app
app.on('ready', _=>{
    // Starting-up notification
    console.log('TaskList has started');

    // Create the window
    mainWindow = new BrowserWindow({ width:1000, height:650});

    //
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Destroy window
    mainWindow.on('closed', _=>{mainWindow = null; console.log('TaskList has closed');})
})

//
//mainWindow.on('closed', _=>{app.quit();});

// Garbage Collection
//addWindow.on('closed', _=>{addWindow = null;});


// Instanciate a new window
function createAddWindow()
{
    // Starting-up notification
    console.log('AddWindow has started');

    // Create the window
    addWindow = new BrowserWindow({ width:450, height:300});

    //
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //
    addWindow.loadURL(`file://${__dirname}/addWindow.html`);

    // Destroy window
    addWindow.on('closed', _=>{addWindow = null; console.log('AddWindow has closed');})
}

// catch item add
ipc.on('item:add', function(e, item)
{
    console.log(item);
    mainWindow.webContents.send('item:add', item)
    addWindow.close();
    
})


const template =
[
    {label: electron.app.getName(), submenu: 
        [
            {label: 'Add Item', click: _=>{createAddWindow()}},
            {label: 'Clear Items'},
            {type: 'separator'}, 
            {label: 'Quit', click: _=>{app.quit()},accelerator: 'Ctrl+Q'}
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


// Add developer tools when developing
if (process.env.NODE_ENV !== 'production')
{
    template.push({
        label: 'Developer Tools',
        submenu:
        [
            {label: 'Toggle DevTools', click(item, focusedWindow)
            {
                focusedWindow.toggleDevTools();
            }}
        ]
    })
}