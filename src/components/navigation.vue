<template>
    <nav class="main-nav">
        <router-link v-for="(data, indexData) in datas" :key="indexData" :to="data.path" class="nav-item">
            <span class="material-icons">{{ data.icon }}</span>
            <div>{{ data.label }}</div>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'navigation',
    data() {
        return {
            datas: [
                {
                    label: 'Pokedex',
                    icon: 'catching_pokemon',
                    path: '/'
                },{
                    label: 'Type',
                    icon: 'category',
                    path: '/types'
                },{
                    label: 'Favourite',
                    icon: 'star',
                    path: '/favourites'
                }
            ]      
        }
    },
}
</script>
