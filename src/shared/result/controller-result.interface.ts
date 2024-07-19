export interface ControllerResult<T> {
  status: number;
  message: string;
  data?: T;
}
