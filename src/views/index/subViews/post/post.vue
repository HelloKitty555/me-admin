<template>
  <div class="post-container">
    <div class="edit-header">
      <div class="button-area">
        <el-button round
                   class="save-button">保存</el-button>
        <el-button type="primary"
                   round
                   class="publish-button"
                   @click="publish">发布</el-button>
      </div>
      <div class="title">
        <span>标题：</span>
        <el-input v-model="title"
                  class="title-input"></el-input>
      </div>
      <div class="tabs">
        <span>标签：</span>
        <el-checkbox-group v-model="tabs" style="display: inline;">
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
      width: 40%;
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
      qiniuCDN: 'http://q0ab5cay6.bkt.clouddn.com/',
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
      height: 700,
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
      console.log(data.data.data.uploadToken)
      this.qiniuUploadToken = data.data.data.uploadToken
    }, () => {
    })
  },
  activated() {
    this.tinymceFlag++
  },
  methods: {
    // 插入图片至编辑器
    insertImage(res, file) {
      this.$refs.uploadImageInput.click()
    },
    // 发布内容
    publish() {
      this.$api.createArticle({
        title: this.title,
        content: this.content,
        tabs: this.tabs
      })
    },
    // 图片上传
    uploadImage(event) {
      const observable = qiniu.upload(event.target.files[0], event.target.files[0].name, this.qiniuUploadToken)
      observable.subscribe((res) => {
      }, (err) => {
        // subscription.unsubscribe()
      }, (data) => {
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