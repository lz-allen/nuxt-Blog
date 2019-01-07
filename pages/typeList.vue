<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="typeList">
      <h4 class="type">
        <el-tag type="primary">类别</el-tag>
        <el-tag type="danger">{{this.$route.query.typeId}}</el-tag>
      </h4>
      <div class="list">
        <ul>
          <li v-for="(item,key) in lists" :key="key" @click="toArticlePage(item._id)">
            <div class="itemLeft">
              <img :src="item.src" alt>
            </div>
            <div class="itemRight">
              <h4>{{item.title}}</h4>
              <div class="content">{{item.desc}}</div>
              <div class="descIcon">
                <p>
                  <i class="el-icon-time"></i>
                  <span class="val">{{item.publishTime | formatTime}}</span>
                </p>
                <p>
                  <i class="el-icon-document"></i>
                  <span class="val">{{item.type}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!lists.length">暂无数据</div>
      <div class="pageNum" v-if="lists.length">
        <el-pagination
          :small="pageNumSize"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import { formatTime, IsPC } from "@/utils/utils";
import Layout from "@/components/layout";
import { getCategory, getRandomArticle, getList } from "@/api/api";
export default {
  layout: "default",
  async asyncData() {
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
      currentPage: 1,
      pageNumSize: false,
      pageSize: 6,
      lists: [],
      total: 1
    };
  },
  mounted() {
    if (!IsPC()) {
      this.pageNumSize = true;
    }
    this.getListData();
  },
  filters: {
    formatTime
  },
  watch: {
    $route(to, from) {
      this.getListData();
    }
  },
  methods: {
    getListData() {
      let typeId = this.$route.query.typeId;
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      if (typeId) {
        params["type"] = typeId;
      }
      getList(params).then(res => {
        if (res.status === 200 && res.data.code) {
          this.total = res.data.data.total;
          this.lists = res.data.data.list;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    toArticlePage(noteId) {
      this.$router.push({
        name: "articleDetail",
        path: "/articleDetail",
        query: { noteId: noteId }
      });
    }
  },
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
.typeList {
  animation: pageAnimation 1s;
}
.type {
  padding-left: 20px;
}
.list {
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    li {
      width: 45%;
      margin: 0.5rem;
      box-sizing: border-box;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.7);
      text-shadow: 0 0 3px #000;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      transition: transform 300ms;
      .itemLeft {
        img {
          width: 100%;
          height: 10rem;
        }
      }
      .itemRight {
        padding: 1rem;
      }
      h4 {
        font-weight: normal;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.8rem;
        margin: 0.5rem 0;
      }
      &:hover {
        transform: translate3d(0, -8px, 0);
        box-shadow: 0 0 10px #aaa;
      }
      .content {
        text-indent: 2em;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
        white-space: nowrap;
        padding-bottom: 1rem;
      }
      .descIcon {
        display: flex;
        font-size: 0.6rem;
        color: #fff;
        align-items: center;
        justify-content: space-between;
        p {
          margin: 0;
          padding: 0 10px;
        }
      }
    }
  }
}
.pageNum {
  width: 100%;
}
@keyframes pageAnimation {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@media only screen and (max-width: 768px) {
  .list {
    padding: 20px;
    ul {
      li {
        width: 100%;
        .itemLeft {
          img {
            width: 100%;
            height: 18rem;
          }
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