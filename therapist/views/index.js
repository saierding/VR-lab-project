/*
This JS file is the configuration file of electron, which control the height and width of the application and how to open the application
*/
const { app, BrowserWindow } = require('electron')

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