<template>
  <div id="secondcomponent">
    <h1>我是第二个子页面</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1 style="line-height: 36px; color: #20A0FF">豆瓣电影排行榜</h1>
      </div>
      <div v-for="article in articles" class="text item">
        {{article.title}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: "xuya",
      articles: [],
    }
  },
  mounted: function() {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        headers: {

        },
        emulateJSON: true
    }).then(function(response) {
      // 这里是处理正确的回调

        this.articles = response.data.subjects
        // this.articles = response.data["subjects"] 也可以

    }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
    });
  }
}
</script>
