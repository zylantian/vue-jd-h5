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
      <div class="search-content">
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
                <div v-for="(products,index) in category.children" :key="index">
                  <p class="goods-title">{{products.label}}</p>
                  <div class="category-list">
                    <template v-for="(product,index) in products.productList" >
                    <div :key="index" class="product-item"  @click="handleGoToProduct(product)">
                      <img class="item-img" v-lazy="product.pic" />
                        <div class="goods-title">{{product.name}}</div>
                        <span class="goods-div">{{product.subTitle}}</span>
                        <div class="goods-desc">
                           <span class="goods-price">
                             <i>￥{{product.price}}</i>
                           </span>
                        </div>
                        <div class="goods-count-sale">
                          <span class="goods-monthlySalesQuantity">销量：{{product.sale}}</span>
                        </div>
                    </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
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
    },
    handleGoToProduct (item) {
      this.$router.push({
        path: `/product/index`,
        query: { productId: item.id }
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
            .goods-title {
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
                width: 50%;
                margin-bottom: 20px;
                text-align: left;
                font-size: 30px;
                .item-img {
                  width: 110px;
                  height: 150px;
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
</style>
