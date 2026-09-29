import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service.js';
import { Role } from '../user/entities/role.enum.js';
import { AuthService } from './auth.service.js';

vi.mock('bcryptjs', () => ({
  compare: vi.fn(),
  hash: vi.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: {
    findByEmail: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    setRefreshTokenHash: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    userService = {
      findByEmail: vi.fn(),
      findOne: vi.fn(),
      setRefreshTokenHash: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: { signAsync: vi.fn().mockResolvedValue('token') } },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: vi.fn().mockReturnValue('secret'),
            get: vi.fn((_key: string, fallback: string) => fallback),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns null when the user does not exist', async () => {
    userService.findByEmail.mockResolvedValue(null);

    await expect(service.validateUser('a@b.com', 'pass')).resolves.toBeNull();
  });

  it('returns the authenticated user when the password matches', async () => {
    userService.findByEmail.mockResolvedValue({
      id: 'uuid',
      name: 'John',
      email: 'john@doe.com',
      role: Role.User,
      password: 'hashed',
    });
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    await expect(service.validateUser('john@doe.com', 'pass')).resolves.toEqual({
      id: 'uuid',
      name: 'John',
      email: 'john@doe.com',
      role: Role.User,
    });
  });

  it('returns null when the password does not match', async () => {
    userService.findByEmail.mockResolvedValue({
      id: 'uuid',
      password: 'hashed',
    });
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    await expect(service.validateUser('john@doe.com', 'wrong')).resolves.toBeNull();
  });

  it('stores a hashed refresh token on login', async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed' as never);

    const tokens = await service.login({
      id: 'uuid',
      name: 'John',
      email: 'john@doe.com',
      role: Role.User,
    });

    expect(tokens).toEqual({ accessToken: 'token', refreshToken: 'token' });
    expect(userService.setRefreshTokenHash).toHaveBeenCalledWith('uuid', 'hashed');
  });

  it('rejects refresh when the stored token does not match', async () => {
    userService.findOne.mockResolvedValue({
      id: 'uuid',
      hashedRefreshToken: 'hashed',
    });
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    await expect(service.refreshTokens('uuid', 'token')).rejects.toThrow();
  });
});
