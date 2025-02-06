/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = { transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    preset:"ts-jest",
    testEnvironment: 'node',
   
    verbose: true,
};
