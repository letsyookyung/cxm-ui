const { addDecoratorsLegacy, disableEsLint, override } = require("customize-cra");
  
module.exports = override(disableEsLint(), addDecoratorsLegacy());