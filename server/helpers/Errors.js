/**
 * @fileOverview Contains the various Errors used on the server
 *
 * @author Chima Chukwuemeka
*/

/**
 * The Base Visand Error class
 * All other Error classes extends this Error class
 * @class
 *
 * @property {object} signup The object containing the errors, usually validations
 * @property {number} statusCode The HTTP error status code
*/
class VisandError extends Error {
  /**
   * @constructor
   *
   * @param {string} message The human readable error message
   * @param {object} errors The object containing the failing errors as properties
   * @param {number} statusCode The HTTP error status code
  */
  constructor(message = 'Internal server error', errors, statusCode = 500) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

/**
 * The AuthenticationError Error class
 * @class
*/
export class AuthenticationError extends VisandError {
  /**
   * @constructor
   *
   * @param {string} message The human readable error message
   * @param {object} errors The object containing the failing errors as properties
  */
  constructor(message, errors) {
    super(message, errors, 401);
  }
}

/**
 * The DuplicationError Error class
 * @class
*/
export class DuplicationError extends VisandError {
  /**
   * @constructor
   *
   * @param {string} message The human readable error message
   * @param {object} errors The object containing the failing errors as properties
  */
  constructor(message, errors) {
    super(message, errors, 409);
  }
}

/**
 * The ValidationError Error class
 * @class
 *
 * @property {object} signup The object containing the errors, usually validations
 * @property {number} statusCode The HTTP error status code
*/
export class ValidationError extends VisandError {
  /**
   * @constructor
   *
   * @param {object} errors The object containing the failing validation errors as properties
  */
  constructor(errors) {
    super('Some fields are failing validation(s)', errors, 400);
  }
}

/**
 * The NotFoundError Error class
 * @class
 *
 * @property {object} signup The object containing the errors, usually validations
 * @property {number} statusCode The HTTP error status code
*/
export class NotFoundError extends VisandError {
  /**
   * @constructor
   *
   * @param {string} message The human readable error message
  */
  constructor(message) {
    super(message, undefined, 404);
  }
}

export default VisandError;
