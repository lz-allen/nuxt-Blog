<template>
  <div class="index">
    <el-row>
      <el-col :sm="8">
        <div class="left">
          <div class="title">
            <i class="menu" @click="showNav">
              <img src="../assets/menu.svg" alt="menu">
            </i>
            <div class="titleLeft">
              <span>A</span>
              <span>l</span>
              <span>l</span>
              <span>e</span>
              <span>n</span>
            </div>
            <div class="titleRight">失眠先生</div>
          </div>
          <div class="nav" :class="{on:navFlag}">
            <ul>
              <li>
                <nuxt-link to="/">首页</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/production">作品</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/messageBoard">留言板</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/timeAxis">归档</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/friends">友链</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{path:'/about',params:{id:1}}">关于</nuxt-link>
              </li>
            </ul>
            <div class="search hidden-xs-only">
              <el-input
                placeholder="回车搜索"
                suffix-icon="el-icon-search"
                clearable
                @input="input"
                @blur="blur"
                @keyup.enter.native="searchInfo"
                v-model="searchTxt"
              ></el-input>
              <dl class="searchList" v-show="searchFlag&&searchTxt">
                <nuxt-link
                  v-for="item in searchList"
                  :key="item._id"
                  :to="item._id ? {path:'/articleDetail',query:{noteId:item._id}} : {path:'/'}"
                >
                  <dd>{{item.title}}</dd>
                </nuxt-link>
              </dl>
            </div>
          </div>
          <div class="exampleType hidden-xs-only">
            <h4>技术栈</h4>
            <ul>
              <li v-for="item in exampleType" :key="item._id">
                <nuxt-link :to="{path:'/typeList',query:{typeId:item.text}}">{{item.text}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="randomExample hidden-xs-only">
            <h4>随机文章</h4>
            <ul>
              <li v-for="item in noteList" :key="item.noteId">
                <nuxt-link :to="{path:'/articleDetail',query:{noteId:item._id}}">{{item.title}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="footImage hidden-xs-only">
            <img src="../assets/indexImg.jpg" alt>
          </div>
          <div class="icons">
            <a href="https://github.com/lz-allen">
              <img src="../assets/github.svg" alt="GitHub">
            </a>
            <a href="https://www.zhihu.com/people/lzfallen/activities">
              <img src="../assets/zhihu.svg" alt="知乎">
            </a>
            <a href="https://juejin.im/user/5b5fc8ece51d4506d27ec861">
              <img src="../assets/juejin.svg" alt="掘金">
            </a>
            <a href="mailto:634989720@qq.com">
              <img src="../assets/email.svg" alt="邮箱">
            </a>
            <a href="tel:13381678729" class="tel">
              <img src="../assets/tel.svg" alt="电话">
            </a>
          </div>
          <div class="leftFoot hidden-xs-only">
            <p>龙兆峰 &copy; {{new Date().getFullYear()}} Copyright</p>
            <p>赣ICP备18015445号</p>
            <nuxt-link to="/">管理员登录</nuxt-link>
          </div>
        </div>
      </el-col>
      <el-col :sm="16">
        <div class="right">
          <slot/>
        </div>
      </el-col>
    </el-row>
    <div
      :class="['scroll','hidden-md-and-down moveing',{scrollShow: scrollFlag}]"
      @click="scrollTop"
    ></div>
  </div>
</template>

<script>
import { search } from "@/api/api";
import { debounce, scrollAnimation } from "@/utils/utils";
export default {
  props: {
    exampleType: {
      type: Array,
      require: true,
      default: () => []
    },
    noteList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data() {
    return {
      searchTxt: "",
      searchList: "",
      navFlag: false,
      searchFlag: false,
      scrollFlag: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener("scroll", debounce(this.scroll), 400);
  },
  methods: {
    showNav() {
      this.navFlag = !this.navFlag;
    },
    input() {
      this.searchFlag = false;
      this.searchList = [];
    },
    scrollTop() {
      const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, 0)
    },
    scroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > 500 ? (this.scrollFlag = true) : (this.scrollFlag = false);
    },
    blur() {
      setTimeout(() => {
        this.searchFlag = false;
      }, 500);
    },
    searchInfo() {
      if (this.searchTxt) {
        this.searchFlag = true;
        search({ keywords: this.searchTxt }).then(res => {
          if (res.status === 200 && res.data.code) {
            this.searchList = res.data.data.list;
          }
        });
      }
    }
  }
};
</script>