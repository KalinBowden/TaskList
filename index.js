/*
    Desc:   The logic js for the Electron app.
    Dev:    Kalin Bowden.
    Date: 11.29.2017.
*/

//
const electron = require('electron');
const ipc = electron.ipcRenderer;
console.log('index.js has loaded succsefuly');

document.getElementById('start').addEventListener('click', _=> {
    ipc.send('countdown-start');
});

ipc.on('countdown', (evt, count) =>
{
    document.getElementById('count').innerHTML = count;
})