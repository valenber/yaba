import { Injectable } from '@nestjs/common';

export interface User {
  email: string;
  password: string;
  id: string;
}

export type LoginUserDto = Pick<User, 'email' | 'password'>;

const usersDB: User[] = [
  {
    email: 'me@pm.com',
    password: 'mememe',
    id: 'abc123',
  },
];

@Injectable()
export class AppService {
  loginUser(user: LoginUserDto): string {
    const { email, password } = user;

    const dbUser = usersDB.find((dbUser) => dbUser.email === email);

    if (!dbUser) {
      throw Error('User not found');
    }

    if (dbUser.password !== password) {
      throw Error('Password does not match');
    }

    return JSON.stringify({
      email,
      status: 'JWT is coming soon',
    });
  }
}
