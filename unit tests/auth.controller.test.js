const AuthController = require('../controllers/authControllers');
const AuthServices = require('../services/authServices');
const ApiError = require('../exeptions/api-errors');

jest.mock('../services/authServices');

describe('AuthController', () => {
  describe('register', () => {
    test('should return user data upon successful registration', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          firstname: 'Test',
          lastname: 'User',
          password: 'testpassword'
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      AuthServices.registration.mockResolvedValueOnce({ username: 'testuser', email: 'test@example.com' });

      await AuthController.register(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com' });
      expect(next).not.toHaveBeenCalled();
    });

    class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

test('should handle validation errors', async () => {
  const req = {
    body: {}
  };
  const res = {
    json: jest.fn()
  };
  const next = jest.fn();

  const validationError = new ValidationError('Validation error');
  validationError.array = jest.fn().mockReturnValue(['Error 1', 'Error 2']);

  AuthServices.registration.mockRejectedValueOnce(validationError);

  await AuthController.register(req, res, next);

  expect(next).toHaveBeenCalledWith(validationError);
});

    test('should handle other errors', async () => {
      const req = {
        body: {}
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      const error = new Error('Some error');
      AuthServices.registration.mockRejectedValueOnce(error);

      await AuthController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    test('should return user data upon successful login', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      };
      const res = {
        json: jest.fn(),
        cookie: jest.fn()
      };
      const next = jest.fn();

      const userData = { username: 'testuser', email: 'test@example.com', refreshToken: 'someToken' };
      AuthServices.login.mockResolvedValueOnce(userData);

      await AuthController.login(req, res, next);

      expect(res.json).toHaveBeenCalledWith(userData);
      expect(res.cookie).toHaveBeenCalledWith('refreshToken', 'someToken', expect.any(Object));
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    test('should return token upon successful logout', async () => {
      const req = {
        cookies: {
          refreshToken: 'someToken'
        }
      };
      const res = {
        json: jest.fn(),
        clearCookie: jest.fn()
      };
      const next = jest.fn();

      const tokenData = { message: 'Logged out successfully' };
      AuthServices.logout.mockResolvedValueOnce(tokenData);

      await AuthController.logout(req, res, next);

      expect(res.json).toHaveBeenCalledWith(tokenData);
      expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    test('should return user data upon successful token refresh', async () => {
      const req = {
        cookies: {
          refreshToken: 'someToken'
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      const userData = { username: 'testuser', email: 'test@example.com', refreshToken: 'newToken' };
      AuthServices.refresh.mockResolvedValueOnce(userData);

      await AuthController.refreshToken(req, res, next);

      expect(res.json).toHaveBeenCalledWith(userData);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
