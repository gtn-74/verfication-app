// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  method: string;
  timestamp: string;
  query: any;
  body: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method, query, body } = req;
  
  res.status(200).json({ 
    message: "Hello from API Route!",
    method: method || 'GET',
    timestamp: new Date().toISOString(),
    query,
    body,
  });
}
