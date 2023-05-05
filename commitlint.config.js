module.exports = {
    "extends": ['@commitlint/config-conventional'],
        "rules": {
        "scope-enum": [2, "always", [
            "*",
            "screeb-eslint-config",
            "screeb-sdk-example",
            "screeb-typescript-config",
            "screeb-sdk-browser",
            "screeb-template-lib"
        ]],
        "scope-empty": [2, "never"],
        "scope-min-length": [2, "always", 1],
    }
}










