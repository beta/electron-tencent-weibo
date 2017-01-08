const {app, BrowserWindow, ipcMain, shell, Tray} = require('electron')
const url = require('url')

let win
let tray = null

function createWindow () {
  win = new BrowserWindow({
    title: '腾讯微博',
    width: 400,
    height: 800,
    minWidth: 300,
    icon: `${__dirname}/icon.ico`
  })
  win.setMenu(null)

  win.on('page-title-updated', (event) => {
    event.preventDefault()
  })

  win.on('minimize', () => {
    win.hide()
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL(`file://${__dirname}/index.html`)

  tray = new Tray(`${__dirname}/icon.ico`)
  tray.on('click', (event) => {
    win.show()
  })

  ipcMain.on('main', (event, url) => {
    console.log(url)
    if (url.includes('qpic.cn')) {
      var imageWindow = new BrowserWindow({
        title: '查看图片',
        width: 800,
        height: 600,
        center: true
      })
      imageWindow.setMenu(null)

      imageWindow.on('page-title-updated', (event) => {
        event.preventDefault()
      })

      imageWindow.loadURL(url)
    } else {
      shell.openExternal(url)
    }
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
    createWindow
  }
})
