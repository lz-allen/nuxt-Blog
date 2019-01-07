<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="timeAxis">
      <dl class="section" v-for="year in listData" :key="year.id">
        <dt class="year">
          <span>{{year.id}}</span>
        </dt>
        <dd v-for="month in year.children" :key="month.id">
          <h6>{{month.id | numToMonth}}</h6>
          <p v-for="day in month.children" :key="day.id">
            {{day.id}}：
            <nuxt-link
              :to="{path:'/articleDetail',query:{noteId:item.id}}"
              v-for="item in day.children"
              :key="item.id"
            >{{item.title}}</nuxt-link>
          </p>
        </dd>
      </dl>
      <div class="pageNum" v-if="listData.length">
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
import { numToMonth, IsPC } from "@/utils/utils";
import { getCategory, getRandomArticle, getList } from "@/api/api";
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
  filters: {
    numToMonth
  },
  data() {
    return {
      currentPage: 1,
      pageNumSize: false,
      pageSize: 20,
      list: [],
      total: 1
    };
  },
  mounted() {
    if (!IsPC()) {
      this.pageNumSize = true;
    }
    this.getListData();
  },
  computed: {
    listData: function name() {
      return createTree(this.list,"id", "pid", "children")
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    getListData() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      getList(params).then(res => {
        if (res.status === 200 && res.data.code) {
          this.total = res.data.data.total;
          this.list = this.handleData(res.data.data.list);
        }
      });
    },
    addZero(num) {
      return num < 10 ? "0" + num : "" + num;
    },
    handleData(arr) {
      let lists = [];
      arr &&
        arr.length &&
        arr.forEach((item, index) => {
          let date = new Date(item.publishTime);
          let year = date.getFullYear() + "年";
          let month = this.addZero(date.getMonth() + 1) + "月";
          let day = this.addZero(date.getDate()) + "日";
          lists.push({
            id: year,
            pid: 0
          });
          lists.push({
            id: month,
            pid: year
          });
          lists.push({
            id: day,
            pid: month
          });
          lists.push({
            id: item._id,
            pid: day,
            title: item.title
          });
        });
      function removeRepeatArr(array) {
        for (var i = 0; i < array.length - 1; i++) {
          for (var j = 1; j < array.length; j++) {
            if (i != j) {
              if (array[i].id == array[j].id && array[i].pid == array[j].pid) {
                array.splice(j, 1);
              }
            }
          }
        }
        return array;
      }
      return removeRepeatArr(lists);
    }
  },
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
.timeAxis {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  animation: pageAnimation 1s;
}
.section {
  margin-bottom: 20px;
  .year {
    font-size: 1rem;
    color: rgba(30, 115, 190, 0.86);
    span {
      display: inline-block;
      border-bottom: 2px solid rgba(30, 115, 190, 0.86);
    }
    padding-bottom: 20px;
  }
  dd {
    font-size: 0.8rem;
    padding-left: 20px;
    color: rgba(30, 115, 190, 0.86);
    h6 {
      font-weight: bold;
      color: rgba(30, 115, 190, 0.86);
    }
    p {
      padding-left: 20px;
      margin: 10px 0;
      text-overflow: ellipsis;
      a {
        display: block;
        padding-left: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #23b7e5;
        margin: 4px 0;
        line-height: 2;
        border-radius: 6px;
        transition: all 0.5s;
        color: #fff;
        &:hover {
          transform: translate3d(10px, 0, 0);
        }
      }
    }
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
  h2 {
    padding-top: 20px;
  }
  .section {
    padding: 0 20px;
    .year {
      font-size: 1.8rem;
    }
    dd {
      font-size: 1.5rem;
    }
  }
  .pageNum {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }
}
</style>