"use server"

import { Puritan } from "next/font/google";
import prisma from "../lib/prisma";
import { GetUser } from "./actions";
import axios from "axios";

export async function FavouriteRecipe(recipeId:number ){
    const user = await GetUser();
    if(!user?.email) return;

    const recipeDelete = await prisma.recipe.findFirst({
        where:{
            userId:user.id,
            recipeID:recipeId,
        }
    })

    if(recipeDelete != null){
        await prisma.recipe.delete({
            where:{
                id:recipeDelete.id,
            }
        })
        return;
    }

    const apiKey = process.env.SPOON_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    const rIngredients = await axios.get(url);
    
    let ingredients: string[] = [];
    for (let i = 0; i < rIngredients.data.extendedIngredients.length; i++) {
        let ingredient:string = '';
        ingredient = ingredient + rIngredients.data.extendedIngredients[i].measures.metric.amount.toString();
        ingredient = ingredient + ' ' + rIngredients.data.extendedIngredients[i].measures.metric.unitShort;
        ingredient = ingredient + ' ' + rIngredients.data.extendedIngredients[i].name;
        ingredients.push(ingredient);
    }
    const url2 = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`
    const rInstructions = await axios.get(url2);

    let instructions: string[] = [];
    if(rInstructions.data.length !=0){
        for (let i = 0; i < rInstructions.data[0].steps.length; i++) {
            instructions.push(rInstructions.data[0].steps[i].step)
        }
    }

    const recipe = await prisma.recipe.create({
        data:{
            userId: user.id,
            recipeID: recipeId,
            recipeName: rIngredients.data.title,
            recipeImage: rIngredients.data.image,
            vegetarian: rIngredients.data.vegetarian,
            vegan: rIngredients.data.vegan,
            glutenFree: rIngredients.data.glutenFree,
            dairyFree: rIngredients.data.dairyFree,
            ingredients: ingredients,
            instructions: instructions,

        }
    })
}

export async function GetAllFavourites(){
    const user = await GetUser();
    if(!user?.email) return;

    const ids = await prisma.recipe.findMany({
        where:{
            userId:user.id,
        },
        select:{
            recipeID:true,
        }
    })
    if(!ids) return null;
    return ids;
}


    
    


