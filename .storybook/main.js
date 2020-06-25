const path = require('path');

module.exports = {
  stories: ['../src/**/*.story.tsx'],
  addons: [
    // '@storybook/preset-create-react-app',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json')
        }
      }
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-knobs',
      options: {
        timestamps: true
      }
    },
  ],
};
