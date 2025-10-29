import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import argon2 from 'argon2';
import { User } from '@/schema/user.schema';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private async generateToken(id: string): Promise<string> {
    const payload = { id };
    return await this.jwtService.signAsync(payload);
  }

  async register(data: RegisterDto): Promise<void> {
    data.password = await argon2.hash(data.password);
    try {
      await this.userModel.create(data);
    } catch (error: unknown) {
      const CONFLICT_ERROR_CODE = 11000;
      const err = error as { code: number; keyValue: { username: string } };

      if (err?.code === CONFLICT_ERROR_CODE) {
        if (err.keyValue.username === data.username) {
          throw new ConflictException(
            `User with username '${data.username}' already taken. please try another username.`,
          );
        }
        throw new ConflictException(
          `User with email '${data.email}' already exists.`,
        );
      }
      throw error;
    }
  }

  async login(data: LoginDto): Promise<string> {
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await argon2.verify(user.password, data.password);
    if (isValidPassword) {
      return await this.generateToken(String(user._id));
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
