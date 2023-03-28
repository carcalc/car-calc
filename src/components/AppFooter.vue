<template>
  <footer>
    <a :href="`mailto:${email}`" class="email">
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

<script lang="ts">
import { contacts, email } from '@/data';

export default {
  name: 'AppFooter',
  data() {
    return {
      contacts,
      email,
    };
  },
  computed: {
    copyrightText() {
      return `© 2019 ${contacts[0].name} & ${contacts[1].name}`;
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
