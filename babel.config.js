module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'], //babel-preset-expo
    plugins: [
      // ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
  
  
      // Below plugin is unable to handle some of our arrow-functions
      //  and results in "Unknown" error after the app is launched
      //    ['@babel/plugin-transform-arrow-functions', { spec: true }]
    ]
  };
};
