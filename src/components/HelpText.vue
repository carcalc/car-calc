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
      Uppe i högra hörnet på respektive bil ser du en färgad symbol som visar vilken klimatpåverkan
      bilen har:
    </p>
    <p>
      <i class="climate-dot green fas fa-leaf"></i>
      <i class=" climate-dot yellow fas fa-leaf"></i>
      <i class="climate-dot green orange fas fa-leaf"></i>
      <i class="climate-dot green red fas fa-leaf"></i>
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
