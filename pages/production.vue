<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="production">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in 2" :key="item"></el-carousel-item>
      </el-carousel>
      <div class="content">
        <ul>
          <li v-for="item in lists" :key="item.id">
            <a :href="item.website" target="_blank">
              <div class="img">
                <img :src="item.image" alt>
              </div>
              <div class="desc">
                <h5>{{item.title}}</h5>
                <p>
                  <span class="time">{{item.time}}</span>
                  <span class="num">类型({{item.type}})</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="pageNum">
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
import Layout from "@/components/layout";
import { IsPC } from "@/utils/utils";
import { getCategory, getRandomArticle, getProductionList } from "@/api/api";
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
      currentPage: 1,
      pageSize: 9,
      pageNumSize: false,
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
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    getListData() {
      let params = {
        currentPage: this.currentPage,
        pageNumSize: this.pageSize
      };
      getProductionList(params).then(res => {
        if (res.status === 200 && res.data.code) {
          this.total = res.data.data.total;
          this.lists = res.data.data.list;
        }
      });
    }
  },
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
.production {
  animation: pageAnimation 1s;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background: url("../assets/banner1.jpg") no-repeat center;
  background-size: cover;
}

.el-carousel__item:nth-child(2n + 1) {
  background: url("../assets/banner2.jpg") no-repeat center;
  background-size: cover;
}
.content {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  li {
    width: 30%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    margin: 10px 0;
    a {
      display: block;
    }
    .desc {
      background-color: rgba(0, 0, 0, 0.7);
      text-shadow: 0 0 3px #000;
    }
    .img {
      width: 100%;
      height: 8rem;
      overflow: hidden;
      img {
        transition: all 0.5s;
        width: 100%;
        height: 8rem;
      }
    }
    h5 {
      margin: 0;
      line-height: 30px;
      color: #fff;
      font-weight: bold;
    }
    .desc {
      padding: 10px;
    }
    p {
      padding: 0 10px;
      overflow: hidden;
      color: #fff;
      font-size: 0.6rem;
      .time {
        float: left;
      }
      .num {
        float: right;
      }
    }
    &:hover {
      img {
        width: 100%;
        transform: scale(1.2);
      }
    }
  }
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
  .production {
    h4 {
      text-align: center;
      font-size: 1.8rem;
    }
  }
  .content {
    padding: 0 20px;
    ul {
      li {
        width: 100%;
        margin: 10px 0;
        p {
          font-size: 1.5rem;
        }
        .img {
          height: 20rem;
          img {
            height: 20rem;
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