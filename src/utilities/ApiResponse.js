class ApoResponse {
  constructor(statusCode, message="Success", data) {
    this.statusCode = statusCode;
    this.succes = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}