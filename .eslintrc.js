module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "indent": ["error", 2],
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // edited follows
    "semi": ["error", "always"],
    "semi-spacing": ["error", { "after": true, "before": false }],
    "semi-style": ["error", "last"],
    "no-extra-semi": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",

    "quotes": ["error", "double", "avoid-escape"],
    "curly": "error",
    "guard-for-in": "error",
    "no-caller": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-script-url": "error",
    "no-multi-spaces": "error",
    "no-native-reassign": "error",
    "no-self-compare": "error",
    "no-useless-concat": "error",
    "yoda": ["error", "never", { "exceptRange": true }],

    "arrow-body-style": "off",//
    "arrow-parens": "off",//
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-duplicate-imports": "warn",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "off",//
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "rest-spread-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
  }
};
