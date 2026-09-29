import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import { Exclude } from 'class-transformer';

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
}
