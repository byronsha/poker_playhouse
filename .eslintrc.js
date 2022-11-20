module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    },
    "extends": ['plugin:react/recommended']
}