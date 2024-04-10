export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipes',
  icon: () => `📖`,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Date',
      options: {
        dateFormat: 'MM/DD/YYYY',
        timeFormat: 'HH:mm:ss',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'Recipe URL',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required().min(1).max(5),
    },
    {
      name: 'favorite',
      type: 'boolean',
      title: 'Favorite',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'challenge',
      type: 'string',
      title: 'Challenge',
    },
    {
      name: 'challenge_url',
      type: 'url',
      title: 'Challenge URL',
    },
    {
      name: 'ingredients',
      type: 'array',
      title: 'Ingredients',
      of: [{ type: 'reference', to: [{ type: 'ingredient' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      ingredient0: 'ingredients.0.name',
      ingredient1: 'ingredients.1.name',
      ingredient2: 'ingredients.2.name',
      ingredient3: 'ingredients.3.name',
      ingredient4: 'ingredients.4.name',
    },
    prepare: ({ title, media, ...ingredients }) => ({
      title,
      media,
      subtitle: Object.values(ingredients).filter(Boolean).join(', ').toLowerCase(),
    }),
  },
};
