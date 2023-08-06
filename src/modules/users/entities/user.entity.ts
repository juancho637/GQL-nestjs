import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ValidRoles } from '../../../modules/auth/enums/valid-roles.enum';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ name: 'full_name' })
  @Field(() => String)
  fullName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: [ValidRoles.user],
  })
  @Field(() => [String])
  roles: string[];

  @Column({ name: 'is_active', type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;
}
