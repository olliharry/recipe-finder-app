"use client";
import React from "react";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import GetList from "../utils/ingredient-list";

export default function IngredientSelect() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/3">
        <Autocomplete
          multiple
          id="tags-outlined"
          options={GetList()}
          getOptionLabel={(option) => option}
          onChange={(e, v) => setSuggestions(v)}
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
    </div>
  );
}
