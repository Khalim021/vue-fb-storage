<template>
  <form @submit.prevent="handleSubmit">
      <h3>Signup</h3>
      <input type="text" placeholder="name" v-model="displayName">
      <input type="email" placeholder="your email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <div v-if="error" class="error">{{error}}</div>
      <button v-if="!isPanding">Signup</button>
      <button v-if="isPanding" disabled>Loading...</button>
  </form>
</template>

<script>
import useSignup from '@/composabels/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const { error, signup, isPanding } = useSignup()
        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                router.push({ name: 'UserList'})
            }
        }
        return {displayName, email, password, error, isPanding, handleSubmit}
    }
}
</script>

<style>

</style>