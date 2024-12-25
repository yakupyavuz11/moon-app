module.exports = function (api) {
  api.cache(true); // Bu, babel cache'inin etkinleştirilmesi için
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],  // Expo'yu ve nativewind'i kullanma
      "nativewind/babel", // nativewind için Babel preset'i
    ],
    plugins: [
      "react-native-reanimated/plugin", // React Native Reanimated plugin
      "@babel/plugin-proposal-export-namespace-from", // Babel plugin'i
    ],
  };
};
