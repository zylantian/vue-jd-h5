<template>
  <div class="share-link">
     <cm-header>
      <span slot="left" @click="$router.go(-1)">
        <svg-icon icon-class="green-btn"></svg-icon>
      </span>
      <i>分享链接</i>
    </cm-header>
    <div class="content-box">
      <div class="share-content">
        <ul class="share-list">
          <li class="invitation-text">
            <img src="../../assets/image/mime/share-left.png" />
            <span class="code-text">邀请码</span>
            <img src="../../assets/image/mime/center-right.png" />
          </li>
          <li class="invitation-code">
            <span>{{$route.query.recommendCode}}</span>
          </li>
          <li class="invitation-btn">
            <span
              class="copy-btn"
              v-clipboard:copy="$route.query.recommendCode"
              v-clipboard:success="copySuccess"
            >复制</span>
          </li>
          <li class="qrcode-class">
            <div id="qrcode" ref="qrcode"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "shareLink",
  data() {
    return {
      systemMessage: {},
      checked: false,
      mallMessage: {}
    };
  },
  mounted() {
    this.qrcode();
  },
  created() {},
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: "http://jc.cmall.world/#/mine/linkDownload" // 设置二维码内容或跳转地址
      });
    },
    copySuccess() {
      this.$toast({
        mask: false,
        duration: 1000,
        message: "复制成功！"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.share-link {
  //   padding: 0 16px;
  display: flex;
  flex-direction: column;
  padding-bottom: 45px;
  background-color: #f66747;
  background: url("../../assets/image/mime/share-link.png") no-repeat center
    center;
  background-size: 100% 100%;
  .content-box {
    height: 100%;
    .share-content {
      width: 268px;
      height: 402px;
      margin: 130px auto;
      background: url("../../assets/image/mime/share-center.png") no-repeat
        center center;
      background-size: 100% 100%;
      .share-list {
        .invitation-text {
          padding-top: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          .code-text {
            font-size: 18px;
            color: #3a3a3a;
            padding: 16px;
          }
        }
        .invitation-code {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ec3924;
          font-weight: 600;
          font-size: 18px;
        }
        .invitation-btn {
          font-size: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 10px;
          .copy-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(236, 57, 36, 0.2);
            width: 132px;
            height: 27px;
            border-radius: 13px 13px;
          }
        }
        .qrcode-class {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 50px;
        }
      }
    }
  }
}
</style>
