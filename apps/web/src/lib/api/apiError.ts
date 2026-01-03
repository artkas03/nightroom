export class ApiError extends Error {
  status: number;
  body: any;

  constructor(message: string, status: number, body: string) {
    super(message);

    this.name = "ApiError";
    this.body = body;
    this.status = status;
  };
}