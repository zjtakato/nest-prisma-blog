import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SearchPaginationBase } from 'types/index.dto';
import { JwtAuthGuard } from 'middleware/jwtAuth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { BlogDto } from './index.dto';
import { State } from 'decorator/state.decorator';
import { User } from '@prisma/client';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get('getBlogList')
  async getBlogList(@Query() query: SearchPaginationBase) {
    const data = await this.blogService.getBlogListByPage(query);
    return {
      ret: 0,
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('createBlog')
  async createBlog(@Body() body: BlogDto, @State() state: User) {
    const { id } = await this.blogService.createBlog({ ...body, userId: state.id });
    return {
      ret: 0,
      msg: 'success',
      data: { id },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateBlog')
  async updateBlog(@Body() { id, ...body }: BlogDto, @State() state: User) {
    await this.blogService.updateBlogById(id, state.id, body);
    return {
      ret: 0,
      msg: 'success',
      data: { id },
    };
  }
}
