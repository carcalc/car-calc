<template>
  <section class="help-page">
    <h2>Hjälp</h2>
    <p>
      Jämför enkelt kostnaderna mellan två bilar genom att ändra uppgifterna som vi har förifyllt.
      Du kan också välja en bil från menyn och ändra dess specifikationer.
    </p>
    <p>
      Fyll i uppgifter som berör ägande och drift i rutan i mitten. Dessa gäller för båda bilarna
      och de förifyllda värdena går förstås bra att ändra vid behov. I rutan längst ned ser du sedan
      resultatet av jämförelsen.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.help-page {
  color: $white;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  @media screen and (min-width: $size-tablet) {
    padding: 3rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 80, 0.3);
    border-radius: $border-radius;
  }

  h2,
  p {
    margin-bottom: 1rem;
  }
}
</style>
