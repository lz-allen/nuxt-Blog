<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="list">
      <ul>
        <li v-for="(item,key) in lists" :key="key">
          <nuxt-link :to="{path: 'articleDetail', query:{noteId:item._id}}">
            <div class="imgWrap">
              <div class="item" :style="{backgroundImage:'url(' + item.src + ')'}"></div>
            </div>
            <div class="words">
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
          </nuxt-link>
        </li>
      </ul>
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
  data() {
    return {
      currentPage: 1,
      pageNumSize: false,
      pageSize: 5,
      lists: [],
      total: 1
    };
  },
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
  filters: {
    formatTime
  },
  mounted() {
    if (!IsPC()) {
      this.pageNumSize = true;
    }
    this.getListData();
  },
  methods: {
    getListData(name) {
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
    }
  },
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 40px;
  ul {
    li {
      position: relative;
      margin: 1.5rem 0;
      box-sizing: border-box;
      cursor: pointer;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
      border-radius: 8px;
      animation: elastic 1s;
      .item {
        width: 100%;
        min-height: 417px;
        background-size: cover;
        background-repeat: no-repeatl;
        background-position: center;
        transition: transform 0.5s;
        padding-bottom: 20px;
      }
      &:hover {
        .item {
          transform: scale(1.1);
        }
        .words {
          bottom: 0;
        }
      }
      .words {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -120px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
        text-shadow: 0 0 3px #000;
        transition: bottom 0.5s;
        h4 {
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #fff;
          font-size: 1.2rem;
          padding: 1rem 0;
        }
        .content {
          box-sizing: border-box;
          line-height: 1.5;
          height: 35px;
          overflow: hidden;
          font-size: 0.6rem;
          padding: 0 1rem;
          margin-bottom: 20px;
        }
        .descIcon {
          border-top: 1px solid #dee5e7;
          padding: 20px;
          display: flex;
          font-size: 0.6rem;
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
}
@keyframes elastic {
  0% {
    transform: scale(0);
  }
  55% {
    transform: scale(1);
  }
  70% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}
@media only screen and (max-width: 768px) {
  .list {
    padding: 0 20px;
    ul {
      display: block;
      box-sizing: border-box;
      li {
        box-sizing: border-box;
        width: 100%;
        margin: 1rem 0;
        border-radius: 6px;
        .imgWrap {
          overflow: hidden;
          .item {
            height: 18rem;
            min-height: auto;
          }
        }
        .words {
          position: relative;
          padding-top: 10px;
          bottom: 0;
          transition: none;
          background-color: rgba(0, 0, 0, 0.7);
          h4 {
            font-size: 1.5rem;
          }
          .content {
            font-size: 1.2rem;
          }
          .descIcon {
            padding: 1rem;
            font-size: 1rem;
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
}
</style>