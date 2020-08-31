import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { UserDto } from 'src/dto/user.dto';

@Controller('users')
export class UserController {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  @Get()
  async index(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }

  @ApiOkResponse({
    type: UserResponse
  })
  @Get(':id')
  async show(@Param('id') id: number): Promise<User> {
    const user = await this.userRepo.findOneOrFail(id);
    return user;
  }

  @ApiCreatedResponse({
    type: UserResponse
  })
  @Post('/')
  async store(@Body() body: UserDto): Promise<User> {
    const user = this.userRepo.create(body);
    await this.userRepo.save(user);
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    await this.userRepo.findOneOrFail(id);
    this.userRepo.update({ id }, body)
    return this.userRepo.findOneOrFail(id)
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    await this.userRepo.delete(id)
  }
}
