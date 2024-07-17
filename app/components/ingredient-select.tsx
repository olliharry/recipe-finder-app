"use client";
import React from "react";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import GetList from "../utils/ingredient-list";

export default function IngredientSelect() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      <Autocomplete
        freeSolo
        multiple
        id="tags-standard"
        options={GetList()}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Ingredients"
            placeholder="Ingredient"
          />
        )}
      />
    </div>
  );
}
