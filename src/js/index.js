// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
import {element,addLoader,removeLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from "./views/recipeView"
import List  from './models/List'
import * as listView from './views/listView'
import Likes from './models/Likes';
import * as likeView from './views/likeView';

//console.log(search);

const state = {};
window.state = state;
const controlSearch = async () =>{
    
    //Get the recipe from UI 
    const query = searchView.getInput();
    console.log(query);

   
    if(query){
         //search and get the recipes 
        state.search = new Search(query);
        //display a waiting clock and other UI stuff
        searchView.clearInputField();
        searchView.clearRecipeList();
        addLoader(element.inputSearchRes);
        //SEARCH  for recipes.
        await state.search.getRecipe();
        removeLoader();
        searchView.renderResults(state.search.recipes);
    }

   
}
element.inputResPage.addEventListener('click',e =>{
    let btn  = e.target.closest('.btn-inline');
    if(btn){
         const gotoPage= parseInt(btn.dataset.goto,10);
         console.log(gotoPage);
         searchView.clearRecipeList();
         searchView.renderResults(state.search.recipes,gotoPage);
    }
});
element.searchBtn.addEventListener('click',eve => {
    eve.preventDefault();
    controlSearch();
});

//recipe List Controller
const controlList =() => { 
    //create a new List 
    if(!state.List) state.List =  new List();
    //Create List of Ingrediants and render it in UI
    state.recipe.ingredients.forEach(el => {
       const item = state.List.addItem(el.count,el.unit,el.ingredient);
       listView.renderList(item);
    }) 

};


///////////////////////////////
//control Likes on the Recipes
const controlLikes = () => {
    if(!state.likes)state.likes= new Likes();
    const currentId = state.recipe.Id;
    //User Has NOT liked the recipe Yet
    if(!state.likes.isLiked(currentId)){
        //Add to the Liked List 
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img);
        //toggle the like button 
        likeView.toggleLikedBtn(state.likes.isLiked(currentId));
        //add like to the UI list
       likeView.renderLike(newLike);
    }else{
        //User has liked the recipe Yet
        //remove from the state liked list
        state.likes.deleteLike(currentId);
        //toggle the like
        likeView.toggleLikedBtn(state.likes.isLiked(currentId));
        //remove from the UI List
        likeView.deleteLike(currentId);
    }
    likeView.toggleMenuLikeBtn(state.likes.getNumLikes());
}

//Store and Read the liked recipes From the local storage
window.addEventListener('load',() => {
    state.likes = new Likes();
    //restore likes
    state.likes.readLocalData();
    //Toggle like menu button.
    likeView.toggleMenuLikeBtn(state.likes.getNumLikes());
    //render the likes list
    state.likes.likes.forEach(el => likeView.renderLike(el));


})
//Handle delete and Update List items
element.listShopping.addEventListener('click',e =>{
    //Delete the List Item
   const id= e.target.closest('.shopping__item').dataset.itemid;
if(e.target.matches('.shopping__delete,.shopping__delete *')){
   //Delete from the state
   state.List.deleteItem(id);
   //delete from the UI
   listView.deleteList(id);   
}else if(e.target.matches('.shopping__count-value')){
//Update the COunt value
   var countVal = parseFloat(e.target.value,10);
   state.List.updateItem(id,countVal);
}

}

);
//window.addEventListener('hashchange',createRecipeDetail);
const createRecipeDetail = async () =>{
    const id =  window.location.hash.replace('#','')
    if(id){
        try{
            recipeView.clearRecipeDetails();
            addLoader(element.recipeParent);
            state.recipe = new Recipe(id);
            if(state.search)searchView.highLightBG(id);
            await state.recipe.getRecipeDetails();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            console.log(state.recipe);
            //render recipe details
            removeLoader();
            recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
        }catch(error){
            alert(error);
        }
    };
};
['hashchange','load'].forEach(event =>{
    window.addEventListener(event,createRecipeDetail)});

    element.recipeParent.addEventListener('click',e=>{
        if(e.target.matches('.btn-decrease, .btn-decrease *'))
        {
            if(state.recipe.servings >1){

                state.recipe.updateServings('dec');
            }
        }else if(e.target.matches('.btn-increase, .btn-increase *')){
            state.recipe.updateServings('inc');
        }
        else if(e.target.matches('.recipe__btn-add,.recipe__btn-add *')){
            controlList();
        }else if(e.target.matches('.recipe__love,.recipe__love *')){
            controlLikes();
        }
        console.log(state.recipe);
        recipeView.updateServingUI(state.recipe);
    }
);

