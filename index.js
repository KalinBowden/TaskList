/*
    Desc:   The logic js for the Electron app.
    Dev:    Kalin Bowden.
    Date: 11.29.2017.
*/

//
const electron = require('electron');
var app = require('electron').remote;
var dialog = app.dialog;
var fs =  require('fs');
const ipc = electron.ipcRenderer;
console.log('index.js has loaded succsefuly');



/*document.getElementById('start').addEventListener('click', _=> {
    ipc.send('countdown-start');
});*/

ipc.on('countdown', (evt, count) =>
{
    document.getElementById('count').innerHTML = count;
})

/*document.getElementById('btn1').addEventListener('click', saveFile);*/

function saveFile()
{
    dialog.showSaveDialog((filename) => {});
}

//----------------------------------------------------------------------
document.getElementById('add').addEventListener('click', _=>{
    ipc.send('addTask');
});


document.getElementById('clear').addEventListener('click', _=>{
    ipc.send('item:clear');
});

document.getElementById('close').addEventListener('click', _=>{
    ipc.send('app:close');
})