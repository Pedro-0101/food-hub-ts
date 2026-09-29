import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity.js';
import { UserService } from './user.service.js';

vi.mock('bcryptjs', () => ({
  hash: vi.fn().mockResolvedValue('hashed'),
  compare: vi.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let repository: {
    create: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
    find: ReturnType<typeof vi.fn>;
    findOneBy: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      create: vi.fn((data) => data),
      save: vi.fn((user) => Promise.resolve(user)),
      find: vi.fn(),
      findOneBy: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repository as unknown as Repository<User>,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hashes the password before saving', async () => {
    await service.create({
      name: 'John',
      email: 'john@doe.com',
      password: 'plainPassword',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'hashed' }),
    );
  });

  it('throws ConflictException when the e-mail is duplicated', async () => {
    const error = new QueryFailedError('insert', [], new Error('duplicate'));
    (error as { driverError: { code: string } }).driverError = { code: '23505' };
    repository.save.mockRejectedValue(error);

    await expect(
      service.create({ name: 'John', email: 'john@doe.com', password: 'pass' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
