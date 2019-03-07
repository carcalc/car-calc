<template>
  <div class="help">
    <button @click="showMessage" :class="[message ? 'btn-active' : '']">Hjälp</button>
    <div :class="[message ? 'message active' : 'message']">
      <p>
        Med denna applikation kan du jämföra kostnaderna mellan två bilar. Du kan välja att jämföra
        de bilar vi har inlagt i dropdown-menyn eller fylla i alla uppgifter själv. I rutan i mitten
        fylls uppgifter i som berör ditt ägande samt bränslekostnader, de gäller således för båda
        bilarna. Vi har fyllt i default-värden för bränslekostnader m.m. men dessa kan du ändra vid
        behov. Uppe i högra hörnet på respektive bil ser du en färgd prick, den visar vilken
        klimatpåverkan bilen har. Grön = minst påverkan, röd mest påverkan. I rutan längre ner ser
        du sedan resultatet.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: false,
    };
  },
  methods: {
    showMessage() {
      return (this.message = !this.message);
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  width: 7rem;
  height: 1.2rem;
  background: $accent-color;
  z-index: 15;
  border: none;
  border-radius: 10px 10px 0 0;
  transform: rotate(-90deg);
  transform-origin: bottom right;
  position: fixed;
  right: 0;
  top: 6px;
  font-size: 1rem;
  @media screen and (min-width: $size-tablet) {
    width: 10rem;
    height: 1.5rem;
    top: 0;
  }
}
.btn-active {
  opacity: 0.5;
}
.message {
  width: 80%;
  background: $card-bg;
  color: $black;
  position: fixed;
  top: 25px;
  right: -38rem;
  font-size: 0.75rem;
  transition: all 300ms;
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  border-radius: 15px 0 0 15px;
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 80, 0.3);
  @media screen and (min-width: $size-tablet) {
    width: 25rem;
    font-size: 1rem;
  }
}
.active {
  right: 0;
  z-index: 10;
  p {
    z-index: 15;
  }
}
</style>
