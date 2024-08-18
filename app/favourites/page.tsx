import React from "react";
import FavouriteView from "../components/favourite-view";
import { auth } from "@/auth";
import { GetAllFavourites } from "../actions/favourite-recipe-action";

export default async function page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const favourites = await GetAllFavourites();
  if(favourites?.length == 0 || favourites==undefined) return <div>No Favourites!</div>;
  return (
    <div className="flex justify-center">
      <FavouriteView favourites={favourites} />
    </div>  
  );
}
