<template>
  <div class="navbar">
      <nav>
          <img src="@/assets/logo-mg.jpg" alt="logo">
          <h1><router-link :to="{name: 'Home'}">Samsung music</router-link></h1>
          <div class="links">
          <button>Logout</button>
          <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
          <router-link class="btn" :to="{name: 'Login'}">Login</router-link>
      </div>
      </nav>
  </div>
</template>

<script>
export default {

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