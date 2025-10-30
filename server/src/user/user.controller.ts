import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@/common';
import { PostService } from '@/post/post.service';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('me')
  async handleGetProfile(
    @Req() req: { user: { id: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.getProfile(req.user.id);
    return res.json({ user });
  }

  @Get(':username/posts')
  async handleGetUserPosts(
    @Param('username') username: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { _id } = (await this.userService.getUserByUsername(
      username,
    )) as unknown as {
      _id: string;
    };
    const posts = await this.postService.getPostsByUser(String(_id));
    return res.json({ posts });
  }

  @Get(':username')
  async handleGetUser(
    @Param('username') username: string,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.getUserByUsername(username);
    return res.json({ user });
  }
}
