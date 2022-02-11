<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="music name" v-model="title" required>
      <textarea placeholder="music description" v-model="description"></textarea>
      <label>Music cover image</label>
      <input type="file" @change="handleFile">
      <div class="error">{{ fileError }}</div>
      <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const handleSubmit = () => {
            if (file.value) {
                console.log(title.value, description.value)
            }
        }

        const types = ['image/png', 'image/jpeg']

        const handleFile = (e) => {
            const selected = e.target.files[0]
            console.log(selected)

            if (selected && types.includes(selected.type)) {
                file.value = selected
            } else {
                file.value = null
                fileError.value = 'Please select an image (png or jpeg)'
            }
        }

        return { title, description, handleSubmit, handleFile, fileError }
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