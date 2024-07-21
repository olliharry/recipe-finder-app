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
        <div key={index} className="card bg-secondary w-96 shadow-xl">
          <figure className="pt-3">
            <Image
              className="rounded-lg"
              src={recipe.recipeImage}
              alt="No Image"
              width={200}
              height={200}
            />
          </figure>

          <div className="card-body flex justify-center items-center">
            <h2 className="card-title text-2xl text-center">
              {recipe.recipeName}
            </h2>

            <h1 className="text-xl">Missing Ingredients:</h1>
            <ul className="list-disc ">
              {recipe.missingIngredients.map((missingIngredient, mI) => (
                <li key={mI}>{missingIngredient}</li>
              ))}
            </ul>
            <h1 className="text-xl">Used Ingredients:</h1>
            <ul className="list-disc ">
              {recipe.usedIngredients.map((usedIngredient, uI) => (
                <li key={uI}>{usedIngredient}</li>
              ))}
            </ul>
            <button className="btn rounded-full w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesView;
