import React from "react";
import Image from "next/image";

interface Recipe {
  recipeId: number;
  recipeImage: string;
  missingIngredients: string[];
  usedIngredients: string[];
  recipeName: string;
}

interface RecipesViewProps {
  recipes: Recipe[];
}

const RecipesView: React.FC<RecipesViewProps> = ({ recipes }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
      {recipes.map((recipe, index) => (
        <div key={index} className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <Image
              src={recipe.recipeImage}
              alt="No Image"
              width={200}
              height={200}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl">{recipe.recipeName}</h2>
            <h1 className="text-xl">Missing Ingredients:</h1>
            <ul className="list-disc pl-7">
              {recipe.missingIngredients.map((missingIngredient, mI) => (
                <li key={mI}>{missingIngredient}</li>
              ))}
            </ul>
            <h1 className="text-xl">Used Ingredients:</h1>
            <ul className="list-disc pl-7">
              {recipe.usedIngredients.map((usedIngredient, uI) => (
                <li key={uI}>{usedIngredient}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesView;
