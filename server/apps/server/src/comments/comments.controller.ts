import { Comment } from '@libs/db/models/Comment.model';
import { Controller, Get, Post, Query, UseGuards, Body,Res } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose'
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('comments')
@ApiTags('用户评论')
export class CommentsController {
    //构造器函数 中用依赖注入的方法 注入schema模型
    constructor(@InjectModel(Comment) private readonly commentModel: ReturnModelType<typeof Comment>) { }

    @Get()
    async index(@Query('query') query: string) {
        const params = JSON.parse(query)
        // .where(params.where).setOptions(params);
        const res = await this.commentModel.find({ object: params.where.object }).populate('uid').setOptions(params)
        let data = []
        for (let i = 0; i < res.length; i++) {
            let res2 = await this.commentModel.find({ parentId: res[i]._id }).populate('uid').populate({ path: 'object', select: 'uid', populate: { path: 'uid', select: 'username' } })
            let com = {
                frist: res[i],
                two: []
            }
            com.two = res2
            data.push(com)
        }
        return {
            code: 1,
            data: data,
            msg: '操作成功'
        }

    }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '创建评论' })
    async create(@Body() dto, @CurrentUser() user) {
        dto.uid = user._id
        return await this.commentModel.create(dto);
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '用户删除评论' })
    async delete(@Body() dto, @CurrentUser() user) {
        // $or与查询  $and并且
        return await this.commentModel.deleteMany({ $or: [{ _id: dto.id }, { parentId: dto.id }] })
    }

    @Post('/delById')
    @ApiOperation({ summary: '管理员删除评论' })
    async delById(@Body() body,@Res() res) {
        try {
            const result = await this.commentModel.findByIdAndDelete(body._id)
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

    // 获取评论列表
    @Post('/list')
    @ApiOperation({ summary: '获取评论列表' })
    async list(@Body() dto, @CurrentUser() user,@Res() res) {
        try {
            const result = await this.commentModel.find()
            .populate('uid').populate('object').populate('parentId')
            .limit(dto.limit).skip(dto.limit*(dto.page-1)).lean();
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
}
