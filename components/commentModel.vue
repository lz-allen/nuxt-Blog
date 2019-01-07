<template>
  <div>
    <p class="cancel" v-if="replyId">
      <span @click="cancel">取消回复</span>
    </p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="item">
        <el-form-item label="昵称" prop="name">
          <el-input v-model.trim="ruleForm.name" placeholder="姓名或昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="ruleForm.email" placeholder="邮箱地址(保密)"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <el-input v-model.trim="ruleForm.website" placeholder="网站或博客"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="评论内容" prop="content">
        <el-input type="textarea" rows="5" resize="none" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          :loading="btnLoading"
          size="small"
          @click="submitForm('ruleForm')"
        >发表评论（- _ -）</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { addMessage, addComment } from "@/api/api";
export default {
  props: ["replyId", "noteId"],
  data() {
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else {
        let reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
        );
        if (!reg.test(value)) {
          callback(new Error("邮箱格式不正确"));
        }
        callback();
      }
    };
    return {
      btnLoading: false,
      ruleForm: {
        name: "",
        email: "",
        website: "",
        content: "",
        image: "",
        time: new Date(),
        pid: "0",
        isVisible: false
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名或昵称", trigger: "blur" }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        content: [
          { required: true, message: "请填写评论内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          if (this.replyId) {
            this.ruleForm.pid = this.replyId;
          }
          if (this.noteId) {
            this.ruleForm.noteId = this.noteId
            let data = await addComment(this.ruleForm);
            if (data.status === 200 && data.data.code) {
              this.$message({
                showClose: true,
                message: "管理员审核懒得审核",
                duration: 5000,
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "评论失败",
                duration: 5000,
                type: "error"
              });
            }
          } else {
            let data = await addMessage(this.ruleForm);
            if (data.status === 200 && data.data.code) {
              this.$message({
                showClose: true,
                message: "管理员审核懒得审核",
                duration: 5000,
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "评论失败",
                duration: 5000,
                type: "error"
              });
            }
          }
          this.btnLoading = false;
        } else {
          return false;
        }
        this.cancel();
      });
    },
    cancel() {
      this.ruleForm.name = "";
      this.ruleForm.email = "";
      this.ruleForm.website = "";
      this.ruleForm.content = "";
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="less" scoped>
.cancel {
  text-align: right;
  color: red;
  span {
    cursor: pointer;
  }
}
.item {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .el-form-item {
    margin: 0 10px;
  }
}
@media only screen and (max-width: 768px) {
  .item {
    display: block;
    .el-form-item {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>