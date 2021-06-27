import { History } from '@libs/db/models/history.model';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('/api/history')
@ApiTags('历史记录')
export class HistoryController {
    constructor(@InjectModel(History) private readonly historyModel: ReturnModelType<typeof History>) { }
    @Post('/create')
    @ApiOperation({ summary: '创建记录' })
    async create(@Body() dto, @CurrentUser() user) {
        dto.uid = user._id
        const res = await this.historyModel.findOne({ object: dto.object, user: user._id })
        if (res) {
            return await this.historyModel.updateOne({ object: dto.object, user: user._id }, dto)
        } else {
            return await this.historyModel.create(dto);
        }
    }


    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '删除记录' })
    async deleteOne(@Body() dto, @CurrentUser() user) {
        dto.uid = user._id
        if (dto.object) {
            return await this.historyModel.deleteOne({ object: dto.object, user: user._id });
        } else {
            return await this.historyModel.deleteMany({ user: user._id });
        }
    }

    @Get('/find')
    // @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '查找' })
    async findByDate(@Body() dto, @CurrentUser() user) {
        dto.uid = user._id
        const date: Date = new Date()
        let y: string | number = date.getFullYear();
        let m: (string | number) = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d: (string | number) = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let formatDate: string = `${y}-${m}-${d}`
        console.log(formatDate)
        const res = await this.historyModel.find({
            createdAt: {
                "$gte": date,
                "$lte": new Date()
            }
        }).limit(10).sort('createdAt');
    }
}

var formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}; 