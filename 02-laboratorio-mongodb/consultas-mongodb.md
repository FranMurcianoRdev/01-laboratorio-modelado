# Laboratorio MongoDB

Vamos a trabajar con el set de datos de Mongo Atlas _airbnb_. Lo puedes encontrar en este enlace: https://drive.google.com/drive/folders/1gAtZZdrBKiKioJSZwnShXskaKk6H_gCJ?usp=sharing

Para restaurarlo puede seguir las instrucciones de este videopost:
https://www.lemoncode.tv/curso/docker-y-mongodb/leccion/restaurando-backup-mongodb

> Acuerdate de mirar si en el directorio `/opt/app` del contenedor Mongo hay contenido de backups previos que haya que borrar

Para entregar las soluciones, añade un README.md a tu repositorio del bootcamp incluyendo enunciado y consulta (lo que pone '_Pega aquí tu consulta_').

## Introducción

En este base de datos puedes encontrar un montón de alojamientos y sus reviews, esto está sacado de hacer webscrapping.

**Pregunta**. Si montaras un sitio real, ¿Qué posibles problemas pontenciales les ves a como está almacenada la información?

```md
Indica aquí que problemas ves
```

## Obligatorio

Esta es la parte mínima que tendrás que entregar para superar este laboratorio.

### Consultas

- Saca en una consulta cuantos alojamientos hay en España.

```js
use('airbnb')
db.listingsAndReviews.countDocuments({ "address.country": "Spain" }) //Cuenta los documentos donde 'address country' = España
```

- Lista los 10 primeros:
  - Ordenados por precio de forma ascendente.
  - Sólo muestra: nombre, precio, camas y la localidad (`address.market`).

```js
use('airbnb')
db.listingsAndReviews.find(
    { "address.country": "Spain" },  // Filtro para España
    { 
    name: 1,                // Solo los campos que queremos mostrar
    price: 1,
    beds: 1,
    "address.market": 1,
    _id: 0                  // Excluye el campo _id
    }
)
.sort({ price: 1 })          // Ordenar por precio en orden ascendente
.limit(10)                   // Limitar el resultado a 10
```

### Filtrando

- Queremos viajar cómodos, somos 4 personas y queremos:
  - 4 camas.
  - Dos cuartos de baño o más.
  - Sólo muestra: nombre, precio, camas y baños.

```js
use('airbnb')
db.listingsAndReviews.find(
    { 
    beds: { $gte: 4 },            // Al menos 4 camas
    bathrooms: { $gte: 2 }        // Al menos 2 baños
  },
  { 
  name:1,              
  price: 1,
  beds: 1,
  bathrooms: 1,
  _id:0                    
  }
)
```

- Aunque estamos de viaje no queremos estar desconectados, así que necesitamos que el alojamiento también tenga conexión wifi. A los requisitos anteriores, hay que añadir que el alojamiento tenga wifi.
  - Sólo muestra: nombre, precio, camas, baños y servicios (`amenities`).

```js
use('airbnb')
db.listingsAndReviews.find(
  { 
    beds: { $gte: 4 },    
    bathrooms: { $gte: 2 },     
    amenities: { $in: ["Wifi"] }   // Debe incluir "Wifi" en los amenities
  },
  { 
    name: 1,                     
    price: 1,
    beds: 1,
    bathrooms: 1,
    amenities: 1,
    _id: 0                    
  }
)
```

- Y bueno, un amigo trae a su perro, así que tenemos que buscar alojamientos que permitan mascota (_Pets allowed_).
  - Sólo muestra: nombre, precio, camas, baños y servicios (`amenities`).

```js
use('airbnb')
db.listingsAndReviews.find(
    { 
      beds: { $gte: 4 },  
      bathrooms: { $gte: 2 },  
      amenities: { $all: ["Wifi", "Pets allowed"] }   // Debe incluir tanto "Wifi" como "Pets allowed" en amenities
    },
    { 
      name: 1,                 
      price: 1,
      beds: 1,
      bathrooms: 1,
      amenities: 1,
      _id: 0                    
    }
  )
```

- Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen. Pero queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews (campo `review_scores.review_scores_rating` igual o superior a 88).
  - Sólo muestra: nombre, precio, camas, baños, rating y localidad.

```js
use('airbnb')
db.listingsAndReviews.find(
  { 
    $and: [
      { price: { $lte: 50 } },  // Precio igual o menor a 50
      { "review_scores.review_scores_rating": { $gte: 88 } },  // Rating igual o superior a 88
      { $or: [
          { "address.market": "Barcelona" },  // Localidad Barcelona
          { "address.country": "Portugal" }  // País Portugal
        ] 
      }
    ]
  },
  { 
    name: 1,                      
    price: 1,
    beds: 1,
    bathrooms: 1,
    "review_scores.review_scores_rating": 1,  // Rating de reviews
    "address.market": 1,           // Localidad
    _id: 0                       
  }
)

```

- También queremos que el huésped sea un superhost (`host.host_is_superhost`) y que no tengamos que pagar depósito de seguridad (`security_deposit`).
  - Sólo muestra: nombre, precio, camas, baños, rating, si el huésped es superhost, depósito de seguridad y localidad.

```js
/
use('airbnb')
db.listingsAndReviews.find(
  { 
    $and: [
      { price: { $lte: 50 } },  // Precio igual o menor a 50
      { "review_scores.review_scores_rating": { $gte: 88 } },  // Rating igual o superior a 88
      { "host.host_is_superhost": true },  // El huésped es superhost
      { $or: [ //o el deposito de seguridad es 0 o no tiene
          { "security_deposit": { $exists: false } },  
          { "security_deposit": { $eq: 0 } }  
        ]
      },
      { $or: [
          { "address.market": "Barcelona" },  // Localidad Barcelona
          { "address.country": "Portugal" }  // País Portugal
        ]
      }
    ]
  },
  { 
    name: 1,                     
    price: 1,
    beds: 1,
    bathrooms: 1,
    "review_scores.review_scores_rating": 1,  // Rating de reviews
    "host.host_is_superhost": 1,               // Es superhost
    security_deposit: 1,                       // Depósito de seguridad
    "address.market": 1,                       // Localidad
    _id: 0                      
  }
)
```

### Agregaciones

- Queremos mostrar los alojamientos que hay en España, con los siguientes campos:
  - Nombre.
  - Localidad (no queremos mostrar un objeto, sólo el string con la localidad).
  - Precio

```js

use('airbnb')
db.listingsAndReviews.aggregate([
  {
    $match: { "address.country": "Spain" }  // Filtrar alojamientos en España
  },
  {
    $project: { //para seleccionar los campos que nos interesan:
      name: 1,                   
      locality: "$address.market",         // Extraer el campo de localidad (address.market)
      price: 1,                    
      _id: 0                     
    }
  }
])
```

- Queremos saber cuantos alojamientos hay disponibles por pais.

```js
use('airbnb')
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",         // Agrupa por país
      totalListings: { $sum: 1 }       // Cuenta el número de alojamientos por país
    }
  },
  {
    $project: {
      country: "$_id",                 // Renombra _id a country
      totalListings: 1,                // Muestra el total de alojamientos
      _id: 0                   
    }
  }
])
```

## Opcional

- Queremos saber el precio medio de alquiler de airbnb en España.

```js
use('airbnb')
db.listingsAndReviews.aggregate([
  {
    $match: { "address.country": "Spain" }  // Filtra los alojamientos en España
  },
  {
    $group: {
      _id: null,                            // No agrupamos por ningún campo específico
      averagePrice: { $avg: "$price" }      // Calcula el precio medio de los alojamientos
    }
  },
  {
    $project: {
      _id: 0,         
      averagePrice: 1                       // Muestra el campo de precio medio
    }
  }
])
```

- ¿Y si quisieramos hacer como el anterior, pero sacarlo por paises?

```js
use('airbnb')
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",         // Agrupa por país
      averagePrice: { $avg: "$price" } // Calcula el precio medio por país
    }
  },
  {
    $project: {
      country: "$_id",                 // Renombra _id a country
      averagePrice: 1,                 // Muestra el precio medio
      _id: 0   
    }
  }
])
```

- Repite los mismos pasos pero agrupando también por numero de habitaciones.

```js
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: { 
        country: "$address.country",   // Agrupa por país
        bedrooms: "$bedrooms"          // Agrupa también por número de habitaciones
      },
      averagePrice: { $avg: "$price" } // Calcula el precio medio por grupo
    }
  },
  {
    $project: {
      country: "$_id.country",         // Muestra el país
      bedrooms: "$_id.bedrooms",       // Muestra el número de habitaciones
      averagePrice: 1,                 // Muestra el precio medio
      _id: 0                           // Excluye _id del resultado
    }
  }
])
```

## Desafio

Queremos mostrar el top 5 de alojamientos más caros en España, con los siguentes campos:

- Nombre.
- Precio.
- Número de habitaciones
- Número de camas
- Número de baños
- Ciudad.
- Servicios, pero en vez de un array, un string con todos los servicios incluidos.

```js
use('airbnb')
db.listingsAndReviews.aggregate([
    {
      $match: { "address.country": "Spain" }  // Filtra alojamientos en España
    },
    {
      $project: {
        name: 1,                              // Muestra el nombre
        price: 1,                             // Muestra el precio
        bedrooms: 1,                          // Muestra el número de habitaciones
        beds: 1,                              // Muestra el número de camas
        bathrooms: 1,                         // Muestra el número de baños
        city: "$address.market",              // Muestra la ciudad (address.market)
        amenities: { $reduce: {               // Convierte el array de amenities a un string
          input: "$amenities",
          initialValue: "",
          in: {
            $cond: { 
              if: { $eq: [ "$$value", "" ] }, 
              then: "$$this", 
              else: { $concat: [ "$$value", ", ", "$$this" ] }
            }
          }
        }}
      }
    },
    {
      $sort: { price: -1 }                    // Ordena por precio de forma descendente (más caro primero)
    },
    {
      $limit: 5                               // Limita los resultados a los 5 primeros
    }
  ])
  
```
