import { Report } from '@libs/db/models/report.model';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
@Controller('reports')
@ApiTags('问题上报')
export class ReportsController {
    constructor(@InjectModel(Report) private readonly reportModel: ReturnModelType<typeof Report>) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '创建问题' })
    async create(@Body() dto, @CurrentUser() user) {
        dto.uid = user._id
        return await this.reportModel.create(dto);
    }
}
