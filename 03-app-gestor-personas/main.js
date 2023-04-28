const { app, BrowserWindow, Menu } = require('electron');

let ventanaPrincipal;

let menuAplicacionPlantilla = [
    {
        label:'Aplicacion',
        submenu:[
            {
              label:'Acerca de',
              click: () => {
                abrirVentanaAcercaDe()
              }
            },
            {
                label: "Toggle Dev Tools",
                accelerator: "F12",
                click: () => {
                  ventanaPrincipal.webContents.toggleDevTools();
                }
              }
        ]
    }
]

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    });

    ventanaPrincipal.loadFile('index.html')

    let menu = Menu.buildFromTemplate(menuAplicacionPlantilla);
    ventanaPrincipal.setMenu(menu)

    ventanaPrincipal.on('closed', () => {
        ventanaPrincipal = null
    });
}

function abrirVentanaAcercaDe(){
    let ventanaAcercaDe = new BrowserWindow({
      parent: ventanaPrincipal,
      modal:true,
      show:false,
      width:400,
      height:250
    });

    ventanaAcercaDe.loadFile('acerca-de.html')
    ventanaAcercaDe.setMenu(null);
    ventanaAcercaDe.once('ready-to-show', () => {
        ventanaAcercaDe.show();
    })
    
}

app.whenReady().then(crearVentanaPrincipal);