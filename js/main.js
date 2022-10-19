const api = axios.create({/* creanos una nueva instancia de axios */
  baseURL: 'https://api.themoviedb.org/3/',/* agregar la base de la url que no cambia */
  params: {/* se pasa parametros */
    'api_key': API_KEY,
  },
});

/* UTILS */
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img')
      /*       console.log(entry.target); */
      entry.target.setAttribute('src', url);
    }
  });
});


function createMovies(movies, container, { lazyLoad = false, clean = true } = {}) {/* pasarle el array y el contenedor */
  if (clean) {
    container.innerHTML = '';
  }

  movies.forEach(movie => {/* movie hace referencia a la respuesta json de la api */
    /* Crear Elementos -----------------*/
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');/* agregar clase para que se active de css */
    movieContainer.addEventListener('click', () => {/* evento que */
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title); /* atributo alt y la propiedad de la api title */


    /* si ? lazyLoader es true : si es falso */
    movieImg.setAttribute(
      lazyLoad ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);/* el atributo SRC la URL del img concatenada con la PROPIEDAD de la API */

    movieImg.addEventListener('error', () => {
      movieImg.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQirwMo_RBSjS96pBQfEbpKLygfQWkWyfPLOpYpXT1m68SB2VhZ50b4i1QnahAQ5IDzdwM&usqp=CAU');
      /* movieImg.setAttribute('src', 'https://i.pinimg.com/originals/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg'); */
      /* movieImg.setAttribute('src', 'https://thumbs.dreamstime.com/b/film-logo-template-design-vector-166724559.jpg'); */
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    /* agregar elemento ---------------*/
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
    /*     console.log(trendingPreviewMoviesContainer); */
  });

}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {/* movie hace referencia a la respuesta json de la api */
    /* Crear Elementos -----------------*/
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');/* agregar clase para que se active de css */

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id); /* atributo id y concatenamos el id con la propiedad de la api id*/
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;/* cada que oprimen el titulo categoria te lleva a segun el id y el name a la categoria del id*/
    })
    const categoryTitleText = document.createTextNode(category.name)/* obtenemos la propiedad name de la api*/

    /* agregar elemento ---------------*/
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

/* LLAMADO A LA API---------------------------------- */
async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');/* Url de api endpoin tendencia y su apikey */
  /*  const data = await res.json(); */

  const movies = data.results;/* obtenemos la propiedad de results de data que tiene las peliculas */
  console.log({ data, movies });
  console.log(movies)

  /* LLamamos la funcion */
  createMovies(movies, trendingMoviesPreviewList, true);/* Le pasamos los argumentos que necesita la funcion (el array y el contenedor de peliculas)*/

  // trendingMoviesPreviewList.innerHTML = "";/* variable definida en node.js */ /* cada que carge se recetea la informacion para que no se duplique la informacion */
  //movies.forEach(movie => {/* movie hace referencia a la respuesta json de la api */
  //  /* Crear Elementos -----------------*/
  //  const movieContainer = document.createElement('div');
  //  movieContainer.classList.add('movie-container');/* agregar clase para que se active de css */
  //
  //  const movieImg = document.createElement('img');
  //  movieImg.classList.add('movie-img');
  // movieImg.setAttribute('alt', movie.title); /* atributo alt y la propiedad de la api title */
  // movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);/* el atributo SRC la URL del img concatenada con la PROPIEDAD de la API */
  //
  //  /* agregar elemento ---------------*/
  //  movieContainer.appendChild(movieImg);
  //  trendingMoviesPreviewList.appendChild(movieContainer);
  // /*     console.log(trendingPreviewMoviesContainer); */
  //});

}

async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');/* url de la api endpoin generos y la APY_KEY */
  /* const data = await res.json(); *///axios lo hace automaticamente

  const categories = data.genres;/* obtenemos la propiedad de genres de data que tiene las peliculas */
  /* console.log({ data, genres }); */

  createCategories(categories, categoriesPreviewList)
  //categoriesPreviewList.innerHTML = "";/* variable establecida en node.js */  /* cada que carge se recetea la informacion para que no se duplique la informacion */
  //categories.forEach(category => {/* movie hace referencia a la respuesta json de la api */
  //  /* Crear Elementos -----------------*/
  //  const categoryContainer = document.createElement('div');
  //  categoryContainer.classList.add('category-container');/* agregar clase para que se active de css */

  //  const categoryTitle = document.createElement('h3');
  //  categoryTitle.classList.add('category-title');
  //  categoryTitle.setAttribute('id', 'id' + category.id); /* atributo id y concatenamos el id con la propiedad de la api id*/
  //  categoryTitle.addEventListener('click', () => {
  //    location.hash = `#category=${category.id}-${category.name}`;/* cada que oprimen el titulo categoria te lleva a segun el id y el name a la categoria del id*/
  //  })
  //  const categoryTitleText = document.createTextNode(category.name)/* obtenemos la propiedad name de la api*/

  /* agregar elemento ---------------*/
  //  categoryTitle.appendChild(categoryTitleText);
  //  categoryContainer.appendChild(categoryTitle);
  //  categoriesPreviewList.appendChild(categoryContainer);
  // });

}

/* funcion para ver las categorias segun el id */
async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {/* Url de api endpoin tendencia y su apikey */
    params: {/* pasa parametros */
      with_genres: id,
    }
  });

  /*  const data = await res.json(); */

  const movies = data.results;/* obtenemos la propiedad de results de data que tiene las peliculas */
  console.log({ data, movies });
  maxPage = data.total_pages;

  createMovies(movies, genericSection, {
    lazyLoad: true
  });

  //genericSection.innerHTML = "";/* variable definida en node.js */ /* cada que carge se recetea la informacion para que no se duplique la informacion */
  //movies.forEach(movie => {/* movie hace referencia a la respuesta json de la api */
  /* Crear Elementos -----------------*/
  //  const movieContainer = document.createElement('div');
  //  movieContainer.classList.add('movie-container');/* agregar clase para que se active de css */

  //  const movieImg = document.createElement('img');
  //  movieImg.classList.add('movie-img');
  //  movieImg.setAttribute('alt', movie.title); /* atributo alt y la propiedad de la api title */
  //  movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);/* el atributo SRC la URL del img concatenada con la PROPIEDAD de la API */

  /* agregar elemento ---------------*/
  //  movieContainer.appendChild(movieImg);
  //  genericSection.appendChild(movieContainer);
  //  /*     console.log(trendingPreviewMoviesContainer); */
  //});

}
async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {/* Url de api endpoin tendencia y su apikey */
    params: {/* pasa parametros */
      query,
    },
  });

  /*  const data = await res.json(); */

  const movies = data.results;/* obtenemos la propiedad de results de data que tiene las peliculas */
  /*  console.log({ data, movies }); */

  maxPage = data.total_pages;
  console.log(maxPage);

  createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {

  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    /* hacemos la validacion de si llegamos al final  */
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage; /* si la pagina en la que estamos es menor a la cantidad maxima de pagina */
    /* mandamos a llamar la nueva API  */
    if (scrollIsBottom && pageIsNotMax) {/* mi scrol tiene que estar al final y mi pagina no puede ser la ultima pagina */
      page++;
      const { data } = await api('search/movie', {/* Url de api endpoin tendencia y su apikey */
        params: {/* pasa parametros */
          query,
          page,
        }
      });

      /*  const data = await res.json(); */

      const movies = data.results;/* obtenemos la propiedad de results de data que tiene las peliculas */

      createMovies(movies, genericSection, { lazyLoad: true, clean: false })
    }

  }
  /*   const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar Mas';
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    genericSection.appendChild(btnLoadMore); */

}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');/* Url de api endpoin tendencia y su apikey */
  /*  const data = await res.json(); */

  const movies = data.results;/* obtenemos la propiedad de results de data que tiene las peliculas */

  maxPage = data.total_pages;

  /* LLamamos la funcion */
  createMovies(movies, genericSection, { lazyLoad: true, clean: true });/* Le pasamos los argumentos que necesita la funcion (el array y el contenedor de peliculas)*/

  /*   const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar Mas';
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    genericSection.appendChild(btnLoadMore); */

}

/* logica para hacer scroll infinito */

async function getPaginatedTrendingMovies() {

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  /* hacemos la validacion de si llegamos al final  */
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

  const pageIsNotMax = page < maxPage; /* si la pagina en la que estamos es menor a la cantidad maxima de pagina */
  /* mandamos a llamar la nueva API  */
  if (scrollIsBottom && pageIsNotMax) {/* mi scrol tiene que estar al final y mi pagina no puede ser la ultima pagina */
    page++;
    const { data } = await api('trending/movie/day', {
      params: {
        page,
      },
    });

    const movies = data.results;
    /*  console.log(data); */

    createMovies(movies, genericSection, { lazyLoad: true, clean: false })
  }

  /*   const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar Mas';
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    genericSection.appendChild(btnLoadMore); */

}

async function getMovieById(id) {
  const { data: movie } = await api('movie/' + id);

  /* mostrar la imagen */
  const movieImgUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
  console.log(movieImgUrl);
  headerSection.style.background = `
  linear-gradient(
    180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
  url(${movieImgUrl})`;

  /* logica para llevar mostrar el titulo, texto, estrellas de la peli */
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  /* lgica que muestra la categoria de la pelicula */
  createCategories(movie.genres, movieDetailCategoriesList);/* le pasamos el array de categorias genres y que las agrege al nodo movieDetailCategoriesList*/

  getRelatedMoviesId(id);/* funcion para ver las pelis relacionadas */
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);/* le pasamos el dato y el contenedor donde se va a  mostrar la info */
}