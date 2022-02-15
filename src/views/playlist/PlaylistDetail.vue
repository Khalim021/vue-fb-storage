<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="document" class="playlist-details">

      <div class="playlist-info">
          <div class="cover">
              <img :src="document.coverUrl">
          </div>
          <h2>{{ document.title }}</h2>
          <p class="username">Created by {{ document.userName }}</p>
          <p class="description">{{ document.description }}</p>
          <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
      </div>
      <div class="song-list">
          <p v-if="!document.songs.length">There is no songs here!</p>
          <div v-for="song in document.songs" :key="song.id" class="single-song">
            <div class="details">
              <h3>{{ song.title }}</h3>
              <p>{{ song.artist }}</p>
            </div>
            <button v-if="ownership" @click="handleClick(song.id)">Delete Song</button>
          </div>
          <Addsongs v-if="ownership" :document="document" />
      </div>
  </div>

  
</template>

<script>
import getDocument from '@/composabels/getDocument'
import getUser from '@/composabels/getUser'
import useDocument from '@/composabels/useDocument'
import useStorage from '@/composabels/useStorage'
import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import Addsongs from '@/components/Addsongs.vue'
export default {
    props:['id'],
    components: { Addsongs },
    setup(props) {
        const { error, document } = getDocument('playlist', props.id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('playlist', props.id)
        const { deleteImage } = useStorage()
        const router = useRouter()

        const ownership = computed(() => {
          return document.value && user.value && user.value.uid == document.value.userId
        })
        const handleDelete = async () => {
          await deleteImage(document.value.filePath)
          await deleteDoc()
          router.push({ name: 'Home' })
        }
        const handleClick = async (id) => {
          const songs = document.value.songs.filter((song) => song.id != id)
          await updateDoc({ songs })
        }
        return { error, document, ownership, handleDelete, handleClick }
    }
}
</script>

<style scoped>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;

  }
</style>