const common = {
  requireModule: [],
  require: ['features/support/*.js', 'features/step_definitions/*.js'],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true
};

module.exports = {
  default: {
    ...common,
    worldParameters: {
      headless: true
    }
  },
  local: {
    ...common,
    worldParameters: {
      headless: false
    }
  }
};