module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/step-definitions/**/*.ts'],
    format: ['progress'],
    publishQuiet: true,
  },
};