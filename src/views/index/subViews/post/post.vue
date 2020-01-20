<template>
  <div class="post-container">
    <div class="edit-header">
      <div class="button-area">
        <el-button type="primary"
                   round
                   class="publish-button"
                   @click="$route.query.id ? update() : publish()">{{$route.query.id ? '保存编辑' : '发布'}}</el-button>
      </div>
      <div class="title">
        <el-input v-model="title" placeholder="标题"
                  class="title-input"></el-input>
      </div>
      <div class="tabs">
        <el-checkbox-group v-model="tabs"
                           style="display: inline;">
          <el-checkbox label="1">技术</el-checkbox>
          <el-checkbox label="2">摄影</el-checkbox>
          <el-checkbox label="3">生活</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="edit-area">
      <editor id="tinymceEditor"
              :init="tinymceInit"
              v-model="content"
              :key="tinymceFlag"></editor>
      <input type="file"
             @change="uploadImage"
             class="uploadImageInput"
             multiple="multiple"
             style="display:none"
             ref="uploadImageInput">
    </div>
  </div>
</template>

<style lang="less" scoped>
.post-container {
  width: 100%;
  height: 100%;
  .edit-header {
    margin-bottom: 20px;
    .button-area {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 20px;
      .save-button {
        margin-left: 20px;
      }
      .publish-button {
        margin-left: 20px;
      }
    }
    .title {
      height: 60px;
      line-height: 60px;
      .title-input {
      }
    }
    .tabs {
      height: 60px;
      line-height: 60px;
    }
  }
  .edit-area {
  }
}
</style>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import * as qiniu from 'qiniu-js'

export default {
  data() {
    return {
      tinymceFlag: 1,
      tinymceInit: {},
      title: '',
      content: '',
      tabs: [],
      qiniuUploadToken: '',
      qiniuCDN: 'http://cdn.zijianxie.com/',
      uploadImageSrc: ''
    }
  },
  updated() {
  },
  created() {
    this.tinymceInit = {
      skin_url: '/tinymce/skins/ui/oxide',
      language_url: `/tinymce/langs/zh_CN.js`,
      language: 'zh_CN',
      min_height: 500,
      height: 600,
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      // elementpath: false,  //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: true, // 隐藏最上方menu
      plugins: 'advlist table lists paste preview fullscreen',
      toolbar: 'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
      setup: (editor) => {
        editor.ui.registry.addButton('imageUpload', {
          tooltip: '插入图片',
          icon: 'image',
          onAction: () => {
            this.insertImage()
          }
        })
      }
    }
  },
  mounted() {
    this.$api.getQiniuUploadToken().then((data) => {
      this.qiniuUploadToken = data.data.uploadToken
    }, () => {
    })
    if (this.$route.query.id) {
      this.getArticleInfo()
    }
  },
  activated() {
    this.tinymceFlag++
  },
  methods: {
    // 获取文章详情
    getArticleInfo() {
      this.$api.getArticleInfo({id: this.$route.query.id}).then((data) => {
        if (data.code === 'S_OK') {
          this.title = data.data.title
          this.content = data.data.content
          this.tabs = data.data.tabs.split(',')
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 插入图片至编辑器
    insertImage(res, file) {
      this.$refs.uploadImageInput.click()
    },
    // 发布文章
    publish() {
      this.$confirm('确定发布内容?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.createArticle({
          title: this.title,
          content: this.content,
          tabs: this.tabs
        }).then(() => {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        }, () => {
          this.$message({
            type: 'info',
            message: '发布失败'
          })
        })
      }).catch(() => {
      })
    },
    // 更新文章
    update() {
      this.$api.updateArticle({id: this.$route.query.id, title: this.title, content: this.content, tabs: this.tabs}).then((data) => {
        if (data.code === 'S_OK') {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        }
      }, (error) => {
          this.$message({
            type: 'info',
            message: '发布失败'
          })
        console.log(error)
      })
    },
    // 图片上传
    uploadImage(event) {
      const observable = qiniu.upload(event.target.files[0], event.target.files[0].name, this.qiniuUploadToken)
      observable.subscribe((res) => {
      }, (err) => {
        // subscription.unsubscribe()
      }, (data) => {
        console.log('七牛云上传成功')
        this.uploadImageSrc = this.qiniuCDN + data.key
        tinymce.execCommand('mceInsertContent', false, `<img style="width:60%" src=${this.uploadImageSrc}>`)
      })
      // 取消上传
      // subscription.unsubscribe()
    }
  },
  components: {
    'editor': Editor
  },
}
</script>