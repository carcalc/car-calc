<template>
  <div class="card-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card-container {
  border: none;
  background-color: $card-bg;
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: $border-radius-md;

  @media screen and (min-width: $size-tablet) {
    border-radius: $border-radius-lg;
    padding: 1.5rem;
    box-shadow: 1px 1px 2px 0 rgb(0 0 80 / 30%);
  }
}
</style>
