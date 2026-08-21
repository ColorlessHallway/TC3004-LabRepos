import { useState } from "react";
import { AddCategory } from "./components/AddCategory"
import { DigiGrid } from "./components/DigiGrid";
export const ExpertApp = () => {
  const [categories, setCategories] = useState(['Koromon']);
  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return;
    setCategories([newCategory, ...categories]);
  }
  return (
    <>
      <h1>GifExpertApp</h1>
      <AddCategory onNewCategory={(value) => onAddCategory(value)} />
      {
        categories.map((category) => (
          <DigiGrid key={category} category={category} />
        ))
      }
    </>
  )
}