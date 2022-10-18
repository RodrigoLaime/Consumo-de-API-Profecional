async function getTrendingMoviesPreview() {
  const res = await fetch('trending/movie/day?api_key=' + API_KEY);/* Url de api endpoin tendencia y su apikey */
  const data = await res.json();

  const movies = data.results;/* obtenemos la propiedad de results de data que tiene las peliculas */
  console.log({ data, movies });

  movies.forEach(movie => {/* movie hace referencia a la respuesta json de la api */
    /* Crear Elementos -----------------*/
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');/* agregar clase para que se active de css */

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title); /* atributo alt y la propiedad de la api title */
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);/* el atributo SRC la URL del img concatenada con la PROPIEDAD de la API */

    /* agregar elemento ---------------*/
    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
    console.log(trendingPreviewMoviesContainer);
  });

}

async function getCategoriesPreview() {
  const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);/* url de la api endpoin generos */
  const data = await res.json();

  const categories = data.genres;/* obtenemos la propiedad de genres de data que tiene las peliculas */
  /* console.log({ data, genres }); */

  categories.forEach(category => {/* movie hace referencia a la respuesta json de la api */
    /* Crear Elementos -----------------*/
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');/* agregar clase para que se active de css */

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id); /* atributo id y concatenamos el id con la propiedad de la api id*/
    const categoryTitleText = document.createTextNode(category.name)/* obtenemos la propiedad name de la api*/

    /* agregar elemento ---------------*/
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);

  });

}

getTrendingMoviesPreview();
getCategoriesPreview()
