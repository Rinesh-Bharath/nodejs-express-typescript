import { Status } from './status.enum';

export class CustomError extends Error {
  public status: Status;
  public data?: any;

  constructor(status: Status, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
