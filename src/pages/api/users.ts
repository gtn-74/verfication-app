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
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({
        success: true,
        data: users,
        message: 'Users retrieved successfully',
      });
      break;
    
    case 'POST':
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Name and email are required',
        });
      }

      const newUser: User = {
        id: users.length + 1,
        name,
        email,
      };
      
      users.push(newUser);
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully',
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        message: `Method ${method} Not Allowed`,
      });
      break;
  }
}