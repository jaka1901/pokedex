<template>
  <div class="container">
    <div class="core-title">Pokedex</div>
    <pokemondata :datas="datas" :offset="offset" :loading="loading" @loadmore="loadMore" />
  </div>
</template>

<script>
import pokemondata from '@/components/pokemondata.vue'

export default {
  components: {
    pokemondata,
  },
  data() {
    return {
      offset: 0,
      limit: 20,
      loading: true,
      dataLoaded: true,
      datas: [],
      bottom: false
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadMore(offset){
      this.offset += offset
      this.loadData()
    },
    async loadDataDetail(data){
      let detailUrl = data.url
      let detail = await this.$http.get(detailUrl)

      return detail
    },
    async loadData(){
      this.loading = true
      try{
        let url = `https://pokeapi.co/api/v2/pokemon-form/?offset=${this.offset}&limit=${this.limit}`
        let res = await this.$http.get(url)
        let results = res.data.results

        if(results.length > 0){
          results.forEach(details => {
            this.loadDataDetail(details).then(res => {
              this.datas.push(res.data)
            })
          })
          
          this.offset += 20
        }else{
          this.dataLoaded = false
        }
      }catch(err){
        console.error(err.message)
      }finally{
        this.loading = false
      }
    }
  }
}
</script>
