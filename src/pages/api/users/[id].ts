import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  const userId = parseInt(id as string, 10);
  const userIndex = users.findIndex(user => user.id === userId);
  const user = users[userIndex];

  switch (method) {
    case 'GET':
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      
      res.status(200).json({
        success: true,
        data: user,
        message: 'User retrieved successfully',
      });
      break;

    case 'PUT':
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const { name, email } = req.body;
      
      if (name) user.name = name;
      if (email) user.email = email;
      
      users[userIndex] = user;
      
      res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
      break;

    case 'DELETE':
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      
      users.splice(userIndex, 1);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        message: `Method ${method} Not Allowed`,
      });
      break;
  }
}