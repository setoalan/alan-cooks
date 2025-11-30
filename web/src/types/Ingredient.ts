export type Ingredient = {
  id: string;
  name: string;
  slug: {
    current: string;
  };
  icon: string;
  vegetarian: boolean;
};

export type IngredientWithCount = Omit<Ingredient, 'vegetarian'> & {
  count: number;
};
