import { element } from "./base";

export const getInput= () => element.searchField.value;
export const clearInputField = () => {
    element.searchField.value ='';
};
export const clearRecipeList  = ()=>{
  element.inputRecipe.innerHTML ='';
  element.inputResPage.innerHTML ='';
};
 export const limitRecipeTitle = title=> {
    const limit  = 17;
    let acc= 0;
    const alltitle =[];
    if(title.length >= limit)
    {

        title.split(' ').reduce((acc,cur) => { 
           if(acc + cur.length < 17){
            alltitle.push(cur);
           }
          return acc + cur.length;
        },0);
        return `${alltitle.join(' ')}...`;
    }
    return title;  
};
const createPageBtn = (page,type) => `
<button class="btn-inline results__btn--${type}" data-goto =${type ==='next'? page + 1: page - 1}>
<span>Page ${type ==='next'? page + 1: page - 1}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type ==='next'?'right':'left'}"></use>
</svg>
</button>             
`;
const renderPageNum = (totalRec,page,numOfRec) => {
  //  createPageBtn()
  let type,button;
  let pages = Math.ceil(totalRec/numOfRec);
  console.log(pages);
  if(page===1){
      type= 'next';
      button= createPageBtn(page,type);
  }
  else if(page < pages && pages !==1){
    button= createPageBtn(page,'next') +
    createPageBtn(page,'prev');
  }else if(page === pages && pages !==1){
    button=createPageBtn(page,'prev');
  }
  return button;
};
export const highLightBG = (Id) => {
    let activeClasses =document.querySelectorAll('.results__link');
    activeClasses=  Array.from(activeClasses);
    activeClasses.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href*="${Id}"]`).classList.add('results__link--active');
};
const renderRecipe = recipe => {
const recipeListHtml = ` 
<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`
element.inputRecipe.insertAdjacentHTML('beforeend',recipeListHtml);
}
export const renderResults = (recipes,page = 1,numOfRec = 10) => {
   // console.log(renderRecipe);
   let start = (page -1) * numOfRec;
   let end  = page * numOfRec;
    recipes.slice(start,end).forEach(renderRecipe);
    element.inputResPage.insertAdjacentHTML('beforeend',renderPageNum(recipes.length,page,numOfRec));
}