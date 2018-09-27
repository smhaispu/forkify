import { key,url } from "../config";
import axios from "axios";

    export default class Recipe{
  
        constructor(Id){
           this.Id = Id
         }
       async getRecipeDetails(){
        try {
            const res = await axios(`${url}get?key=${key}&rId=${this.Id}`);
               this.img = res.data.recipe.image_url;
               this.publisher = res.data.recipe.publisher;
               this.source = res.data.recipe.source_url;
               this.title = res.data.recipe.title;
               this.ingredients = res.data.recipe.ingredients;
            } 
            catch (error) {
                console.log(error);
            }
         
                   
        } 
        calcTime(){
            const numIng = this.ingredients.length;
            const periods = Math.ceil(numIng / 3);
            this.time = periods * 15 ;
        }   
        calcServings(){
            this.servings = 4;
        }
        parseIngredients(){
            //Uniform all the units
            const unitLong =['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','cup','pounds'];
            const unitShort =['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
            const units = [...unitShort,'kg','g'];
            console.log(this.ingredients);
            const newIngredients = this.ingredients.map(el => {
                  let ingredient = el.toLowerCase(); 
                  unitLong.forEach((unit,i)=>{
                    ingredient = ingredient.replace(unit,unitShort[i]);
                   
                  });
            //remove the paranthesis
            let arrIng= ingredient.replace(/ *\([^)]*\) */g, " ");
            
            //convert ingredients into a object of count 
            arrIng = arrIng.split(' ');
            let unitIndex = arrIng.findIndex(el2 =>{
              
                return units.includes(el2)
            });
            console.log(unitIndex);
            
                  //unit is there
                  //unit is not der but count is der
                  //nor unit nor count
               let objIng; 
              
            if(unitIndex > -1){
                let count;
                const arrCount = arrIng.slice(0, unitIndex);
                
                if(arrCount.length ===1){
                    if(arrIng[0]  !=="")
                    {
                        count = eval(arrIng[0].replace('-','+'));
                    }else{
                        count = 1;
                    }

                }else {
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng ={
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex +1).join(' ')
                }
            }
            else if(parseInt(arrIng[0],10)){
                objIng = {
                    count:arrIng[0],
                    unit :'',
                    ingredient :arrIng.slice(1).join(' ')
                }
            }else if(unitIndex === -1){
               objIng={
                count: 1,
                unit :'',
                ingredient
               } 
            }
           
            return objIng;
        });
        this.ingredients = newIngredients;
        } 

         updateServings(type){
            const newServings = type==='dec'? this.servings -1 :this.servings + 1;
            this.ingredients.forEach(el=>{
              
              el.count = parseFloat(el.count,10) *(newServings/this.servings);
              console.log(el.count);
            }); 
            this.servings = newServings;
         } 
   }

    
