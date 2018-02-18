
# Nodepop
Práctica Ads API
## Instalación
### Instalación Proyecto
	$ git clone https://github.com/DanielVillalbaD/Nodepop.git
	$ npm install

### Arrancar el motor de BBDD MongoDB
	Con tu configuración.
	
### Instalación de la Base de Datos
	$ npm run dbreset

### Lanzar el API
	$ npm run dev

## Documentación

### Página de Inicio
- **Notas:** index = localhost:3000, filtros ajax = funcionando, paginación = básica, post = no finalizado.


### Filtros Método GET
- **Por Tipo:** venta = boolean
			Donde true son anuncios de venta y false anuncios de deseos.
			Ejemplo. Filtrar por artículos en venta:
			http://localhost:3000/api/anuncios?venta=true
			
- **Por Etiquetas:** tags = [string]
			Puede filtrarse por una o más etiquetas encadenando '&' a la url.
			Ejemplo. Filtrar por etiquetas:
			http://localhost:3000/api/anuncios?tags=mobile

- **Por Nombre:** name = string
			Puede buscarse todos los artículos cuyo nombre comiencen por el valor del string
			Ejemplo. Filtrar por artículos cuyo nombre comience por iphone:
			http://localhost:3000/api/anuncios?name=iphone

- **Por Precio:** precio = string => Resume: precio: preciomin-preciomax
			Filtra artículos entre un precio mínimo y un precio máximo.
			Ejemplo. Filtrar por artículos cuyo precio máximo sea 1.000 €:
			http://localhost:3000/api/anuncios?precio=-1000

### Método POST
Usar una herramienta como PostMan o similar para crear datos a la url http://localhost:3000/api/anuncios, la estructura de los datos es:
 > name: String,
 > venta: Boolean,
 > precio: Number,
 > foto: String,
 > tags: [String]

### Método DELETE
Elimina un anuncio mediante su id.	
> { _id: id_anuncio }
> URL: http://localhost:3000/api/anuncios
### Método PUT
Actualiza un anuncio obtenido por su id según JSON pasado en body.	
> Estructura JSON = Método POST
> URL: http://localhost:3000/api/anuncios

## NOTAS PROPIAS
C:\Program Files\MongoDB\Server\3.6\bin
mongod --dbpath W:\Brainit\Keep Coding\Bootcamp\NODEJS\bootweb4\datapop\db --directoryperdb
