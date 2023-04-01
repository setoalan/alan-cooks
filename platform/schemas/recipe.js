export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  icon: () => `🍽`,
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
        dateFormat: 'M/D/YYYY',
        timeFormat: 'HH:mm:ss',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      type: 'url',
      title: 'Recipe Link',
      validation: Rule => Rule.required(),
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
      validation: Rule => Rule.required().min(1).max(5),
    },
    {
      name: 'favorite',
      type: 'boolean',
      title: 'Favorite',
      initialValue: false,
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
      title: 'Challenge Link',
    },
    // {
    //   name: 'ingredients',
    //   type: 'array',
    //   title: 'Ingredients',
    //   of: [{ type: 'reference', to: [{ type: 'ingredient' }] }],
    //   validation: Rule => Rule.required(),
    // },
  ],
};
