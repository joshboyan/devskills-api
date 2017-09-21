module.exports = {
  "parserOptions": {
    "ecmaVersion": "6",
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "keyword-spacing": ["error", {
			"overrides": {
				"if": { "after": false },
				"for": { "after": false },
				"while": { "after": false }
			}
		}],
    "space-before-blocks": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "no-multiple-empty-lines": "warn",
    "no-var": "warn",
    "prefer-const": "warn",
    "no-console": "off"
  }
};
