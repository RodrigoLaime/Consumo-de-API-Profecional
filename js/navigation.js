searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;/* al oprimir buscar te lleva a search y concatenado el valor del input*/
})
trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';/* al oprimir buscar te lleva a search */
})
arrowBtn.addEventListener('click', () => {
  //  location.hash = '#home';/* al oprimir buscar te lleva a search */
  history.back()/* permite regresar en el historial */

})

window.addEventListener('DOMContentLoaded', navigator);/* llamamos el evento DomContentLoaded de window, la funcion que va a ejecutar y un false */ /* llamamos cuando carge la aplicacion */
window.addEventListener('hashchange', navigator, false);/* llamamos el evento hashchange de window, la funcion que va a ejecutar y un false */ /* llamamos cuando cambie el hash */

/* funcion para cambiar ver los hash */
function navigator() {
  console.log({ location });

  if (location.hash.startsWith('#trends')) { /*si comiensa con el hash #trends */
    trendsPage();
  } else if (location.hash.startsWith('#search=')) { /* si comiensa con el hash #search= */
    searchPage();
  } else if (location.hash.startsWith('#movie=')) { /* si comiensa con el hash #movie= */
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) { /* si comiensa con el hash #category= */
    categoriesPage();
  } else {
    homePage();
  }

  /* logica para que el scroll comiense desde el top */
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function homePage() {
  console.log('Home!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';

  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
}
function categoriesPage() {
  console.log('Categories!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');//['category', 'id-name'] /* desustructuramos y recorremos el array separandolo */
  const [categoryId, categoryName] = categoryData.split('-')/* volvemos a seaprar el array con - */

  headerCategoryTitle.innerHTML = categoryName;/* accedemos a categoryTitles de node.js*/
  getMoviesByCategory(categoryId);/* pasasamos como parametro el id */
}
function movieDetailsPage() {
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
  /*  headerSection.style.background = ''; */

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_, movieId] = location.hash.split('=');//[pelicular, id]
  getMovieById(movieId);/* funcion que permite ver la informacion de la peli */
}
function searchPage() {
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
  /*  headerSection.style.background = ''; */

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  /* convertimos en array lo que esta en string y recorremos separando de un lado lo que este antes del = y en tro los que este despues del = */
  const [_, query] = location.hash.split('=');//['·search', 'input.value'] /* desustructuramos y recorremos el array separandolo */
  getMoviesBySearch(query);
}
function trendsPage() {
  console.log('Trends!!');

  headerSection.classList.remove('header-container--long');
  /*  headerSection.style.background = ''; */

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';/* accedemos a categoryTitles de node.js*/

  getTrendingMovies();
}