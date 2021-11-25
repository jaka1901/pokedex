<template>
    <div class="container">
        <div class="core-title">{{ type }} Type</div>
    
        <pokemondata :datas="datas" :loading="loading" />
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
            loading: true,
            dataLoaded: true,
            datas: [],
            type: '',
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadDataDetail(url) {
            let detail = await this.$http.get(url)
            return detail
        },
        async loadData() {
            this.datas = []
            this.loading = true

            try {
                let id = this.$route.params.detail                
                let results = await this.$http.get(`https://pokeapi.co/api/v2/type/${id}/`)
                let fetch = results.data.pokemon
                this.type = results.data.name

                if (fetch.length > 0) {
                    fetch.forEach(res => {
                        let url = res.pokemon.url
                        this.loadDataDetail(url).then(res => {
                            this.datas.push(res.data)
                        })
                    })

                } else {
                    this.dataLoaded = false
                }
            } catch (err) {
                console.error(err.message)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
