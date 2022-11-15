module.exports = {
	env: {
		browser: true, // Browser global variables like `window` etc.
		commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
		es6: true, // Enable all ECMAScript 6 features except for modules.
		node: true, // Defines things like process.env when generating through node
		jest: true // Jest global variables like `it` etc.
	},
	extends: ['react-app', 'react-app/jest'], // Default create-react-app eslint config
	// parser: "babel-eslint", // Uses babel-eslint transforms.
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
		/* 
        es2021 - adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
        es2022 - adds all ECMAScript 2022 globals and automatically sets the ecmaVersion parser option to 13.
      */
		sourceType: 'module' // Allows for the use of imports
	},
	// plugins: [
	// 	'import' // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
	// ],
	root: true, // For configuration cascading.
	settings: {
		react: {
			version: 'detect' // Detect react version
		}
	},
	rules: {
		indent: [
			'warn',
			'tab',
			{ SwitchCase: 1, ignoredNodes: ['ConditionalExpression', 'FunctionExpression', 'ArrayExpression'] }
		],
		quotes: ['warn', 'single'],
		semi: ['error', 'never'],
		'no-unused-vars': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'no-empty-pattern': 'off',
		'import/no-anonymous-default-export': 'off',
		'default-case': 'off',
		eqeqeq: 'off',
		'no-useless-escape': 'off',
		'no-fallthrough': 'off',
		'no-new-func': 'off',
		'jsx-a11y/alt-text': 'off',
		'array-callback-return': 'off',
		'react-hooks/rules-of-hooks': 'off',
		'no-unused-expressions': 'off',
		'no-useless-concat': 'off'
	}
}
