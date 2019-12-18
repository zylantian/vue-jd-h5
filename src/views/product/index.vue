<template>
  <div class="product-layout">
    <van-swipe :autoplay="3000" :height="350">
      <van-swipe-item v-for="(image, index) in productImages" :key="index">
        <img class="lazy_img" v-if="image" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <span class="btn-left" @click="$router.go(-1)">
      <svg-icon icon-class="green-btn"></svg-icon>
    </span>
    <ul class="product-content">
      <li class="product-title">
        <div class="text-left">
          {{detailForm.name}}
        </div>
      </li>
      <li class="product-info">
        <b class="product-price">￥{{detailForm.price}}</b>
        <i>销量：{{detailForm.sale||0}}</i>
      </li>
    </ul>
    <div class="item-details">
      <span @click="handleViewDetail">宝贝详情</span>
      <div v-html="detailForm.detailMobileHtml" v-show="showDetail" class="html-class"></div>
    </div>
    <div class="product-footer">
      <van-goods-action>
        <van-goods-action-icon v-if="count == 0" icon="cart-o" @click="onClickCar" />
        <van-goods-action-icon v-if="count > 0" icon="cart-o"
                               :info="count"
                               @click="onClickCar" />
        <van-goods-action-button @click="handleAddToCart(detailForm)" type="warning" text="加入购物车" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'product',
  data () {
    return {
      show: false,
      showDetail: false,
      detailForm: {},
      skuObj: {},
      productImages: []
    }
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapState({
      count: state => state.cart.count
    })
  },
  methods: {
    // 点击了购物车
    onClickCar () {
      this.$router.push({ name: 'shopCart' })
    },
    initData () {
      this.$http
        .get(
          `/open/product/info?productId=${this.$route.query.productId}`
        )
        .then(response => {
          if (response.data.content.albumPics !== '' && response.data.content.albumPics !== undefined) {
            this.productImages = response.data.content.albumPics.split(',')
          }
          this.detailForm = response.data.content
        })
    },
    handleViewDetail () {
      this.showDetail = true
    },
    handleAddToCart (goods) {
      this.$http
        .post(`/open/cart/add`, {
          productId: goods.id,
          productName: goods.name,
          productPic: goods.pic,
          productSubTitle: goods.subTitle,
          productCategoryId: goods.productCategoryId,
          price: goods.price,
          quantity: 1
        })
        .then(response => {
          if (response.data.code === 200) {
            this.$toast.success({
              message: '添加成功~',
              duration: 1500,
              icon: 'like-o'
            })
            if (response.data.content === 1) {
              // 如果是同一个商品多次加入购物车，购物车图标上的数字不用一直上升，只要修改购物车里的数量改变即可
              this.$store.dispatch('AddCart')
            }
          } else {
            this.$toast.fail({
              message: response.data.msg,
              duration: 1500
            })
          }
        }
        )
    },
    handleToBuy (skuObj) {
      // 暂未实现
      this.skuObj = skuObj
      this.$router.push({
        path: '/order/confirmOrder',
        query: {
          quantity: this.skuObj.selectedNum,
          skuId: this.skuObj.selectedSkuComb.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-layout {
  background-color: white;
  min-height: 812px;
  /deep/ .van-swipe-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lazy_img {
    height: 350px;
    width: 100%;
  }

  .btn-left {
    position: fixed;
    left: 16px;
    top: 14px;
  }

  .progress-bar {
    .progress-left {
      display: inline-block;
      position: relative;
      min-width: 375px;
      height: 50px;
      background: url("../../assets/image/product/rectangle-left.png") no-repeat
        left center;
      background-size: 76% 100%;
      z-index: 2;
      padding: 6px 16px;
      .spike-price {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: white;
        .true-price {
          font-size: 17px;
        }
        .exchange-rate {
          font-size: 9px;
          border: 1px solid white;
          border-radius: 6px;
          display: inline-block;
          width: 108px;
          text-align: center;
          line-height: 20px;
          height: 20px;
          margin-left: 10px;
        }
      }
      .spike-bottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .old-price {
          font-size: 11px;
          color: #fff;
          margin-right: 16px;
        }
        .lm-progress {
          width: 70px;
          height: 10px;
          border-radius: 5px;
          color: #ec3924;
          display: inline-block;
        }
      }
    }
    .progress-right {
      display: inline-block;
      position: absolute;
      right: 0;
      width: 100%;
      height: 50px;
      background: url("../../assets/image/product/rectangle-right.png")
        no-repeat right center;
      background-size: 32% 100%;
      padding-right: 16px 20px;
      .right-content {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: flex-end;
        font-size: 10px;
        .end-time {
          padding-top: 10px;
          padding-right: 20px;
          font-size: 10px;
          color: white;
        }
        .time-value {
          padding-right: 10px;
        }
      }
    }
  }
  .product-content {
    padding-top: 20px;
    font-size: 14px;
    .product-title {
      padding-left: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text-left {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .force-value {
        display: inline-block;
        vertical-align: middle;
        min-width: 54px;
        text-align: center;
        line-height: 20px;
        height: 20px;
        color: #fff;
        font-size: 9px;
        padding: 0 5px;
        background-color: #ec3924;
        border-radius: 10px 10px;
      }
      .heart-full {
        padding: 0 17px;
      }
      .item-desc {
        font-size: 14px;
        color: #3a3a3a;
        line-height: 20px;
      }
    }
    .product-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 16px;
      padding-top: 20px;
      padding-bottom: 10px;
      font-size: 11px;
      margin-right: 16px;
      color: #949497;
      .product-price {
        color: #ec3924;
        font-size: 17px;
      }
    }
    .store-info {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 10px;
      /deep/ .van-button--danger {
        background-color: #ec3924;
        border: 1px solid #ec3924;
      }
      .store-detail {
        padding-left: 16px;
        padding-top: 16px;
        .store-header {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
        .store-name {
          vertical-align: middle;
          color: #3a3a3a;
          padding-left: 4px;
        }
      }
      .store-btn {
        padding-right: 16px;
        padding-top: 10px;
        /deep/ .van-button {
          margin-left: 10px;
        }
      }
    }
    .item-info {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 95%;
      position: relative;
      /deep/ .van-field__left-icon {
        margin-right: 0;
      }
      .anchor-point {
        position: absolute;
        left: 90px;
        .svg-icon {
          width: 15px;
          height: 15px;
        }
      }
    }
    .product-detail {
      padding-left: 16px;
      padding-top: 20px;
      color: #ec3924;
    }
  }
  .item-details {
    text-align: center;
    font-size: 16px;
    color: #3a3a3a;
    span {
      box-shadow: 1px -10px 1px -4px rgba(254, 77, 109, 0.5) inset;
    }
    .html-class {
      margin-top: 20px;
      /deep/ img {
        width: 375px;
      }
      /deep/ div {
        background-size: 50% 100%;
      }
    }
  }
  .product-sku {
    /deep/ .van-sku-actions {
      padding: 0;
    }
    /deep/ .van-button:last-of-type {
      border-radius: 0;
    }
    /deep/ .van-button:first-of-type {
      border-radius: 0;
    }
    /deep/ .van-sku-row__item.van-sku-row__item--active {
      color: #ec3924;
      background: #fff;
      border-color: #ec3924;
    }
    /deep/ .van-sku-row__item {
      border-color: #efeff4;
      background-color: #efeff4;
      color: #3a3a3a;
    }
    /deep/ .van-sku-actions {
      /deep/ .van-button--warning {
        background-color: #f3ca43;
        height: 44px;
        line-height: 44px;
      }
      /deep/ .van-button--danger {
        height: 44px;
        line-height: 44px;
        background-color: #ec3924;
        border: 1px solid #ec3924;
      }
    }
    /deep/ .van-sku-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    /deep/ .van-sku-header__goods-info {
      .sku-calculate {
        margin-left: 7px;
        color: white;
        border-radius: 20px 20px;
        background-color: #ec3924;
        display: inline-block;
        font-size: 7px;
        line-height: 17px;
        text-align: center;
        width: 55px;
        height: 17px;
      }
    }
  }
  .select-popup {
    padding: 20px;
    .popup-content {
      .close-icon {
        float: right;
      }
      .popup-top {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .item-specification {
          display: flex;
          padding-left: 10px;
          justify-content: flex-end;
          align-items: flex-start;
          flex-direction: column;
          font-size: 14px;
          height: 100px;
          color: #3a3a3a;
          .item-count {
            font-size: 14px;
            padding: 3px 0;
          }
          .item-colors {
            font-size: 11px;
            padding: 3px 0;
          }
          .item-price {
            padding: 3px 0;
            color: #ec3924;
            font-size: 17px;
            font-weight: 600;
          }
        }
        img {
          width: 100px;
          height: 100px;
        }
      }
      .popup-center {
        .popup-color {
          .color-text {
            font-size: 14px;
            color: #3a3a3a;
            font-weight: 600;
            padding-bottom: 10px;
          }
          .color-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .color-tag {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 75px;
              height: 29px;
              font-size: 14px;
              background-color: #efeff4;
              border: 1px solid #efeff4;
              border-radius: 4px;
              margin-right: 16px;
              padding-right: 10px;
              margin-top: 10px;
              img {
                padding-right: 10px;
                padding-left: 2px;
                width: 24px;
                height: 24px;
              }
              span {
                min-width: 30px;
              }
            }
            .color-tag.active {
              border: 1px solid #ec3924;
              background-color: white;
              color: #ec3924;
            }
          }
        }
        .popup-size {
          .size-text {
            font-size: 14px;
            color: #3a3a3a;
            font-weight: 600;
            padding-bottom: 10px;
          }
          .size-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            .size-item {
              font-size: 13px;
              width: 42px;
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              background-color: #efeff4;
              margin-right: 16px;
              margin-top: 10px;
            }
          }
        }
        .popup-quantity {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          .quantity-text {
            font-weight: 600;
            font-size: 14px;
            color: #3a3a3a;
          }
          /deep/ .van-stepper__input {
            width: 31px;
            height: 20px;
            padding: 0;
            color: #949497;
            font-weight: normal;
            background-color: transparent;
            border: 1px solid #dbdbdb;
          }
          /deep/ .van-stepper__plus {
            border: 1px solid #dbdbdb;
            background-color: transparent;
            width: 16px;
            height: 22px;
            border-radius: 0;
          }
          /deep/ .van-stepper__minus {
            border-radius: 0;
            border: 1px solid #dbdbdb;
            background-color: transparent;
            width: 16px;
            height: 22px;
          }
        }
      }
    }
  }
  /deep/ .van-popup--bottom {
    border-radius: 16px 16px 0 0;
  }
  .product-footer {
    /deep/ .van-button--warning {
      background-color: #f3ca43;
      // border: 1px solid #f3ca43;
      height: 44px;
      line-height: 44px;
    }
    /deep/ .van-goods-action-button--first {
      border-radius: 0;
      margin: 0;
    }
    /deep/ .van-goods-action-button--last {
      border-radius: 0;
      margin: 0;
    }
    /deep/ .van-button--danger {
      height: 44px;
      line-height: 44px;
      background-color: #ec3924;
      border: 1px solid #ec3924;
    }
  }
}
</style>
