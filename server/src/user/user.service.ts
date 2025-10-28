import { User } from '@/schema/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getProfile(userId: string): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .lean()
      .select('-__v -password');

    if (user) return user;

    throw new UnauthorizedException('You are not authorized');
  }
}
