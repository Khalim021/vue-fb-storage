<template>
  <div class="user-playlists">
    <h3>My Playlist</h3>
    <div v-if="playlists">
      <ListView :playlists="playlists"/>
    </div>
    <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create New</router-link>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import getUser from '@/composabels/getUser'
import getCollection from '@/composabels/getCollection'
export default {
  components: {ListView},
  setup() {
    const { user } = getUser()
    const { documents: playlists } = getCollection('playlists', ['userId', '==', user.value.uid])

    return { playlists }

  }
}
</script>

<style scoped>
 h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>