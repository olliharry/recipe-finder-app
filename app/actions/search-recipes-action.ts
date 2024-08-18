'use server'
import axios from 'axios';

interface Recipe{
    recipeId: number;
    recipeImage: string;
    missingIngredients: string[];
    usedIngredients:string[];
    recipeName:string;
}

export default async function GetRecipes(ingredients:string[]) {
    if(ingredients.length<1){
        return 'Too few ingredients!'
    }
    const apiKey = process.env.SPOON_API_KEY;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true`
    const response = await axios.get(url);
    

    if(!response.data){
        return 'error!'
    }

    let recipes:Recipe[] = [];

    for(let i = 0;i<response.data.length;i++){
        let missingIngredients:string[] = [];
        let usedIngredients:string[] = [];
        for(let m = 0;m<response.data[i].missedIngredients.length;m++){
            missingIngredients.push(response.data[i].missedIngredients[m].name)
        }
        for(let u = 0;u<response.data[i].usedIngredients.length;u++){
            usedIngredients.push(response.data[i].usedIngredients[u].name)
        }
        let newRecipe:Recipe = {
            recipeId: response.data[i].id,
            recipeImage: response.data[i].image,
            missingIngredients: missingIngredients,
            usedIngredients: usedIngredients,
            recipeName: response.data[i].title,
        }
        recipes.push(newRecipe);
    }
    return recipes;
}