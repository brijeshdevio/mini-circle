import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto';

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

  @Get(':postId')
  async handleGetPost(
    @Param('postId') postId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const post = await this.postService.getPost(postId);
    return res.json({ post });
  }

  @Put(':postId')
  async handleUpdatePost(
    @Req() req: { user: { id: string } },
    @Body() body: UpdatePostDto,
    @Param('postId') postId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const createdBy = req.user.id;
    const post = await this.postService.updatePost(createdBy, postId, body);
    return res.json({ post, message: 'Post updated successfully' });
  }

  @Delete(':postId')
  async handleDeletePost(
    @Req() req: { user: { id: string } },
    @Param('postId') postId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const createdBy = req.user.id;
    const post = await this.postService.deletePost(createdBy, postId);
    return res.json({ post, message: 'Post deleted successfully' });
  }
}
