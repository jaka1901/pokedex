<template>
    <div class="container">
        <div class="core-title">My Favourites</div>
    
        <pokemondata :datas="datas" :loading="loading"/>
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
                let favs = this.$cookies.get('favs')
                let results = JSON.parse(favs)

                if (results.length > 0) {
                    results.forEach(id => {
                        let url = `https://pokeapi.co/api/v2/pokemon-form/${id}/`
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
