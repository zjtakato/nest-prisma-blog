import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { LibService } from 'core/lib/lib.service';
import { JwtAuthGuard } from 'middleware/jwtAuth.guard';
import { SystemService } from './system.service';

@ApiTags('system')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService, private readonly libService: LibService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getMenuList')
  async getMenuList() {
    const flatMenus = await this.systemService.getMenuList();
    const treeMenus = this.libService.flatToNest<Prisma.MenuCreateInput>(flatMenus);
    return {
      ret: 0,
      data: treeMenus,
    };
  }
}
