import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import { Role } from './role.enum.js';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ description: 'ID (UUID) do usuário', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ description: 'E-mail único do usuário', example: 'john@doe.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (nunca retornada nas respostas)',
    writeOnly: true,
  })
  @Column({ select: false })
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Papel do usuário no sistema',
    enum: Role,
    default: Role.User,
  })
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Exclude()
  @Column({ name: 'hashed_refresh_token', type: 'varchar', nullable: true })
  hashedRefreshToken: string | null;
}
