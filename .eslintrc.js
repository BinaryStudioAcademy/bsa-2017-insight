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
    }],
    "react/prefer-stateless-function": 0,
    "arrow-body-style": ["error", "always"],
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "arrow-body-style": 0
  }
};