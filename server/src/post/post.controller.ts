import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async handleCreatePost(
    @Req() req: { user: { id: string } },
    @Body() body: CreatePostDto,
    @Res() res: Response,
  ): Promise<Response> {
    const createdBy = req.user.id;
    const post = await this.postService.createPost(createdBy, body);
    return res.json({ post, message: 'Post created successfully' });
  }

  @Get()
  async handleGetPosts(@Res() res: Response): Promise<Response> {
    const posts = await this.postService.getPosts();
    return res.json({ posts });
  }
}
