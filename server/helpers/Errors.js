class VisandError extends Error {
  constructor(message = 'Internal server error', errors, statusCode = 500) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export class AuthenticationError extends VisandError {
  constructor(message, errors) {
    super(message, errors, 401);
  }
}

export class DuplicationError extends VisandError {
  constructor(message, errors) {
    super(message, errors, 409);
  }
}

export class ValidationError extends VisandError {
  constructor(errors) {
    super('Some fields are failing validation(s)', errors, 400);
  }
}

export class NotFoundError extends VisandError {
  constructor(message) {
    super(message, undefined, 404);
  }
}

export default VisandError;
