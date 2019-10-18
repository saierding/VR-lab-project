const { app, BrowserWindow } = require('electron')
const server = require('swen90014-2019-vr-bilby/app')

let win

function createWindow () {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })


    win.loadFile('index.html')


    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}


app.on('ready', createWindow)


app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})