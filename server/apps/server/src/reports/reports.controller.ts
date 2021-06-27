import { Report } from '@libs/db/models/report.model';
import { Body, Controller, Post, UseGuards,Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('/api/reports')
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


    // 获取反馈列表
    @Post('/list')
    @ApiOperation({ summary: '获取反馈列表' })
    async list(@Body() dto, @CurrentUser() user,@Res() res) {
        try {
            const result = await this.reportModel.find({faultType: {$regex: dto.faultType}})
            .populate('uid').populate('object').limit(dto.limit)
            .skip(dto.limit*(dto.page-1)).lean();
            res.send({
                msg:'成功',
                code: 200,
                data: {
                    list:result,
                    count: result.length
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    @Post('/delete')
    @ApiOperation({ summary: '删除' })
    async delete(@Body() body,@Res() res) {
        try {
            const result = await this.reportModel.findByIdAndDelete(body._id)
            if(result){
                res.send({
                    msg: '完成',
                    code: 200,
                    data: result
                })
            }else {
                res.send({
                    msg: '失败',
                    code: 0,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    @Post('/check')
    @ApiOperation({ summary: '处理问题' })
    async check(@Body() body,@Res() res) {
        try {
            const result = await this.reportModel.findByIdAndUpdate(body._id,{status: body.status})
            if(result){
                res.send({
                    msg: '完成',
                    code: 200,
                    data: result
                })
            }else {
                res.send({
                    msg: '失败',
                    code: 0,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
