module.exports = {
    "extends": ['@commitlint/config-conventional'],
        "rules": {
        "scope-enum": [2, "always", [
            "*",
            "admin-app",
            "bento-colors-lib",
            "bento-shadows-lib",
            "bento-typography-lib",
            "components-lib",
            "eslint-config",
            "eslint-config-react",
            "template-lib",
            "typescript-config",
        ]],
        "scope-empty": [2, "never"],
        "scope-min-length": [2, "always", 1],
    }
}










