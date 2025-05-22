const inquirer = jest.createMockFromModule('inquirer');

// inquirer.prompt is a function that returns a Promise
inquirer.prompt = jest.fn();

module.exports = inquirer;
