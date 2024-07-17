'use server'
import axios from 'axios';

export default async function GetSuggestions(query:string) {
    const apiKey = process.env.SPOON_API_KEY;
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${query}&number=${6}`
    const response = await axios.get(url);
    let suggestions:string[] = [];
    for(let i = 0; i<response.data.length;i++){
        suggestions.push(response.data[i].name);
    }
    return suggestions;
}