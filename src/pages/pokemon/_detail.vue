<template>
    <main>
        <div class="container">
            <div class="core-title">
                {{ data.name }} #{{ lpad(data.id,3) }} 
                <span @click.prevent="favToggle(data.id)" class="material-icons ml-3" style="cursor: pointer">{{ fav ? 'favorite' : 'favorite_border' }}</span>
            </div>

            <div class="row">
                <div class="col-12 col-lg-5 text-center">
                    <img :src="imgs[imgSelected]" :class="`bg-${type}`" class="img-detail">

                    <div class="d-flex justify-content-center mt-4" style="width: 100%;overflow: auto;">
                        <div v-for="(img, indexImg) in imgs" :key="indexImg">
                            <img v-if="img" :src="img" @click="imgSelected = indexImg">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-7">
                    <label v-for="(type, indexType) in data.types" :key="indexType" :class="`bg-darker-${type.type.name}`" class="type-badge">{{ type.type.name }}</label>
                    
                    <div class="mt-3">
                        <h5 class="mb-3">Stats</h5>
                        <div v-for="(stat, indexStat) in data.stats" :key="indexStat" class="capitalize mb-2 row">
                            <div class="col-4 col-lg-3 font-xs-12">{{ replaceAll(stat.stat.name, '-', ' ') }}</div>
                            <div class="col-1 font-weight-bold font-xs-12">{{stat.base_stat}}</div>
                            <div class="col-7 col-lg-8">
                                <div class="progress mt-1" style="height: 5px;width: 100%;">
                                    <div :class="stat.base_stat < 50 ? 'bg-danger' : 'bg-success'" class="progress-bar" role="progressbar" :style="`width: ${stat.base_stat}%`" :aria-valuenow="stat.base_stat" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </main>
</template>

<script>
export default {
    name: 'detail',
    data() {
        return {
            loading: true,
            imgSelected: 'front_default',
            imgs: {},
            data: [],
            type: '',
            fav: false
        }
    },
    mounted() {
        this.loadData();

        let favs = this.$cookies.get('favs')

        if(favs){
            let id = this.$route.params.detail
            let f = JSON.parse(favs)
            
            if(f.includes(parseInt(id))) {
                this.fav = true
            }
        }
    },
    methods: {
        replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        },
        favToggle(id){
            let favs = this.$cookies.get('favs')

            if(!favs){
                let f = []
                f.push(id)

                this.fav = true
                this.$cookies.set('favs', JSON.stringify(f))
                this.notif('Added to favourites', 'success')
            }else{
                let f = JSON.parse(favs)
                if(f.includes(id)){
                    f.splice(f.indexOf(id), 1)
                    this.fav = false
                    this.notif('Removed from favourites', 'info')
                }else{
                    this.fav = true
                    f.push(id)
                    this.notif('Added to favourites', 'success')
                }

                this.$cookies.set('favs', JSON.stringify(f))
            }
        },
        notif(text,type){
            this.$notify({
                title: 'Notification',
                text: text,
                type: type,
            })
        },
        lpad(value, padding) {
            let zeroes = new Array(padding+1).join("0");
            return (zeroes + value).slice(-padding);
        },
        async loadData(){
            let id = this.$route.params.detail;
            let url = `https://pokeapi.co/api/v2/pokemon/${id}/`

            try{
                let res = await this.$http.get(url)
                this.data = res.data
                this.type = res.data.types[0].type.name

                let imgFilter = ['back_default','back_shiny','front_default','front_shiny']
                for(let [i, v] of Object.entries(this.data.sprites)){
                        console.log(i, v)
                    if(imgFilter.includes(i)){
                        this.imgs[i] = v
                    }
                }
                
            }catch(e){
                console.error(e.message)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .img-detail{
        width: 200px;
        object-fit: contain;
        border-radius: 10px;
    }
</style>