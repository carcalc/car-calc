<template>
  <div class="help">
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
  </div>
</template>

<style lang="scss">
.help {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  h2,
  p {
    margin-bottom: 1rem;
  }

  .help-text {
    color: $white;
  }
}
</style>
