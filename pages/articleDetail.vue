<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="articalDetail">
      <div class="title">{{articleInfo.title}}</div>
      <div class="desc">
        <p>
          <i class="el-icon-time"></i>
          <span class="txt hidden-xs-only">时间:</span>
          <span class="val">{{articleInfo.publishTime | formatTime}}</span>
        </p>
        <p>
          <i class="el-icon-document"></i>
          <span class="txt hidden-xs-only">分类:</span>
          <span class="val">{{articleInfo.type}}</span>
        </p>
        <p>
          <i class="el-icon-message"></i>
          <span class="txt hidden-xs-only">评论:</span>
          <span class="val">{{countMessage}}</span>
        </p>
        <p>
          <i class="el-icon-view"></i>
          <span class="txt hidden-xs-only">阅读次数:</span>
          <span class="val">{{articleInfo.total}}</span>
        </p>
      </div>
      <div class="hljs" v-html="articleInfo.markdown"></div>
      <div class="bar"></div>
      <div class="comments">
        <h4>欢迎交流：</h4>
        <div :class="{commentListwrap: isShow}">
          <comment-model
            class="commentList"
            :noteId="this.$route.query.noteId"
            :replyId="replyId"
            @cancel="cancel"
          />
        </div>
        <h6>{{countMessage}}条评论</h6>
        <div class="commentContent">
          <div v-for="item in listData" :key="item._id">
            <comment-tree :list="item"/>
          </div>
        </div>
        <div class="pageNum" v-if="listData.length">
          <el-pagination
            :small="pageNumSize"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="countMessage"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layout";
import CommentModel from "@/components/commentModel";
import commentTree from "@/components/commentTree";
import { formatTime, IsPC } from "@/utils/utils";
import bus from "@/utils/bus.js";
import {
  getCategory,
  getRandomArticle,
  getArticle,
  getCommentList
} from "@/api/api";
export default {
  layout: "default",
  watchQuery: ["noteId"],
  async asyncData({ query }) {
    let data = {};
    const { status: categoryStatus, data: categoryData } = await getCategory();
    const {
      status: RandomArticleStatus,
      data: RandomArticleData
    } = await getRandomArticle();
    const { status: articleStatus, data: articleData } = await getArticle({
      id: query.noteId
    });
    if (categoryStatus === 200) {
      data["exampleType"] = categoryData.data;
    }
    if (RandomArticleStatus === 200) {
      data["noteList"] = RandomArticleData.data;
    }
    if (articleStatus === 200) {
      data["articleInfo"] = articleData.data;
    }
    return data;
  },
  props: {},
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      pageNumSize: false,
      isShow: false,
      countMessage: "",
      replyId: "",
      list: []
    };
  },
  filters: {
    formatTime
  },
  computed: {
    listData: function name() {
      return createTree(this.list, "_id", "pid", "children");
      function createTree(a, idStr, pidStr, chindrenStr) {
        var r = [],
          hash = {},
          id = idStr,
          pid = pidStr,
          children = chindrenStr,
          i = 0,
          j = 0,
          len = a.length;
        for (; i < len; i++) {
          hash[a[i][id]] = a[i];
        }
        for (; j < len; j++) {
          var aVal = a[j],
            hashVP = hash[aVal[pid]];
          if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
          } else {
            r.push(aVal);
          }
        }
        return r;
      }
    }
  },
  mounted() {
    if (!IsPC()) {
      this.pageNumSize = true;
    }
    bus.$on("commentId", id => {
      this.getCommentId(id);
    });
    this.messageList();
  },
  methods: {
    getCommentId(id) {
      this.isShow = true;
      if (this.isShow) {
        this.replyId = id;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMessageList();
    },
    messageList() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        noteId: this.$route.query.noteId
      };
      getCommentList(params).then(res => {
        if (res.status === 200 && res.data.code) {
          this.countMessage = res.data.data.total;
          this.list = res.data.data.list;
        }
      });
    },
    cancel() {
      this.isShow = false;
      this.replyId = "";
    }
  },
  components: {
    Layout,
    CommentModel,
    commentTree
  }
};
</script>
<style lang="less">
@import "../assets/css/markdown.less";
.articalDetail {
  background-color: rgba(255, 255, 255, 0.8);
  min-height: 1200px;
  padding: 20px;
  animation: pageAnimation 1s;
}
.title {
  color: #000;
  padding-top: 0.5rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0 0 3px #000;
  font-size: 1rem;
}
.hljs {
  min-height: 100px;
}
.bar {
  height: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #52cbe7;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.5) 75%,
    transparent 75%,
    transparent
  );
  animation: bar 6s linear infinite alternate;
  background-size: 40px 40px;
}

.desc {
  display: flex;
  font-size: 0.8rem;
  padding-top: 1rem;
  color: #000;
  text-shadow: 0 0 3px #000;
  justify-content: center;
  p + p {
    border-left: 1px solid #ddd;
    margin-left: 0.4rem;
  }
  i {
    margin: 0 0.4rem;
  }
  .txt {
    margin-right: 0.2rem;
  }
  .val {
    color: #000;
  }
}
.comments {
  .commentListwrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    transition: opacity 0.5s;
    z-index: 99999;
    animation: modelAnimation 0.5s;
    .commentList {
      position: absolute;
      width: 30rem;
      padding: 30px;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px rgb(255, 255, 255);
      z-index: 999;
    }
  }
  h4 {
    font-size: 1rem;
    text-shadow: 0 0 3px #333;
    color: #000;
  }
  h6 {
    border-top: 1px solid #333;
    color: #333;
    text-shadow: 0 0 3px #333;
    padding: 20px 0;
    font-size: 0.8rem;
  }
  .commentListwrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    transition: opacity 0.5s;
    z-index: 99999;
    .commentList {
      position: absolute;
      width: 30rem;
      padding: 30px;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px rgb(255, 255, 255);
      z-index: 999;
    }
  }
  .commentContent {
    dl {
      position: relative;
      padding-left: 60px;
      margin: 20px 0;
      dt {
        color: #000;
        font-size: 0.8rem;
        text-shadow: 0 0 3px #333;
        i {
          display: inline-block;
          font-size: 0.6rem;
          color: #fff;
          padding: 2px 4px;
          border-radius: 2px;
          margin-left: 10px;
          background-color: #f56c6c;
        }
      }
      dd {
        padding: 10px 0;
        color: #58666e;
      }
      p {
        color: #333;
        padding-top: 5px;
      }
      img {
        position: absolute;
        width: 45px;
        height: 45px;
        z-index: 600;
        border-radius: 50%;
        left: 0;
        top: 0;
        animation: imageAnimation 5s linear infinite;
      }
      span {
        display: inline-block;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #f56c6c;
        font-size: 0.6rem;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
@keyframes bar {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 50px 0;
  }
}
@keyframes imageAnimation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes pageAnimation {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  55% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(10%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@media only screen and (max-width: 768px) {
  .articalDetail {
    min-height: 60rem;
  }
  .title {
    font-size: 1.6rem;
  }
  .desc {
    font-size: 1.2rem;
  }
  .commentListwrap {
    .commentList {
      width: 80%;
    }
  }
  .commentContent {
    dl {
      dt {
        font-size: 1.6rem;
      }
      span {
        font-size: 1.2rem;
      }
    }
  }
  .pageNum {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }
}
</style>