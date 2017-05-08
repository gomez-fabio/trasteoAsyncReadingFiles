"use strict";

const Dato  = require('./modulo');
const fs    = require('fs');
const async = require('async');

function Datos (callback){
    // lectura del contenido de la carpeta
    fs.readdir('./node_modules', (err, lista) => {
        if(err){
            callback(err);
            return;
        }
        //console.log(lista);
        async.concat(lista, iterarLista,(err,data) =>{
            if(err){
                callback(err);
                return;
            }
            callback(null,data);
        })

        function iterarLista(directorio, callbackIterarLista){
            // excluimos los directorios que comienzan por .
            if(directorio[0] === '.'){
                callbackIterarLista(null);
                return;
            }
            Dato(directorio, (err,dato) =>{
                if (err){
                    callbackIterarLista(err);
                    return;
                }
                callbackIterarLista(null, dato)
            });

        }
    })
}

Datos((err,dato) => {    
    if (err){
        console.error('Infernal error:', err);
        return;
    }
    
    console.log('La web del módulo', dato.datoModulo, 'es', dato.datoHomepage, 
    'y su versión es la', dato.datoVersion);
})