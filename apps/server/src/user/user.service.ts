import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [{ id: 1, username: 'alice', name: 'Alice', password: 'secret' }, { id: 2, username: 'bob', name: 'Bob', password: 'secret' }];

  async findByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }

  findAll() {
    return this.users;
  }
}
