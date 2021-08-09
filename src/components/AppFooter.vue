<template>
  <footer>
    <a :href="`mailto:${contact.email}`" class="email">
      <i class="far fa-envelope"></i>
    </a>
    <p class="copyright">{{ copyrightText }}</p>
    <input
      class="reset"
      lang="sv"
      type="button"
      value="Återställ alla data"
      @click="$emit('reset')"
    />
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: { contact: { type: Object, required: true } },
  computed: {
    copyrightText() {
      const { andreas, gabriel } = this.contact;
      return `© 2021 ${andreas.name} & ${gabriel.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 10rem;
  color: $white;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

a {
  color: inherit;
}

input,
a,
i {
  &:hover {
    @media screen and (min-width: $size-desktop) {
      text-decoration: underline;
      color: $brand-color2;
    }
  }
}

.copyright {
  font-size: 0.8rem;
}

.reset {
  color: $brand-color3;
  font-size: 0.6rem;
  border: none;
  outline: none;
  background: none;
  padding: 5px;
}
</style>
