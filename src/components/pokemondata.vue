<template>
  <main>
    <div class="row">
      <router-link v-for="(data,indexData) in datas" :key="indexData" class="col-6 col-lg-3" :to="`/pokemon/${data.id}`">      
        <div class="pokemon" :class="`bg-${data.types[0].type.name}`">
          <div class="name">{{data.name}}</div>
          <img :src="data.sprites.front_default">
          
          <div class="text-right">
            <label v-for="(type, indexType) in data.types" :key="indexType" :class="`bg-darker-${type.type.name}`">{{ type.type.name }}</label>
          </div>
        </div>
      </router-link>
    </div>

    <lazydata v-if="loading" />
    
  </main>
</template>

<script>
import lazydata from '../components/lazydata.vue'

export default {
  name: 'pokemondata',
  components: {
    lazydata,
  },
  props: {
    offset: {
        type: Number,
    },
    loading: {
        type: Boolean,
    },
    datas: {
        type: Array,
    },
  },
  data() {
    return {
      limit: 20,
      dataLoaded: true,
      bottom: false,
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.$emit('loadmore', 20)
      }
    }
  },
  mounted() {
    // this.loadData()
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })

  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      
      return bottomOfPage || pageHeight < visible
    },
  }
}
</script>
