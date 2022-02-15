<template>
  <div class="add-song">
      <button v-if="!showForm" @click="showForm = true">Add Song</button>
      <form v-if="showForm" @submit.prevent="handleSubmit">
          <h3>Add new songs</h3>
          <input type="text" placeholder="song title" required v-model="title">
          <input type="text" placeholder="artist" required v-model="artist">
          <button>Add song</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composabels/useDocument'
export default {
    props: ['document'],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('playlist', props.document.id)

        const handleSubmit = async () => {
            const addSongs = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 100000000)
            }
            await updateDoc({
                songs: [...props.document.songs, addSongs]
            })
            title.value = ''
            artist.value = ''
        }

        return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style scoped>
 .add-song {
     text-align: center;
     margin-top: 40px;
 }
 form {
     text-align: left;
     max-width: 100%;
 }
</style>