export default {
  name: 'ingredient',
  type: 'document',
  title: 'Ingredients',
  icon: () => `🛒`,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'vegetarian',
      type: 'boolean',
      title: 'Vegetarian',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ title, vegetarian }) => ({
      title: `${title} ${vegetarian ? '🌱' : ''}`,
    }),
  },
};
