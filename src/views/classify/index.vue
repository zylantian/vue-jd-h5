<template>
  <div class="classify">
    <header class="home-header">商品分类</header>
    <van-loading
      class="home-loading"
      v-show="loading"
      color="#EC3924"
      size="25px"
      type="spinner"
    />
    <section class="search-wrap" ref="searchWrap">
      <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
        <ul class="nav-side">
          <li
            v-for="(item,index) in categoryData"
            :key="index"
            :class="{'active' : currentIndex === index}"
            @click="selectMenu(index)"
          >
            <span>{{item.label.slice(0,2)}}</span>
            <span>{{item.label.slice(2)}}</span>
          </li>
        </ul>
      </list-scroll>
      <list-scroll class="search-content" :scroll-data="categoryData">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <template v-for="(category,index) in categoryData">
              <div class="swiper-slide" :key="index" v-if="currentIndex === index">
                <img
                  @click="selectProduct(category)"
                  class="category-main-img"
                  v-lazy="category.imageUrl"
                  v-if="category.imageUrl"
                />
                <div v-for="(sencondCategory, index) in category.children" :key="index">
                  <p class="goods-label">{{sencondCategory.label}}</p>
                  <div class="goods-box">
                    <ul class="goods-content">
                      <template v-for="(item,index) in sencondCategory.productList">
                        <li :key="index" class="goods-item" >
                          <img class="product-image" v-if="item.pic" v-lazy="item.pic"/>
                          <div class="goods-layout">
                            <div class="goods-title">{{item.name}}</div>
                            <span class="goods-div">{{item.subTitle}}</span>
                            <div class="goods-desc">
                              <span class="goods-price">
                                <i>￥{{item.price}}</i>
                              </span>
                            </div>
                            <div class="goods-count-sale">
                               <span class="goods-monthlySalesQuantity">销量：{{item.sale}}</span>
                            </div>
                          </div>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </list-scroll>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import ListScroll from '../../components/scroll/ListScroll'
export default {
  components: {
    ListScroll
  },
  name: 'classify',
  data () {
    return {
      tags: [],
      currentIndex: 0,
      loading: true,
      categoryData: [],
      templateCategoryData: []
    }
  },
  // activated() {
  //   this.getGoodsList();
  // },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取分类
    getGoodsList () {
      this.loading = true
      this.$http.get(`/open/product/category`).then(response => {
        console.log(response.data.content)
        const categoryData = response.data.content
        this.categoryData = categoryData
        this.loading = false
      })
    },
    handleSearch () {
      this.$router.push('/search')
    },
    // 左侧菜单和右侧区域联动
    selectMenu ($index) {
      this.currentIndex = $index
    },
    // 动态设置searc-wrap的高
    setSearchWrapHeight () {
      let $screenHeight = document.documentElement.clientHeight
      this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'
    },
    selectProduct (product) {
      this.$router.push({
        path: '/classify/classifySearch',
        query: { categoryId: product.value, product: product }
      })
    }
  },
  mounted () {
    if (!this.loading) {
      this.setSearchWrapHeight()
    }
    this.$eventBus.$emit('changeTag', 1)
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/mixin.scss";
.classify {
  height: 100%;
  background-color: #fff;
  .home-header {
    font-size: 18px;
    color: #3a3a3a;
    font-weight: 600;
    text-align: center;
    line-height: 50px;
  }
  .home-loading {
    text-align: center;
  }
  .search-wrap {
    @include fj;
    width: 100%;
    background: #fff;
    .nav-side-wrapper {
      width: 88px;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        @include boxSizing;
        background: #f8f8f8;
        li {
          width: 100%;
          height: 77px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #949497;
          flex-direction: column;
          &.active {
            color: #ec3924;
            border-left: 3px solid transparent;
            border-color: #ec3924;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 80%;
      height: 100%;
      padding: 0 16px;
      background: #fff;
      padding-bottom: 30px;
      @include boxSizing;
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          padding-top: 20px;
          .goods-label {
            font-size: 14px;
            color: #ec3924;
            font-weight: 600;
            padding-bottom: 10px;
          }
          .category-main-img {
            width: 100%;
            border-radius: 8px;
            height: 107px;
          }
          .category-main-img[lazy="loading"] {
            background: #949497 url("../../assets/icons/pre-view.png") no-repeat
              center center;
            background-size: 100% 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 34px;
              font-weight: 500;
              padding: 40px 0;
            }
            .item-img {
              width: 65px;
              height: 80px;
            }
            .item-img[lazy="loading"] {
              background: #949497 url("../../assets/icons/pre-view.png")
              no-repeat center center;
              background-size: 100% 100%;
            }
            .product-item {
              width: 33%;
              margin-bottom: 20px;
              text-align: center;
              font-size: 30px;
              .item-img {
                width: 50px;
                height: 60px;
              }
              .item-img[lazy="loading"] {
                background: #949497 url("../../assets/icons/pre-view.png")
                  no-repeat center center;
                background-size: 100% 100%;
              }
              .product-title {
                color: #3a3a3a;
                font-size: 11px;
                font-weight: 600;
                // width: 50%;
                white-space: nowrap;
              }
            }
          }
          .goods-box {
            padding: 16px;
            .good-things {
              font-size: 18px;
              color: #ec3924;
            }
            .goods-content {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              .goods-item {
                // display: inline-block;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                width: 165px;
                border-radius: 8px;
                margin-top: 10px;
                // padding-right: 10px;
                background-color: white;
                .product-image {
                  width: 165px;
                  height: 196px;
                }
              }
              li:nth-of-type(even) {
                padding-right: 0;
              }
              .goods-layout {
                width: 165px;
                padding: 0 10px;
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                .goods-title {
                  color: #3a3a3a;
                  font-size: 14px;
                  font-weight: 700;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .goods-div {
                  color: #949497;
                  font-size: 11px;
                }
                .goods-desc {
                  background-color: #fff;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-bottom: 12px;
                  padding-top: 12px;
                  .goods-price {
                    width: 100%;
                    font-size: 14px;
                    color: #ec3924;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .force-value {
                      margin-left: 7px;
                      color: white;
                      border-radius: 20px 20px;
                      background-color: #ec3924;
                      display: inline-block;
                      font-size: 7px;
                      line-height: 17px;
                      text-align: center;
                      min-width: 55px;
                      height: 17px;
                      padding: 0 3px;
                    }
                  }
                }
                .goods-count-sale {
                  background-color: #fff;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-bottom: 12px;
                  color: #949497;
                  font-size: 11px;

                  .goods-monthlySalesQuantity {
                    font-size: 11px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .goods-all {
    padding-top: 10px;
  }
}
</style>
