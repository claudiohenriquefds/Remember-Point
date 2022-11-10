const { app, BrowserWindow } = require('electron')
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        center: true,
        alwaysOnTop: true,
        title: "Remember Point",
        autoHideMenuBar: true,
        // webPreferences: {
        //     devTools: false
        // }
    })

    win.loadFile('./src/screens/point/index.html')

    win.querySelector('.hit-point-button').addEventListener('click', () => {
        hitPoint()
    })
}

app.whenReady().then(() => {
    createWindow()
})

const hitPoint = async () => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);

    const window = new BrowserWindow();
    const url = "https://app2.pontomais.com.br/login";
    await window.loadURL(url);

    const page = await pie.getPage(browser, window);
    console.log(page.url());
    window.destroy();
};