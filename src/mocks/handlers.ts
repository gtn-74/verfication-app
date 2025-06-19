const { http, HttpResponse } = require('msw');

const handlers = [
  // GET /api/hello
  http.get('/api/hello', () => {
    return HttpResponse.json({
      message: "Hello from MSW!",
      method: "GET",
      timestamp: new Date().toISOString(),
      query: {},
      body: {},
    });
  }),

  // GET /api/users
  http.get('/api/users', () => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    return HttpResponse.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    });
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as { name: string; email: string };
    
    if (!body.name || !body.email) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Name and email are required',
        },
        { status: 400 }
      );
    }

    const newUser = {
      id: 4,
      name: body.name,
      email: body.email,
    };

    return HttpResponse.json(
      {
        success: true,
        data: newUser,
        message: 'User created successfully',
      },
      { status: 201 }
    );
  }),

  // GET /api/users/[id]
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    const userId = parseInt(id as string, 10);

    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    const user = users.find(u => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: user,
      message: 'User retrieved successfully',
    });
  }),

  // PUT /api/users/[id]
  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const userId = parseInt(id as string, 10);
    const body = await request.json() as { name?: string; email?: string };

    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    const user = users.find(u => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    const updatedUser = {
      ...user,
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email }),
    };

    return HttpResponse.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  }),

  // DELETE /api/users/[id]
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const userId = parseInt(id as string, 10);

    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    const user = users.find(u => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  }),
];

module.exports = { handlers };