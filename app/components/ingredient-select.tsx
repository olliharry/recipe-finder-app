"use client";
import React from "react";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import GetList from "../utils/ingredient-list";
import GetRecipes from "../actions/search-recipes-action";
import RecipesView from "./recipes-view";

interface Recipe {
  recipeId: number;
  recipeImage: string;
  missingIngredients: string[];
  usedIngredients: string[];
  recipeName: string;
}

export default function IngredientSelect() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [ranking, setRanking] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col  w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <div className="flex items-center space-x-2">
          <Autocomplete
            className="flex-grow"
            multiple
            id="tags-outlined"
            options={GetList()}
            getOptionLabel={(option) => option}
            onChange={(e, v) => setSuggestions(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="What ingredients do you have?"
                placeholder="Ingredient"
              />
            )}
          />
          <button
            className="btn btn-sm"
            onClick={async () => {
              let result = await GetRecipes(suggestions);
              if (typeof result != "string") {
                setRecipes(result);
              }
            }}
          >
            Search Recipes
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <RecipesView recipes={recipes} />
      </div>
    </div>
  );
}
