import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Post } from '@/schema/post.schema';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  private isValidId(id: string): boolean {
    if (isValidObjectId(id)) return true;
    throw new BadRequestException(`Invalid Post ID: ${id}`);
  }

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
      .select('-__v -updatedAt')
      .populate('createdBy', 'name username');
    return posts;
  }

  async getPostsByUser(userId: string): Promise<Post[]> {
    console.log(userId);
    const posts = this.postModel
      .find({ createdBy: userId })
      .lean()
      .select('-__v -updatedAt')
      .populate('createdBy', 'name username');
    return posts;
  }

  async getPost(postId: string): Promise<Post> {
    this.isValidId(postId);
    const post = await this.postModel
      .findById(postId)
      .lean()
      .select('-__v')
      .populate('createdBy', 'name');

    if (post) return post;

    throw new ForbiddenException(`Post with ID: ${postId} you can't access.`);
  }

  async updatePost(
    createdBy: string,
    postId: string,
    data: UpdatePostDto,
  ): Promise<Post> {
    this.isValidId(postId);
    const post = await this.postModel
      .findOneAndUpdate({ _id: postId, createdBy }, { ...data }, { new: true })
      .lean()
      .select('-__v');

    if (post) return post;

    throw new ForbiddenException(`Post with ID: ${postId} you can't update.`);
  }

  async deletePost(createdBy: string, postId: string): Promise<Post> {
    this.isValidId(postId);
    const post = await this.postModel
      .findOneAndDelete({ _id: postId, createdBy })
      .lean()
      .select('-__v')
      .populate('createdBy', 'name');

    if (post) return post;

    throw new ForbiddenException(`Post with ID: ${postId}, you can't delete.`);
  }
}
