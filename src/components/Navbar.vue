<template>
  <div class="navbar">
      <nav>
          <img src="@/assets/logo-mg.jpg" alt="logo">
          <h1><router-link :to="{name: 'Home'}">Samsung music</router-link></h1>
          <div class="links">
          <div v-if="user">
              <router-link :to="{name: 'CreatePlaylist'}">Create Playlist</router-link>
              <button @click="handleLogout">Logout</button>
          </div>
          <div v-else>
              <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
              <router-link class="btn" :to="{name: 'Login'}">Login</router-link>
          </div>
      </div>
      </nav>
  </div>
</template>

<script>
import useLogout from '@/composabels/useLogout'
import getUser from '@/composabels/getUser'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const { logout } = useLogout()
        const { user } = getUser()
        const router = useRouter()

        const handleLogout = async () => {
            await logout()
            console.log('User loged out')
            router.push({name: 'Login'})
        }

        return { handleLogout, user }
    }
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: #ffff;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}
img {
    max-width: 60px;
    border-radius: 50%;
}
</style>