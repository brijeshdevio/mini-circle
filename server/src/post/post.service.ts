import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '@/schema/post.schema';
import { CreatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async createPost(createdBy: string, data: CreatePostDto): Promise<Post> {
    const post = await this.postModel.create({
      content: data.content,
      createdBy,
    });
    return post.toJSON();
  }

  async getPosts(): Promise<Post[]> {
    const posts = this.postModel
      .find()
      .lean()
      .select('-__v')
      .populate('createdBy', 'name');
    return posts;
  }
}
