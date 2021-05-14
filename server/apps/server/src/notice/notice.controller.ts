import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { Notify } from '@libs/db/models/notiFy.model';
import { AuthGuard } from '@nestjs/passport';
@Controller('notice')
@ApiTags('通知')
export class NoticeController {
    constructor(@InjectModel(Notify) private readonly model: ReturnModelType<typeof Notify>) { }

    @Post('/add')
    @ApiOperation({ summary: '发布通知' })
    async create(@Body() dto,@Res() res) {
       res.send({
           code:200,
           msg:'成功',
           data: await this.model.create(dto)
       })
    }


    // 获取列表
    @Post('/list')
    @ApiOperation({ summary: '获取列表' })
    async list(@Body() dto,@Res() res) {
        try {
            const result = await this.model.find({$or: [{title: {$regex: dto.title}}]})
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

    // 获取列表
    @Post('/msgList')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '系统通知列表' })
    async msgList(@Body() dto,@Res() res) {
        try {
            const result = await this.model.find({type:dto.type}).lean();
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
            const result = await this.model.findByIdAndDelete(body._id)
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


