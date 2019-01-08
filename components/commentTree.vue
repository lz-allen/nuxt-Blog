<template>
  <dl>
    <dt>{{list.name}}<i v-if="list.power === 'admin'">博主</i></dt>
    <p>{{list.time | formatTime(true)}}</p>
    <dd>{{list.content}}</dd>
    <img :src="list.image ? list.image : 'http://127.0.0.1/images/user/commentImg.jpg'" alt="评论头像">
    <span @click="reply(list._id)">回复</span>
    <div v-if="hasChild">
      <comment-tree v-for="item in list.children" :key="item._id" :list="item"></comment-tree>
    </div>
  </dl>
</template>

<script>
import bus from '../utils/bus.js'
import { formatTime } from "@/utils/utils"
export default {
  name: "commentTree",
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    hasChild() {
      return this.list.children && this.list.children.length;
    }
  },
  filters: {
    formatTime
  },
  methods: {
    reply(id) {
      bus.$emit('commentId',id)
    }
  }
};
</script>