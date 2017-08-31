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
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "arrow-body-style": 0,
    "no-underscore-dangle": 0,
    "no-plusplus": 0,
    "guard-for-in": 0,
    "no-restricted-syntax": 0,
    "import/no-extraneous-dependencies": 0,
    "class-methods-use-this": 0
    "no-useless-concat": 0,
  }
};