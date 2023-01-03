import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SearchPaginationBase } from 'types/index.dto';
import { JwtAuthGuard } from 'middleware/jwtAuth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { BlogDeleteDto, BlogDto } from './index.dto';
import { State, StateDto } from 'decorator/state.decorator';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get('getBlogList')
  async getBlogList(@Query() query: SearchPaginationBase, @State() state: StateDto) {
    const data = await this.blogService.getBlogListByPage(query, state.id);
    return {
      ret: 0,
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('createBlog')
  async createBlog(@Body() body: BlogDto, @State() state: StateDto) {
    const { id } = await this.blogService.createBlog({ ...body, userId: state.id });
    return {
      ret: 0,
      msg: 'success',
      data: { id },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateBlog')
  async updateBlog(@Body() { id, ...body }: BlogDto, @State() state: StateDto) {
    await this.blogService.updateBlogById(id, state.id, body);
    return {
      ret: 0,
      msg: 'success',
      data: { id },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteBlog')
  async deleteBlog(@Body() body: BlogDeleteDto, @State() state: StateDto) {
    const result = await this.blogService.deleteBlogById(body.id, state.id);
    console.log(result);
    return {
      ret: 0,
      msg: 'success',
      data: { id: result.id },
    };
  }
}
