import { createUser } from '../controller/user';

describe('createUser', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully. Check your email for verification.',
    });
  });
});
