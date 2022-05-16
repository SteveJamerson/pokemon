const StyleDictionary = require("style-dictionary");

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const platformsCSS = {
   transforms: [
      "attribute/cti",
      "name/cti/kebab",
      "time/seconds",
      "content/icon",
      "size/rem",
      "color/hex8",
   ],
   buildPath: "./src/styles/tokens/",
   prefix: "token",
};

const formatterMode = (type, name) => {
   return Object.assign(
      {},
      {
         name: `${type}/${name}`,
         formatter: function ({ dictionary, file, options }) {
            const { outputReferences } = options;
            if (type === "css") {
               return (
                  fileHeader({ file }) +
                  ":root[data-theme='" +
                  name +
                  "'] {\n" +
                  formattedVariables({
                     format: type,
                     dictionary,
                     outputReferences,
                  }) +
                  "\n}\n"
               );
            } else if (type === "scss") {
               return dictionary.allTokens
                  .map((token) => `$${name}-${token.name}: ${token.value}`)
                  .join(";\n");
            } else if (type === "ts") {
               let output = "";
               dictionary.allTokens.forEach((token) => {
                  const { path, original } = token;
                  const [, ..._path] = path;
                  const constant = _path.reduce((acc, str, index) => {
                     const _str = str.charAt(0).toUpperCase() + str.slice(1);
                     return acc.concat(_str);
                  }, name);

                  output += `export const ${constant} = \`${original.value}\`;\n`;
               });
               return output;
            }
         },
      }
   );
};

StyleDictionary.registerFormat(formatterMode("css", "dark"));
StyleDictionary.registerFormat(formatterMode("css", "light"));

const defaultStyleDictionary = StyleDictionary.extend({
   source: ["./src/styles/properties/base/*.json"],
   platforms: {
      css: {
         ...platformsCSS,
         files: [
            {
               destination: "tokens.css",
               format: "css/variables",
               options: {
                  outputReferences: true,
               },
            },
         ],
      },
   },
});
defaultStyleDictionary.cleanAllPlatforms();
defaultStyleDictionary.buildAllPlatforms();

const lightStyleDictionary = StyleDictionary.extend({
   source: ["./src/styles/properties/mode/light/*.json"],
   platforms: {
      css: {
         ...platformsCSS,
         files: [
            {
               destination: "light.css",
               format: "css/light",
               options: {
                  outputReferences: true,
               },
            },
         ],
      },
   },
});
lightStyleDictionary.cleanAllPlatforms();
lightStyleDictionary.buildAllPlatforms();

const darkStyleDictionary = StyleDictionary.extend({
   source: ["./src/styles/properties/mode/dark/*.json"],
   platforms: {
      css: {
         ...platformsCSS,
         files: [
            {
               destination: "dark.css",
               format: "css/dark",
               options: {
                  outputReferences: true,
               },
            },
         ],
      },
   },
});
darkStyleDictionary.cleanAllPlatforms();
darkStyleDictionary.buildAllPlatforms();
