import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SearchPaginationBase } from 'types/index.dto';
import { JwtAuthGuard } from 'middleware/jwtAuth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { BlogSwaggerGeneralDto } from './index.dto';
import { State, StateDto } from 'decorator/state.decorator';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
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
  async createBlog(@Body() body: BlogSwaggerGeneralDto, @State() state: StateDto) {
    const { id } = await this.blogService.createBlog({ ...body, userId: state.id });
    return {
      ret: 0,
      msg: 'success',
      data: { id },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateBlog')
  async updateBlog(@Body() { id, ...body }: BlogSwaggerGeneralDto, @State() state: StateDto) {
    await this.blogService.updateBlogById(id, state.id, body);
    return {
      ret: 0,
      msg: 'success',
      data: { id },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteBlog')
  async deleteBlog(@Body() body: BlogSwaggerGeneralDto, @State() state: StateDto) {
    const result = await this.blogService.deleteBlogById(body.id, state.id);
    console.log(result);
    return {
      ret: 0,
      msg: 'success',
      data: { id: result.id },
    };
  }
}
