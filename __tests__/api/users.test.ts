import { createMocks } from 'node-mocks-http';
import usersHandler from '../../src/pages/api/users';
import usersIdHandler from '../../src/pages/api/users/[id]';

describe('/api/users', () => {
  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: true,
        data: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        ],
        message: 'Users retrieved successfully',
      });
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const { req, res } = createMocks({
        method: 'POST',
        body: userData,
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(201);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: true,
        data: {
          id: 4,
          name: 'Test User',
          email: 'test@example.com',
        },
        message: 'User created successfully',
      });
    });

    it('should return 400 when name is missing', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { email: 'test@example.com' },
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: false,
        message: 'Name and email are required',
      });
    });

    it('should return 400 when email is missing', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { name: 'Test User' },
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: false,
        message: 'Name and email are required',
      });
    });
  });

  describe('Unsupported methods', () => {
    it('should return 405 for PUT method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(405);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: false,
        message: 'Method PUT Not Allowed',
      });
    });
  });
});

describe('/api/users/[id]', () => {
  describe('GET /api/users/[id]', () => {
    it('should return user by id', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: '1' },
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: true,
        data: { id: 1, name: 'John Doe', email: 'john@example.com' },
        message: 'User retrieved successfully',
      });
    });

    it('should return 404 for non-existent user', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: '999' },
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: false,
        message: 'User not found',
      });
    });
  });

  describe('PUT /api/users/[id]', () => {
    it('should update user by id', async () => {
      const updateData = { name: 'Updated Name', email: 'updated@example.com' };
      const { req, res } = createMocks({
        method: 'PUT',
        query: { id: '1' },
        body: updateData,
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: true,
        data: { id: 1, name: 'Updated Name', email: 'updated@example.com' },
        message: 'User updated successfully',
      });
    });

    it('should update user partially', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        query: { id: '2' },
        body: { name: 'Only Name Updated' },
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      const data = JSON.parse(res._getData());
      expect(data.data).toEqual({
        id: 2,
        name: 'Only Name Updated',
        email: 'jane@example.com',
      });
    });

    it('should return 404 when updating non-existent user', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        query: { id: '999' },
        body: { name: 'Test' },
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: false,
        message: 'User not found',
      });
    });
  });

  describe('DELETE /api/users/[id]', () => {
    it('should delete user by id', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: { id: '1' },
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: true,
        message: 'User deleted successfully',
      });
    });

    it('should return 404 when deleting non-existent user', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: { id: '999' },
      });

      await usersIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
      
      const data = JSON.parse(res._getData());
      expect(data).toEqual({
        success: false,
        message: 'User not found',
      });
    });
  });
});