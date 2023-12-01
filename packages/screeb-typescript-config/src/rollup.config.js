import typescript from '@rollup/plugin-typescript';

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.es.js",
            format: "es"
        }, {
            file: "dist/index.cjs.js",
            format: "cjs"
        },
    ],
    plugins: [typescript({
        tsconfig: './tsconfig.json'
    })]
};