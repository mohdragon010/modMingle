const nextPlugin = require('@next/eslint-plugin-next');
const pluginReact = require('eslint-plugin-react');

module.exports = [
    {
        ignores: ['.next/**'],
    },
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            '@next/next': nextPlugin,
            react: pluginReact,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            ...pluginReact.configs.recommended.rules,
            'no-unused-vars': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
            'react/no-unknown-property': 'off',
        },
        settings: {
        react: {
            version: 'detect',
        },
    },
    languageOptions: {
            parser: require('@babel/eslint-parser'),
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-react'],
                },
            },
            globals: {
                React: 'readonly',
                JSX: 'readonly',
                browser: true,
                node: true,
            }
        }
    },
];
