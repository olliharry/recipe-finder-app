import React from "react";
import Image from "next/image";
import IngredientSelect from "./ingredient-select";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteFavourite } from "../actions/favourite-recipe-action";

interface Favourite {
  id: string;
  userId: string;
  recipeID: number;
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  recipeImage: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}
interface FavouriteViewPros {
  favourites: Favourite[];
}

const FavouriteView: React.FC<FavouriteViewPros> = ({ favourites }) => {
  
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
      {favourites.map((favourite, index) => (
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
        <Image
                className="rounded-lg h-auto"
                src={favourite.recipeImage}
                alt="No Image"
                width={200}
                height={200}
                style={{ width: "70%", height: "auto" }}
              />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{favourite.recipeName}</h2>
          <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
          <div className="collapse-title text-xl font-medium">Ingredients</div>
          <div className="collapse-content">
            <ul>
              {favourite.ingredients.map((ingredient, index) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
          <div className="collapse-title text-xl font-medium">Instructions</div>
          <div className="collapse-content">
            <ul className="list-disc">
              {favourite.instructions.map((instruction, index) => (
              <li>{instruction}</li>
          ))}
            </ul>
          
          </div>
          
          </div>
          <div className="flex justify-center">
            <Button onClick={async () => {
          await DeleteFavourite(favourite.id);
        }} 
        className="mb-5 w-30" variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button></div>
          
        </div>
        
      </div>
      ))}
      
    </div>
  );
};

export default FavouriteView;
