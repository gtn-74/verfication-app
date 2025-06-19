import '@testing-library/jest-dom'

// Setup MSW for API mocking
try {
  const { server } = require('./src/mocks/server')
  
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
} catch (error) {
  console.warn('MSW setup failed, API mocking will not be available:', error.message)
}