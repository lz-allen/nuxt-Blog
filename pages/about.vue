<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="about">
      <h2>关于博主</h2>
      <section class="content">
        <p>
          开发这个博客的目的自己成长起来，增长见识，学习到更多的知识，以便以后能够用到自己的所学，第二点是为了交更多朋友，希望朋友可以和我一起进步，一起探讨，共同进步，达到互利共赢
        </p>
        <p>
          这个博客主要运用到的技术主要是Vue+Nuxt+Node+Koa2+MongoDB,采用的是服务端SSR,界面分为游客浏览页面和管理员管理页面，有朋友如果想要我的源码，可以在我GitHub上下载，我已经开源了
        </p>
        <p>从我接触前端已经有两年了，平常自己学习的渠道主要是知乎和掘金，看看大佬们的博客文章，了解前端在市场上的技术需求，知道了大前端的概念，前端可以高效率开发安卓，Ios和windows应用，例如React-native,Ionic，Phonegap等，这些工具可以使用前端技术来开发安卓，IOS应用，虽然性能不如原生，但是现在手机硬件过剩，再加上较高的开发效率，多用来开发新闻资讯，或是商城类的应用</p>
        <p>关于后端语言，我只简单的的学习过Node，koa2，最重要的一点是它使用JavaScript语言编写，对于前端人员的学习是很方便的，不用再去学习一门新的语言了，自己平时做一些小东西主要使用的后端语言以及数据库还是Koa2和MongoDB，毕竟自己想做的是前端方向，所以后端的掌握可能会差一些</p>
        <P>以下是我的个人信息</P>
      </section>
      <section class="basic">
        <h6>
          <span>基本信息：</span>
        </h6>
        <ul>
          <li>常用昵称：Allen</li>
          <li>职业：前端工程师</li>
          <li>专业：计算机科学与技术</li>
          <li>学校：上海应用技术大学</li>
          <li>
            邮箱：
            <a href="mailto:634989720@qq.com">634989720@qq.com</a>
          </li>
          <li>
            GitHub：
            <a href="https://github.com/lz-allen">https://github.com/lz-allen</a>
          </li>
        </ul>
      </section>
      <section class="skill">
        <h6>
          <span>职业技能：</span>
        </h6>
        <span>前端</span>
        <dl>
          <dd>Vue<el-progress :percentage="85" color="#f56c6c" :show-text="false"></el-progress>掌握</dd>
          <dd>React<el-progress :percentage="75" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
          <dd>H5<el-progress :percentage="90" color="#f56c6c" :show-text="false"></el-progress>掌握</dd>
          <dd>Css<el-progress :percentage="90" color="#f56c6c" :show-text="false"></el-progress>掌握</dd>
          <dd>JavaScript<el-progress :percentage="85" color="#f56c6c" :show-text="false"></el-progress>掌握</dd>
          <dd>Webpack<el-progress :percentage="65" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
        </dl>
        <span>后端</span>
        <dl>
          <dd>Node<el-progress :percentage="70" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
          <dd>Koa2<el-progress :percentage="70" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
          <dd>Express<el-progress :percentage="70" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
          <dd>Server Configuration<el-progress :percentage="70" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
        </dl>
        <span>数据库</span>
        <dl>
          <dd>MySQL<el-progress :percentage="60" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
          <dd>MongoDB<el-progress :percentage="75" color="#1abc9c" :show-text="false"></el-progress>熟悉</dd>
        </dl>
      </section>
      <section class="subject">
        <h6>
          <span>主修科目：</span>
        </h6>
        <ul>
          <li>C 语言</li>
          <li>数据结构</li>
          <li>软件工程</li>
          <li>数据库原理</li>
          <li>Web 程序开发</li>
          <li>JAVA 程序设计</li>
          <li>数据挖掘基础</li>
          <li>计算机网络</li>
          <li>操作系统</li>
          <li>微机原理</li>
          <li>信息系统开发</li>
          <li>Matlab 程序设计</li>
          <li>网站设计与维护</li>
        </ul>
      </section>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layout";
import { getCategory, getRandomArticle } from "@/api/api";
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
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
.about {
  min-height: 1200px;
  text-shadow: 1px 1px 3px #000;
  padding-top: 20px;
  animation: pageAnimation 1s;
  h2 {
    color: #000;
    text-align: center;
    padding: 5px 0;
  }
  section {
    margin: 10px 0;
    span{
      display: block;
      padding: 5px 0;
    }
  }
  .basic {
    background-color: #3498db;
    border-radius: 5px;
    padding: 20px;
    color: #fff;
    h6 {
      span {
        color: #fff;
        padding: 5px 0;
        border-bottom: 2px solid #3498db;
      }
    }
    ul {
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      li {
        width: 50%;
        margin: 2px 0;
        a {
          color: #fff;
          text-decoration: underline;
        }
      }
    }
  }
  .subject {
    background-color: #1abc9c;
    border-radius: 5px;
    padding: 20px;
    color: #fff;
    h6 {
      span {
        color: #fff;
        padding: 5px 0;
      }
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        margin: 5px;
        padding: 5px 10px;
        border: 1px solid #fff;
        border-radius: 20px;
      }
    }
  }
  .skill {
    background-color: #9b59b6;
    border-radius: 5px;
    padding: 20px;
    color: #fff;
    h6 {
      span {
        color: #fff;
        padding: 5px 0;
      }
    }
    dl{
      display: flex;
      flex-wrap: wrap;
      dd{
        box-sizing: border-box;
        padding-left: 20px;
        margin-top: 10px;
        width: 50%;
      }
    }
  }
  .content{
    background-color: rgba(255, 255, 255, .7);
    padding: 20px;
    p{
      text-indent: 2em;
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
  .about{
    min-height: auto;
  }
}
</style>