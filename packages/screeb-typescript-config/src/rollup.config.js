import typescript from '@rollup/plugin-typescript';

export default {
    input: "src/index.ts",
    output: [{
        file: "dist/es/index.js",
        format: "es"
    }, ],
    plugins: [typescript({
        tsconfig: './tsconfig.json'
    })]
};