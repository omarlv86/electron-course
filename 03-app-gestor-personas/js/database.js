var Datastore = require('nedb');

let bd = new Datastore({
    filename: 'db/personas.db', 
    autoload: true
})

exports.agregarPersona = function(nombres, apellidos, correo){
    var persona = {
        nombres,
        apellidos,
        correo
    }
    bd.insert(persona, function(err, nuevoObjeto){

    });
}

exports.actualizarPersona = function(id, nombres, apellidos, correo){
    var persona = {
        nombres,
        apellidos,
        correo
    }
    bd.update({_id: id}, persona, function(err, numReplaced){
        
    })
}

exports.obtenerPersonas = function(operacion){
    bd.find({}, function(err, personas){
        if(personas){
            operacion(personas);
        }
    });
}

exports.eliminarPersona = function(id){
    bd.remove({_id : id}, -{}, function(err, numeroRegistrosEliminados){

    });
}