export const element = {
    searchBtn : document.querySelector('.search__btn'),
    searchField : document.querySelector('.search__field'),
    inputRecipe : document.querySelector('.results__list'),
    inputSearchRes : document.querySelector('.results'),
    inputResPage : document.querySelector('.results__pages'),
    recipeParent :  document.querySelector('.recipe'),
    listShopping : document.querySelector('.shopping__list'),
    likesMenu : document.querySelector('.likes__field'),
    likesList : document.querySelector('.likes__list')
    
} 
export const elementStrings = {
    loader : 'loader'
}
export const addLoader = parent => {
   let loader = `<div class ="${elementStrings.loader}">
    <svg>
    <use href ="img/icons.svg#icon-cw"></use>
    </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin',loader);
}
export const removeLoader = () => {
    let loaderElem = document.querySelector(`.${elementStrings.loader}`);
    if(loaderElem)loaderElem.parentElement.removeChild(loaderElem);
}