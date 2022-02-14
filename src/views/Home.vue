<template>
  <div>
      <div v-if="error" class="error">Could not fetch the data</div>
      <div v-if="documents">
        <ListView :playlist="documents" />
      </div>
  </div>
</template>

<script>
import getCollection from '../composabels/getCollection'
import ListView from '../components/ListView.vue'
export default {
  components: {ListView},
  setup(){
    const { error, documents } = getCollection('playlist')

    return { error, documents }
  }
}
</script>

<style>

</style>