<template>
  <div class="container">
    <div class="core-title">Pokemon Types</div>
    <div class="row" v-if="!loading">
      <router-link v-for="(data,indexData) in datas" :key="indexData" class="col-6 col-lg-3" :to="`/type/${uriSplit(data.url)}`">
        <div class="pokemon py-3 px-4" :class="`bg-lighter-${data.name}`">
          <div class="name">{{data.name}}</div>
        </div>
      </router-link>
    </div>

    <lazydata v-if="loading" />

  </div>
</template>

<script>
import lazydata from '@/components/lazydata.vue'

export default {
  name: 'type',
  components: {
    lazydata,
  },
  data() {
    return {
      datas: [],
      loading: true,
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    uriSplit(uri) {
      let arr = uri.split('/')
      return arr[arr.length - 2]
    },
    async loadData(){
      this.loading = true
      try{
        let url = `https://pokeapi.co/api/v2/type`
        let res = await this.$http.get(url)
        this.datas = res.data.results
      }catch(err){
        console.error(err.message)
      }finally{
        this.loading = false
      }
    }
  }
}
</script>
