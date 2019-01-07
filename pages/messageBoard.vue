<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="messageBoard">
      <h4>给我留言吧：</h4>
      <div :class="{commentListwrap: isShow}">
        <comment-model class="commentList" :replyId="replyId" @cancel="cancel"/>
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
  </Layout>
</template>

<script>
import Layout from "@/components/layout";
import CommentModel from "@/components/commentModel";
import commentTree from "@/components/commentTree";
import bus from "@/utils/bus.js";
import { IsPC } from "@/utils/utils";
import { getCategory, getRandomArticle, getMessageList } from "@/api/api";
export default {
  layout: "default",
  async asyncData({ params }) {
    let data = {};
    const { status: categoryStatus, data: categoryData } = await getCategory();
    const {
      status: RandomArticleStatus,
      data: RandomArticleData
    } = await getRandomArticle();
    if (categoryStatus === 200) {
      data["exampleType"] = categoryData.data;
    }
    if (RandomArticleStatus === 200) {
      data["noteList"] = RandomArticleData.data;
    }
    return data;
  },
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
      pageNumSize: false,
      isShow: false,
      countMessage: "",
      replyId: "",
      list: []
    };
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
        currentPage: this.currentPage
      };
      getMessageList(params).then(res => {
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
.messageBoard {
  background-color: rgba(255, 255, 255, 0.5);
  min-height: 1200px;
  padding: 20px;
  box-shadow: 1px 1px 5px 5px rgba(85, 228, 214, 0.2);
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
@keyframes imageAnimation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@media only screen and (max-width: 768px) {
  .messageBoard {
    min-height: auto;
    h4 {
      font-size: 1.8rem;
    }
    h6 {
      font-size: 1.8rem;
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
  }
  .pageNum {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }
}
</style>