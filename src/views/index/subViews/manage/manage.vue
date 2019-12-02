<template>
  <div class="container">
    <div class="menubar">
      <div class="function">
        <el-button size="mini"
                   v-if="current === 2"
                   @click="handleBack">返回</el-button>
      </div>
      <div class="sort">
        <el-select v-model="sortBy"
                   class="sortBy"
                   size="mini"
                   @change="handleSortByChange">
          <el-option v-for="item in sortByOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sortWay"
                   class="sortWay"
                   size="mini"
                   @change="handleSortWayChange">
          <el-option v-for="item in sortWayOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <el-table v-loading="isFetching"
              v-if="current === 1"
              :data="articleList"
              style="width: 100%">
      <el-table-column prop="title"
                       label="标题">
      </el-table-column>
      <el-table-column prop="author"
                       label="作者">
      </el-table-column>
      <el-table-column prop="category"
                       label="类别">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="发布时间">
      </el-table-column>
      <el-table-column prop="update_time"
                       label="最近更改">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="updateArticle(scope.row.id)"
                     size="small">编辑</el-button>
          <el-button type="text"
                     @click="handleCommentManage(scope.row.id)"
                     size="small">管理评论</el-button>
          <el-button type="text"
                     style="color:red"
                     @click="deleteArticle(scope.row.id)"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination"
         v-if="current === 1">
      <el-pagination 
                     :total="total"
                     :page-size="limit"
                     layout="prev, pager, next"
                     @current-change="pageChange">
      </el-pagination>
    </div>
    <el-table v-loading="isFetching"
              v-if="current === 2"
              :data="commentList"
              style="width: 100%">
      <el-table-column prop="commenter_name"
                       label="评论者">
      </el-table-column>
      <el-table-column prop="comment_content"
                       label="评论内容">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="评论时间">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="handleReply(scope.row.comment_id)"
                     size="small">回复</el-button>
          <el-button type="text"
                     style="color:red"
                     @click="handleDeleteComment(scope.row.comment_id)"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination"
         v-if="current === 2">
      <el-pagination 
                     :total="commentTotal"
                     :page-size="limit"
                     layout="prev, pager, next"
                     @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  .menubar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    .function {
    }
    .sort {
      .sortBy {
        width: 110px;
        margin-right: 20px;
      }
      .sortWay {
        width: 110px;
      }
    }
  }
  .pagination {
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

<script>
export default {
  data() {
    return {
      isFetching: true,
      current: 1,
      total: 0,
      commentTotal: 0,
      limit: 12,
      sortWay: 'desc',
      sortBy: 'create_time',
      article_id: '',
      sortWayOptions: [
        {
          value: 'desc',
          label: '降序'
        },
        {
          value: '',
          label: '升序'
        }
      ],
      sortByOptions: [
        {
          value: 'create_time',
          label: '发布时间'
        },
        {
          value: 'update_time',
          label: '最近修改'
        }
      ],
      articleList: [
      ],
      commentList: [
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.listArticles({ start: 0, limit: this.limit, desc: this.sortWay === 'desc' ? this.sortBy : '' })
    },
    // 页面变化
    pageChange(page) {
      if (this.current === 1) {
         this.listArticles({ start: (page - 1) * this.limit, limit: this.limit, desc: this.sortWay === 'desc' ? this.sortBy : '' })
      }
      if (this.current === 2) {
        this.listComments({ article_id: this.article_id, start: (page - 1) * this.limit, limit: this.limit} )
      }
    },
    // 排序对象变化
    handleSortByChange() {
      this.init()
    },
    // 排序方式变化
    handleSortWayChange() {
      this.init()
    },
    // 获取文章列表
    listArticles(options) {
      this.isFetching = true
      this.$api.listArticles(options).then((data) => {
        if (data.code === 'S_OK') {
          this.articleList = data.data
          this.total = data.total
        }
      }, (error) => {
        console.log(error)
      }).finally(() => {
        this.isFetching = false
      })
    },
    // 删除文章
    deleteArticle(id) {
      this.$confirm('确定删除文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$api.deleteArticle({
          id: id
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.init()
        }, () => {
          this.$message({
            type: 'info',
            message: '删除失败!'
          })
        })
      }).catch(() => {
      })
    },
    // 管理文章评论
    handleCommentManage(id) {
      this.current = 2
      this.article_id = id
      // this.sortBy = 'create_time'
      // this.sortWayOptions = [
      //   {
      //     value: 'create_time',
      //     label: '发布时间'
      //   }
      // ]
      this.commentList = []
      this.commentTotal = 0
      this.listComments({ article_id: id })
    },
    // 获取文章评论列表
    listComments(options) {
      this.isFetching = true
      this.$api.listComments(options).then((data) => {
        if (data.code === 'S_OK') {
          this.commentList = data.data
          this.commentTotal = data.total
        }
      }, (error) => {
        console.log(error)
      }).finally(() => {
        this.isFetching = false
      })
    },
    // 编辑文章
    updateArticle(id) {
      this.$router.push({name: 'post', query: {id: id}})
    },
    // 回复评论
    handleReply(comment_id) {
      this.$prompt('请输入回复内容', '操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$api.authorReply({article_id: this.article_id, comment_id: comment_id, replyComment_content: value}).then((data) => {
            if (data.code === 'S_OK') {
              this.$message({
            type: 'success',
            message: '回复成功'
          })
            }
          }, (error) => {
            console.log(error)
          })
          
        }).catch(() => {      
        })
    },
    // 删除评论
    handleDeleteComment(comment_id) {
          this.$confirm('确定删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$api.deleteComment({
          comment_id: comment_id 
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.listComments({ article_id: this.article_id })
        }, () => {
          this.$message({
            type: 'info',
            message: '删除失败!'
          })
        })
      }).catch(() => {
      })
    },
    // 返回文章列表
    handleBack() {
      this.current = 1
    } 
  }
}
</script>