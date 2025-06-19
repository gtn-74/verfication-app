// Use require instead of import for better Node.js compatibility
const { setupServer } = require('msw/node');
const { handlers } = require('./handlers');

export const server = setupServer(...handlers);