interface BaseResponse<T> {
  data: T;
}

interface ResponseError extends Response {
  payload: ServerError;
}

interface ServerError {
  statusCode: number;
  message: string;
}
