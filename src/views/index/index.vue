<template>
<div class="container">
  <div class="header">后台管理</div>
<div class="content">
  <div class="aside">
    <el-menu class="menu-list">
          <el-menu-item index="1" @click="handleMenuItemClick('/post')">
            <i class="el-icon-location"></i>
            <span slot="title">内容发布</span>
          </el-menu-item>
          <el-menu-item index="2" @click="handleMenuItemClick('/manage')">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
        </el-menu>
  </div>
<div class="main">
  <router-view></router-view>
</div>
</div>
</div>



</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size:30px;
    letter-spacing: 4px;
  }
  .content {
    height: calc(100vh - 80px);
    display: flex;
    padding: 20px;
    .aside {
      display: inline-block;
      width: 200px;
      height: 100%;
        border-right: 1px solid rgba(#858585, 0.2);
      .menu-list {
  border-right: none;
  a {
    text-decoration: none;
    color: #2c3e50;
  }
}
    }
    .main {
      display: inline-block;
      height: 100%;
      width: calc(100% - 200px);
      overflow:hidden;
      flex: 1;
      padding-left:20px;
    }
  }
}
// .header-title {
//   font-size: 30px;
//   letter-spacing: 8px;
//   height: 100px;
//   text-align: center;
//   line-height: 100px;
// }
// .menu-list {
//   border-right: none;
//   a {
//     text-decoration: none;
//     color: #2c3e50;
//   }
// }
// .main {
//   background-color: pink;
//   height:50%!important;
//   overflow:hidden;
//   width:50%!important;
// }
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