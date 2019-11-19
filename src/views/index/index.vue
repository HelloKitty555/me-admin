<template>
  <el-container>
    <el-header height="80px"><div class="header-title">后台管理系统</div></el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="menu-list">
          <el-menu-item index="1" @click="handleMenuItemClick('/post')">
            <i class="el-icon-location"></i>
            <span slot="title">内容发布</span>
          </el-menu-item>
          <el-menu-item index="2" @click="handleMenuItemClick('/manage')">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="handleMenuItemClick('/auth')">
            <i class="el-icon-document"></i>
           <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="handleMenuItemClick('/design')">
            <i class="el-icon-setting"></i>
            <span slot="title">设置管理</span>
          </el-menu-item>
        </el-menu>
         <!-- <el-menu class="menu-list" router>
          <el-menu-item index="/post">
            <i class="el-icon-location"></i>
            <span slot="title">内容发布</span>
          </el-menu-item>
          <el-menu-item index="/manage">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/auth">
            <i class="el-icon-document"></i>
           <span slot="title">权限控制</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置管理</span>
          </el-menu-item>
        </el-menu> -->
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.header-title {
  font-size: 30px;
  letter-spacing: 8px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.menu-list {
  border-right: none;
  a {
    text-decoration: none;
    color: #2c3e50;
  }
}
</style>

<script>
export default {
  name: 'index',
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: { 
    handleMenuItemClick(path) {
      if (this.$router.history.current.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>