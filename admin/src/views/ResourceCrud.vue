<template>
	<div>
		<avue-crud
		 v-if="option.column"
		 :data="data"
		 :option="option"
		 :page.sync="page"
		 @row-save="create"
		 @row-update="update"
		 @row-del="remove"
		 @on-load="changPage"
		 @sort-change="sortChange"
		 @search-change="searchChange"
		 ></avue-crud>
	</div>
</template>

<script lang="ts">
import {Vue,Component,Prop} from 'vue-property-decorator';
@Component({})
export default class ResourceList extends Vue {
	@Prop(String) resource !: string
	data = []
	option = {}
    page = {
		// pageSize: 2, 
		total: 1,  //必须有
		// "pageSizes": [
		//     2,
		//     5
		//   ],
	}
	//定义查询参数 条件
	query:any = {
		// sort: { _id: -1 }
		// limit: 5
	}
	//获取数据
	async fetch(){
		const res = await this.$http.get(`${this.resource}`,{
			params: {
				query: this.query
			}
		})
		this.page.total = res.data.total
		this.data = res.data.data
		
	}
	//搜索 where
	async searchChange(where,done){
		for(let k in where){
			const field = this.option.column.find(v => v.prop === k)
			if(field) {
				where[k] = { $regex: where[k]};
			}
		}
		this.query.where = where
		this.fetch()
		done();
	}
	//排序 params  
	async sortChange({prop,order}){
		console.log(prop)
		console.log([prop])
		if(!order){
			this.query.sort = null
		}else {
			this.query.sort  ={
				[prop]: order === 'ascending' ? 1 : -1
			}
			
		}
		this.fetch()
	}
	//获取字段
	async fetchOption(){
		const res = await this.$http.get(`${this.resource}/option`)
		this.option = res.data
		
	}
	//组件只带的分页方法 page
	async changPage({pageSize,currentPage}){
		this.query.page = currentPage;
		this.query.limit = pageSize;
		this.fetch()
	}
	async create(row,done,loading){
		
		await this.$http.post(`${this.resource}`,row)
		this.$message.success('创建成功')
		this.fetch()
		done()
		
	}
	async update(row,index,done,loading){
		// 由于这个框架在修改时会自动的添加$index 属性 导致后台无法修改成功
		const data = JSON.parse(JSON.stringify(row))
		delete data.$index
		await this.$http.put(`${this.resource}/${row._id}`,data)
		this.$message.success('编辑成功')
		this.fetch()
		done()
		
	}
	async remove(row){
		//取消会报错 所以我们捕获一下 让他不报错直接return
		try {
			await this.$confirm('是否确认删除')
		}catch(e) {
			return
		}
		
		const res = await this.$http.delete(`${this.resource}/${row._id}`)
		this.$message.success('删除成功')
		this.fetch()
	}
	created(){
		this.fetch()
		this.fetchOption()
	}
}
</script>

<style>
	.avue-upload__avatar {
		 height: auto !important;
	}
</style>
