const { app, Tray, Menu, BrowserWindow } = require('electron');
const puppeteer = require('puppeteer-core');

const startApplication = () => {
	const win = new BrowserWindow({
		width: 400,
		height: 400,
		center: true,
		alwaysOnTop: true,
		title: 'Remember Point',
		autoHideMenuBar: true,
		icon: './assets/logo.png',
		// webPreferences: {
		//     devTools: false,
		// }
	});

	win.loadFile('./src/screens/point/index.html');

	win.on('close', function (event) {
		if (!app.isQuiting) {
			event.preventDefault();
			win.hide();
		}

		return false;
	});

	let tray = new Tray('./assets/logo.png');

	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Configurações', type: 'normal', click: () => win.show() },
		{ label: 'Bater ponto', type: 'normal', click: () => hitPoint() },
		{
			label: 'Sair',
			type: 'normal',
			click: () => {
				app.isQuiting = true;
				app.quit();
			},
		},
	]);

	tray.setContextMenu(contextMenu);
	tray.setToolTip('Remember Point');
	tray.setTitle('Remember Point');
};

const hitPoint = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome',
	});
	const page = await browser.newPage();

	await page.goto('https://app2.pontomais.com.br/login');
	page.click('.pm-button .pm-primary');

	// await browser.close();
};

app.whenReady().then(() => {
	startApplication();
});
