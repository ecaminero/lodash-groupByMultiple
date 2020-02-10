var _ = require('lodash');
var prettyjson = require('prettyjson');

// En una tienda en línea, se requiren mostrar los resultados de una búsqueda de productos,
// de tal forma que cada producto se despliegue minimizando su "nombre".
// Normalmente, el nombre de un producto es la concatenación de sus atributos,
// pero para productos similares esto resulta redundante.

// Por ejemplo: 
//   Nombre Zapatilla - Color Amarillo - Talla 38 - Marca Merrel
//   Nombre Zapatilla - Color Café - Talla 34 - Marca Merrel

// La tarea consiste en encontrar la lista de atributos que distinguen a los productos
// luego construir el "nombre" más corto.

// Para el ejemplo anterior:

// Zapatilla Merrel
//   Color Amarillo - Talla 38
//   Color Café - Talla 34

// Para realizar el ejercicio, puedes utilizar 
// al menos dos funciones de la librería lodash.js
// https://lodash.com/docs
//`Color ${object.color} - Talla ${object.size}`
var products = [
  {
    "sku": "ZAP002",
    "name": "Zapatilla",
    "brand": "Merrel",
    "color": "Café",
    "size": "34"
  },
  {
    "sku": "ZAP002",
    "name": "Zapatilla",
    "brand": "Merrel",
    "color": "Café",
    "size": "38"
  },
  {
    "sku": "ZAP003",
    "name": "Zapatilla",
    "brand": "Merrel",
    "color": "Azul",
    "size": "34"
  },
  {
    "sku": "ZAP004",
    "name": "Zapatilla",
    "brand": "Merrel",
    "color": "Azul",
    "size": "34"
  },
    {
    "sku": "ZAP0011",
    "name": "Zapatilla",
    "brand": "Merrel",
    "color": "Azul",
    "size": "34"
  },
  {
    "sku": "ZAP005",
    "name": "Zapatilla",
    "brand": "Abacco",
    "color": "Amarillo",
    "size": "31"
  },
  {
    "sku": "ZAP006",
    "name": "Zapatilla",
    "brand": "Merrel",
    "color": "Amarillo",
    "size": "31"
  },
  {
    "sku": "ZAP001",
    "name": "Sandalia",
    "brand": "Merrel",
    "color": "Amarillo",
    "size": "31"
  }
];

_.groupByMultiple = function (object, values, context) {
    if (!values.length){
      var myList = []
      _.forEach(object, function(v) { //1 uso
           myList.push(`Color ${v.color} - Talla ${v.size}`);
        });
      return myList;
    }
    var elements = _.groupBy(object, values[0], context), rest = values.slice(1); //2 uso
    for (var prop in elements) {
        elements[prop] = _.groupByMultiple(elements[prop], rest, context);
    }
    return elements;
};

var groups = _.groupByMultiple(products, ['name', 'brand']);
console.log(prettyjson.render(groups, { noColor: true }));
