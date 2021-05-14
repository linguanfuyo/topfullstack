import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '@libs/db/models/article.model';
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
    constructor(@InjectModel(Article) private readonly model: ReturnModelType<typeof Article>) { }

    @Post('/add')
    @ApiOperation({ summary: '添加' })
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
            const result = await this.model.find().limit(dto.limit)
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
    @Post('/info')
    @ApiOperation({ summary: '获取详情' })
    async info(@Body() dto,@Res() res) {
        try {
            const result = await this.model.findOne({_id: dto._id})
            res.send({
                msg:'成功',
                code: 200,
                data: result
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    @Post('/edit')
    @ApiOperation({ summary: '更新' })
    async check(@Body() body,@Res() res) {
        try {
            const result = await this.model.findByIdAndUpdate(body._id,{
                content: body.content,
                title: body.title
            })
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
