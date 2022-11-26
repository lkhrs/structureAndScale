// The files to bundle
let files = ["loot.js", "index.js", "treasure.js"];

// Create the bundle object
export default files.map(function (file) {
  return {
    input: `src/${file}`,
    output: {
      file: file,
      format: "iife",
    },
  };
});
