import axios from "axios";
import { key,url } from "../config";
export default class Search {
    constructor(query){
        this.query = query ;
    }
    async getRecipe(query) {
        try{
            const results = await axios(`${url}search?key=${key}&q=${this.query}`);
             this.recipes = results.data.recipes
            //console.log(this.res);
        }
        catch(error){
            console.log(error);
        }
    }
}