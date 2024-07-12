import { Request, Response } from 'express';

export async function readUser(req: Request, res: Response) {
  const user = {
    name: 'Rinesh',
  };
  res.json({
    status: 200,
    data: user,
  });
}
