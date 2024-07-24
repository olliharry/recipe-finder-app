import React from "react";

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
    <div>
      <p>awd</p>
    </div>
  );
};

export default FavouriteView;
