export class CustomError extends Error {
  response?: any;

  constructor(message?: string, response?: any) {
    super(message);
    this.response = response;
  }
}
