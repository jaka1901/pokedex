<template>
  <div>
    <router-view/>
    <navigation />
  </div>
</template>

<script>
import navigation from '@/components/navigation.vue';

export default {
  name: 'default',
  components: {
    navigation
  }
}
</script>