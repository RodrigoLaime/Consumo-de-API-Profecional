## startWith
metodo que permite preguntar si empiesa de cierta forma
##
1.
¿Por qué algunas APIs tienen versionamiento (v1, v2, etc.)?

Para evitar que el frontend u otras aplicaciones se rompan con el cambio de endpoints, pero permitiendo la migración a la versión más moderna.

2.
¿Qué es primero: frontend, backend o diseño?

Diseño

3.
¿Cómo evitamos que información sensible (como una API KEY) aparezca en nuestro repositorio de GitHub (aún siendo público)?

Separando la información sensible a un nuevo archivo y ese agregarlo al .gitignore.

4.
"Dado el siguiente contenido HTML:

<script src=""./secrets.js""></script>
<script src=""./main.js""></script>
¿Puede el archivo main.js leer las variables ““globales”” del archivo secrets.js?"

Verdadero

5.
¿Por qué crear un archivo package.json si no utilizaremos dependencias de NPM?

Para agregar la información (para humanos) de nuestro proyecto.

6.
¿Cuál de los siguientes es un ejemplo de manipulación del DOM?

const container = document.querySelector(‘container’)
const child = document.createElement(‘div’)
child.innerHTML = childContent
container.append(child)

7.
¿Cuál es la principal ventaja de usar Axios?

Reduce las líneas de código repetitivas para hacer consultas HTTP (baseURL, headers, params, etc.).

8.
¿Es posible implementar flujos de navegación y distintas vistas en un solo archivo HTML?

Verdadero: es lo que llamamos Single Page Applications (SPA).

9.
¿Cómo modificamos el hash de la URL de nuestra aplicación?

location.hash = “nuevoHash”

10.
¿Cómo escuchamos el evento de cambio de hash en la URL de nuestra aplicación?

window.addEventListener(‘hashchange’, navigationFunction)

11.
¿Cómo ejecutamos un mismo código para distintas URLs cuando todas ellas empiezan con #search=?
con location
<!-- Con un condicional if / else if por cada distinta URL que pueda hacer match. -->

REPASAR CLASE
12.
¿Es posible ejecutar cierto código de JavaScript SOLO cuando el hash de nuestra aplicación es #trends?

Verdadero

13.
En ciertas vistas de tu aplicación aparece una flecha de ir atrás que nos lleva a la vista principal.

Pero el equipo de QA reporta que al navegar entre vistas que no sean la principal (por ejemplo, de tendencias a detalles de una película) y luego usar el botón de ir atrás, el resultado no es el adecuado porque los usuarios terminan en el home y no en la vista anterior.

¿Cómo lo solucionas?

history.back()

14.
¿Es posible consumir más de una API REST (o hacer consultas a distintos endpoints de una misma API) en la misma ruta o vista frontend?

Verdadero

15.
Al entrar a una URL específica de tu aplicación se hace una consulta a la API y renderiza información en el DOM.

Pero el equipo de QA reporta que al navegar a otra sección y luego volver a la vista original, se repite el mismo proceso (consulta a la API + renderizado de información) y el usuario está viendo información duplicada.

¿Cómo lo solucionas?

Limpiando el contenedor HTML donde se renderiza la información antes de cada consulta a la API.

location.hast