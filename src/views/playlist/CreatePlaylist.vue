<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="music name" v-model="title" required>
      <textarea placeholder="music description" v-model="description"></textarea>
      <label>Music cover image</label>
      <input type="file" @change="handleFile">
      <div class="error">{{ fileError }}</div>
      <button v-if="!isPanding">Create</button>
      <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composabels/useStorage'
import useCollection from '@/composabels/useCollection'
import getUser from '@/composabels/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const { url, uploadImage, filePath } = useStorage()
        const { addDoc, error } = useCollection('playlist')
        const { user } = getUser()

        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPanding = ref(false)

        const handleSubmit = async () => {
            if (file.value) {
                isPanding.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })
                isPanding.value = false
                if (!error.value) {
                    router.push({ name: 'PlaylistDetail', params: {id: res.id}})
                }
            }
        }   

        const types = ['image/png', 'image/jpeg']

        const handleFile = (e) => {
            let selected = e.target.files[0]
            console.log(selected)

            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image (png or jpeg)'
            }
        }

        return { title, description, handleSubmit, handleFile, fileError, isPanding }
    }

}
</script>

<style>
input [type="file"] {
    border: 0;
    padding: 0;
}
label {
    display: block;
    font-size: 12px;
    margin-top: 30px;
}
button {
    margin-top: 20px;
}
</style>