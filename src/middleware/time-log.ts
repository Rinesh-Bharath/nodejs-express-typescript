import { NextFunction, Request, Response } from 'express';

export function timeLog(req: Request, res: Response, next: NextFunction): void {
  console.log('Time: ', new Date().toISOString());
  next();
}
