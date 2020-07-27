import { Controller, Get, Post, Query, UseGuards, Body } from '@nestjs/common';
import { Action } from '@libs/db/models/Action.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose'
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('actions')
@ApiTags('用户操作')
export class ActionsController {
    //构造器函数 中用依赖注入的方法 注入schema模型
    constructor(@InjectModel(Action) private readonly actionModel: ReturnModelType<typeof Action>) { }
    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '获取课程收藏状态' })
    //通过jwt策略获取当前用户的信息 传递给user 通过获取的user._id 来查取当前用户的操作
    async getStatus(@Query() dto, @CurrentUser() user) {
        dto.user = user._id
        const count = await this.actionModel.countDocuments(dto)
        return { status: count > 0 }
    }
    @Post('toggle')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '切换课程收藏状态' })
    async toggle(@Body() dto, @CurrentUser() user) {
        dto.user = user._id
        //先判断是否已经收藏 已收藏则删除 未收藏则插入

        const res = await this.getStatus(dto, user)
        console.log(res.status)
        if (res.status) {
            await this.actionModel.deleteMany(dto)
        } else {
            await this.actionModel.create(dto)
        }

        return {
            status: !res.status
        }
        //重新查一遍收藏状态
        // return await this.getStatus(dto, user)
    }
}
