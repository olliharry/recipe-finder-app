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
  const [ranking, setRanking] = useState(2);
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
              let result = await GetRecipes(suggestions, ranking);
              if (typeof result != "string") {
                setRecipes(result);
              }
            }}
          >
            Search Recipes
          </button>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer flex ">
            <span className="label-text">
              Maximize usage of ingredients you have.
            </span>
            <div className="flex">
              <input
                type="radio"
                name="radio-10"
                onClick={() => setRanking(1)}
                className="radio checked:bg-primary"
                defaultChecked
              />
              <div
                className="tooltip tooltip-left md:tooltip-right"
                data-tip="Pritorize recipes using the maximun amount of your ingredients. May include recipes that you are missing many ingredients for."
              >
                <button className="btn btn-xs">?</button>
              </div>
            </div>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer flex">
            <span className="label-text">
              Minimize usage of ingredients that you don`t have.
            </span>
            <div className="flex">
              <input
                type="radio"
                name="radio-10"
                onClick={() => setRanking(2)}
                className="radio checked:bg-primary"
                defaultChecked
              />
              <div
                className="tooltip tooltip-left md:tooltip-right"
                data-tip="Prioritize recipes that have the least amount of missing ingredients."
              >
                <button className="btn btn-xs">?</button>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <RecipesView recipes={recipes} />
      </div>
    </div>
  );
}
