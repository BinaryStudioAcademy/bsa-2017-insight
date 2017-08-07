module.exports = {
  extends: "airbnb",
  env: {
    "browser": true,
    "node": true
  },
  rules: {
    'linebreak-style': 0,
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }]
  }
};