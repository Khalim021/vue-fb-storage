<template>
  <form @submit.prevent="handleSubmit">
      <h3>Signup</h3>
      <input type="text" placeholder="name" v-model="displayName" required>
      <input type="email" placeholder="email" v-model="email" required>
      <input type="password" placeholder="password" v-model="password" required>
      <div v-if="error" class="error">{{error}}</div>
      <button v-if="!isPanding">Signup</button>
      <button v-if="isPanding" disabled>Loading...</button>
  </form>
</template>

<script>
import useSignup from '@/composabels/useSignup'
import { ref } from 'vue'
export default {
    setup() {
        const { error, signup, isPanding } = useSignup()
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await signup(displayName.value, email.value, password.value)
            if (!error.value) {
                console.log('user signedup successfuly')
            }
        }
        return {displayName, email, password, error, isPanding, handleSubmit}
    }
}
</script>

<style>

</style>