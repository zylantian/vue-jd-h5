<template>
  <div class="progress-bar-box">
    <div class="progress-bar">
      <div class="box">
        <div class="clip" id="context"></div>
        <span class="tips-number">已售{{55}}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  data() {
    return {};
  },
  created() {},
  methods: {
    processbar() {}
  }
};
</script>

<style scoped lang="scss">
.progress-bar-box {
  .progress-bar {
    display: inline-block;
    .box {
      border-radius: 30px;
      width: 74px;
      height: 11px;
      background-color: #f1f0f0;
      border: 1px solid #f1f0f0;
      padding: 0;
      display: inline-block;
      position: relative;
      .clip {
        background: linear-gradient(to right, #EC3924,#EC3924 );
        width: 34px;
        margin: 0px;
        box-shadow: 0px 0px 2px #EC392433;
        height: 10px;
        border-radius: 20px;
      }
      .tips-number {
        position: absolute;
        right: 10px;
        top: 0;
        line-height: 9px;
        font-size: 7px;
      }
    }
  }
}
</style>
