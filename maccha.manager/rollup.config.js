import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";
import babelrc from "babelrc-rollup";
import image from "@rollup/plugin-image";
import styles from "rollup-plugin-styles";

export default [
    {
        input: "./src/index.tsx",
        output: {
            format: "esm",
            dir: "./dist/", // 出力先ディレクトリトップ
            entryFileNames: "index.js",
            name: "Maccha"
        },
        globals: {
            "react": "React",
            "react-dom": "ReactDOM",
        },
        external: ["react", "react-dom"],
        plugins: [
            image(),
            nodeResolve({
                browser: true,
                resolveOnly: [
                    /^(?!react$)/,
                    /^(?!react-dom$)/,
                ],
            }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    declaration: true,
                    compilerOptions: {
                        target: "es5",
                        module: "ESNext",
                        strict: true,
                        jsx: "react-jsx",
                        importHelpers: true,
                        moduleResolution: "node",
                        experimentalDecorators: true,
                        emitDecoratorMetadata: true,
                        esModuleInterop: true,
                        allowSyntheticDefaultImports: true,
                        sourceMap: true,
                        baseUrl: ".",
                        downlevelIteration: true,
                        declaration: true,
                        declarationDir: "./dist",
                        lib: [
                            "esnext",
                            "dom",
                            "es2015"
                        ],
                        allowJs: true,
                        skipLibCheck: true,
                        forceConsistentCasingInFileNames: true,
                        noFallthroughCasesInSwitch: true,
                        resolveJsonModule: true,
                        isolatedModules: true,
                        noEmit: false
                    },
                }
            }),
            babel(
                babelrc({
                    addExternalHelpersPlugin: false,
                    exclude: /node_modules/,
                    runtimeHelpers: false
                })
            ),
            // styles(),
            scss({
                include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
                failOnError: true,
            }),
        ]
    },
];