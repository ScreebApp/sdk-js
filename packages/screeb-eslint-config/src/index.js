module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true // Defines things like process.env when generating through node
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "prettier"
    ],
    overrides: [
        {
            files: [ "**/*.ts?(x)" ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                ecmaVersion: 2018,
                sourceType: "module"
            },
            plugins: [
                "@typescript-eslint"
            ],
            // You can add Typescript specific rules here.
            // If you are adding the typescript variant of a rule which is there in the javascript
            // ruleset, disable the JS one.
            rules: {
                "@typescript-eslint/no-array-constructor": "warn",
                "no-array-constructor": "off"
            }
        }
    ],

    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "prettier",
        "import" // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
    ],
    root: false, // For configuration cascading.
    rules: {
        "prettier/prettier": 2,
        "eol-last": "error",
        "import/order": [
            "warn",
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: "asc"
                },
                groups: [
                    "builtin",
                    "external",
                    "index",
                    "sibling",
                    "parent",
                    "internal"
                ]
            }
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "max-len": [
            "warn",
            {
                code: 120
            }
        ],
        "no-console": "warn",
        "no-duplicate-imports": "warn",
        "no-unused-vars": "error",
        "object-curly-spacing": [
            "warn",
            "always"
        ],
        quotes: [
            "warn",
            "double"
        ],
        semi: "warn",
        "sort-imports": [
            "warn",
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false
            }
        ],
        "sort-keys": [
            "warn",
            "asc",
            {
                caseSensitive: true,
                minKeys: 2,
                natural: false
            }
        ]
    }
};