<template>
  <div class="help-text">
    <h2>Användarhjälp</h2>
    <p>
      Jämför enkelt kostnaderna mellan två bilar genom att ändra uppgifterna som vi har förifyllt.
      Du kan också välja en bil från menyn och ändra dess specifikationer.
    </p>
    <p>
      Fyll i uppgifter som berör ägande och drift i rutan i mitten. Dessa gäller för båda bilarna
      och de förifyllda värdena går förstås bra att ändra vid behov. I rutan längst ned ser du sedan
      resultatet av jämförelsen.
    </p>
    <p>
      Uppe i högra hörnet på respektive bil ser du en färgad prick som visar vilken klimatpåverkan
      bilen har:
    </p>
    <p>
      <span class="climate-dot green"></span>
      <span class="climate-dot yellow"></span>
      <span class="climate-dot orange"></span>
      <span class="climate-dot red"></span>
    </p>
    <p>
      Där grön betyder minst negativ påverkan och röd är den grupp bilar som gör störst påverkan.
    </p>
  </div>
</template>
<style lang="scss" scoped>
.climate-dot {
  @include climate-dot();
  display: inline-block;
  margin: 3px;
}
</style>
