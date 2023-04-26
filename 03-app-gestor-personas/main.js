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
    })
}

function abrirVentanaAcercaDe(){

}

app.whenReady().then(crearVentanaPrincipal);