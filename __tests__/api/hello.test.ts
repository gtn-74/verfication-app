import { createMocks } from 'node-mocks-http';
import handler from '../../src/pages/api/hello';

describe('/api/hello', () => {
  it('should return hello message with GET method', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: 'test' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(data).toEqual({
      message: "Hello from API Route!",
      method: "GET",
      timestamp: expect.any(String),
      query: { name: 'test' },
      body: {},
    });
  });

  it('should return POST method info when called with POST', async () => {
    const testBody = { message: 'test message' };
    const { req, res } = createMocks({
      method: 'POST',
      body: testBody,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(data).toEqual({
      message: "Hello from API Route!",
      method: "POST",
      timestamp: expect.any(String),
      query: {},
      body: testBody,
    });
  });

  it('should handle timestamp format correctly', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    const data = JSON.parse(res._getData());
    const timestamp = new Date(data.timestamp);
    
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.toISOString()).toBe(data.timestamp);
  });
});