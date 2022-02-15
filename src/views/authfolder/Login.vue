<template>
  <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="email" v-model="email" required>
      <input type="password" placeholder="password" v-model="password" required>
      <div v-if="error" class="error">{{error}}</div>
      <button v-if="!isPanding">Log in</button>
      <button v-if="isPanding" disabled>Loading...</button>
  </form>
</template>

<script>
import useLogin from '@/composabels/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const { error, login, isPanding } = useLogin()
        const router = useRouter()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = login(email.value, password.value)
            if (!error.value) {
                router.push({ name: 'UserList'})
            }
        }

        return {email, password, error, handleSubmit, isPanding}
    }
}
</script>

<style>

</style>