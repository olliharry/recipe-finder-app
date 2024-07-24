import React, {
  useActionState,
  useState,
  useTransition,
  useEffect,
} from "react";
import Image from "next/image";
import {
  FavouriteRecipe,
  GetAllFavouritesIds,
} from "../actions/favourite-recipe-action";
import Alert from "@mui/material/Alert";

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
  const [favourites, setFavourites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean[]>([false]);
  const [showAlert, setShowAlert] = useState(false);
  const r = recipes[0];

  

  useEffect(() => {
    const initialLoadingState = Array(recipes.length).fill(false);
    setLoading(initialLoadingState);
    const fetchFavourites = async () => {
      setFavourites([]);
      const f = await GetAllFavouritesIds();
      if (f) {
        const newFavourites = f.map((item) => item.recipeID);
        setFavourites(newFavourites);
      }
    };

    fetchFavourites();
  }, [r]);

  return (
    <div className="flex flex-col pt-5 items-center">
      {showAlert && (
        <Alert
          severity="error"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Please login to favourite a recipe.
        </Alert>
      )}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
        {recipes.map((recipe, index) => (
          <div key={index} className="card bg-secondary w-96 shadow-xl">
            <figure className="pt-3">
              <Image
                className="rounded-lg h-auto"
                src={recipe.recipeImage}
                alt="No Image"
                width={200}
                height={200}
                style={{ width: "70%", height: "auto" }}
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
              {loading[index] && (
                <span className="loading loading-spinner loading-md"></span>
              )}
              {favourites.includes(recipe.recipeId) && !loading[index] && (
                <button
                  className="btn rounded-full w-15"
                  onClick={async () => {
                    setLoading((prevLoading) => {
                      const newLoading = [...prevLoading];
                      newLoading[index] = true;
                      return newLoading;
                    });
                    const r = await FavouriteRecipe(recipe.recipeId);
                    if (r == 2) {
                      setFavourites((prevFavourites) =>
                        prevFavourites.filter((id) => id !== recipe.recipeId)
                      );
                    }
                    if (r == 3) {
                      setShowAlert(true);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                    setLoading((prevLoading) => {
                      const newLoading = [...prevLoading];
                      newLoading[index] = false;
                      return newLoading;
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
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
              )}
              {!favourites.includes(recipe.recipeId) && !loading[index] && (
                <button
                  className="btn rounded-full w-15"
                  onClick={async () => {
                    setLoading((prevLoading) => {
                      const newLoading = [...prevLoading];
                      newLoading[index] = true;
                      return newLoading;
                    });
                    const r = await FavouriteRecipe(recipe.recipeId);
                    if (r == 1) {
                      setFavourites((prevFavourites) => [
                        ...prevFavourites,
                        recipe.recipeId,
                      ]);
                    }
                    if (r == 3) {
                      setShowAlert(true);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                    setLoading((prevLoading) => {
                      const newLoading = [...prevLoading];
                      newLoading[index] = false;
                      return newLoading;
                    });
                  }}
                >
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesView;
