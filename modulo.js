"use strict";

const fs   = require('fs');
const path = require('path');

function Dato(modulo, callback) {
    const fichero = path.join('./node_modules/',modulo,'package.json');

    fs.readFile(fichero,(err,contenidofichero)=>{
        if (err){
            callback(err);
            return;
        }
        const yeison   = JSON.parse(contenidofichero);
        const homepage = yeison.homepage;
        const version  = yeison.version;
        const dato = {
                    datoModulo: modulo,
                  datoHomepage: homepage,
                   datoVersion: version
        };

        callback(null,dato);
    });

};

module.exports = Dato; 