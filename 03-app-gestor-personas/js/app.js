const baseDatos = require('./js/database');
const alert = require('./js/toast.js')

class GestorPersonas{
    
    constructor(){
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');
        this.registros = document.getElementById('registros');
        this.nombres = document.getElementById('nombres')
        this.id = document.getElementById('id')
        this.apellidos = document.getElementById('apellidos')
        this.correo = document.getElementById('correo')
        this.btnCrearRegistro = document.getElementById('btnCrearRegistro')

        this.cargarRegistrosPersona();

        this.agregarEventListeners();
    }

    agregarEventListeners(){
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroPersona.bind(this));
        
    }


    crearRegistroPersona(evento){
        evento.preventDefault();

        if(this.id.value == ''){
            baseDatos.agregarPersona(this.nombres.value, this.apellidos.value, this.correo.value);
            alert.alert('Guardado', 'Registro insertado correctamente.');
        }else{
            baseDatos.actualizarPersona(this.id.value, this.nombres.value, this.apellidos.value, this.correo.value)
            alert.alert('Actualizado', 'Registro actualizado correctamente.');
        }
        
        
        
        this.nombres.value = '';
        this.apellidos.value = '';
        this.correo.value = '';
        this.btnCrearRegistro.innerHTML = 'Crear'
        this.cargarRegistrosPersona();
    }

    generarHtmlRegistroPersona(persona){
        return `<tr>
            <td>${persona.nombres}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.correo}</td>
            <td>
              <button type="button" class="btn btn-danger btn-sm" onclick="{gestorPersonas.eliminarRegistroPersona('${persona._id}')}" value="Eliminar">
                <i class="fas fa-trash"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="{gestorPersonas.verRegistroPersona('${persona._id}','${persona.nombres}','${persona.apellidos}','${persona.correo}')}" value="Leer">
                <i class="fas fa-book"></i>
              </button>
        </tr>`
    }

    cargarRegistrosPersona(){
        baseDatos.obtenerPersonas((personas) => {
            let html = personas.map(this.generarHtmlRegistroPersona).join('');

            this.registros.innerHTML = html;
        });
    }

    eliminarRegistroPersona(id){
        baseDatos.eliminarPersona(id);

        this.cargarRegistrosPersona();
        alert.alert('Eliminado!', 'Registro eliminado correctamente.');
    }

    verRegistroPersona(id,nombres, apellidos, correo){
        this.btnCrearRegistro.innerHTML = 'Actualizar'
        this.id.value = id;
        this.nombres.value = nombres;
        this.apellidos.value = apellidos;
        this.correo.value = correo; 
    }


}

let gestorPersonas = new GestorPersonas();