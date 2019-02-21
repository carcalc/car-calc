<template>
  <nav id="nav">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about' }">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
};
</script>

<style lang="scss" scoped></style>
