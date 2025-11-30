import type { Ingredient } from './Ingredient';

export type Recipe = {
  id: string;
  name: string;
  slug: {
    current: string;
  };
  date: Date;
  url: string;
  image: {
    asset: {
      gatsbyImageData: string;
    };
  };
  rating: number;
  favorite: boolean;
  challenge: string;
  challenge_url: string;
  ingredients: Ingredient[];
};
