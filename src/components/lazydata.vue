<template>
    <main>
        <div class="row lazydata">
            <div v-for="t in total" :key="t" class="col-6 col-lg-3">
                <div class="lazyitem">
                    <div class="name"></div>
                    <div class="image"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'lazydata',
    props: {
        total: {
            type: Number,
            default: 20
        },
    }
}
</script>

<style lang="scss" scoped>
    @keyframes flick {
        0%   { opacity:1; }
        50%  { opacity:.5; }
        100% { opacity:1; }
    }

    .lazydata{
        animation: flick 2s ease infinite;

        .lazyitem{
            background: #eee;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .name, .image{
            width: 100%;
            background: #ddd;
            border-radius: 5px;
        }
        .name{
            min-height: 30px;
            margin-bottom: 10px;
        }
        .image{
            min-height: 100px;
        }
    }
</style>