<template>
  <footer>
    <a :href="`mailto:${contact.email}`" class="email">
      <i class="far fa-envelope"></i>
    </a>
    <p class="links">
      <span class="copy">© 2019 </span>
      <span class="andreas">
        <a :href="contact.andreas.email">{{ contact.gabriel.name }}</a>
        <a target="_blank" :href="`mailto:${contact.andreas.linkedIn}`">
          <i class="fab fa-linkedin-in"></i
        ></a>
      </span>
      &
      <span class="gabriel">
        <a :href="contact.gabriel.email">{{ contact.andreas.name }}</a>
        <a target="_blank" :href="`mailto:${contact.gabriel.linkedIn}`">
          <i class="fab fa-linkedin-in"></i
        ></a>
      </span>
    </p>
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

i {
  color: $white;
  margin: 4px;
}

a,
p {
  color: $white;
}

input,
a,
i {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: $brand-color2;
  }
}

.email i {
  font-size: 1rem;
  font-weight: bold;
}
.links {
  font-size: 0.7rem;
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
