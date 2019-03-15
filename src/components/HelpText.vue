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
      <template v-for="(car, index) in fakeCars">
        <ClimateIndicator :car="car" :key="index" />
      </template>
    </p>
    <p>
      Där grön betyder minst negativ påverkan och röd är den grupp bilar som gör störst påverkan.
    </p>
  </div>
</template>

<script>
import ClimateIndicator from '@/components/ClimateIndicator';

export default {
  components: { ClimateIndicator },
  data: function() {
    return {
      fakeCars: [{ co2: 100 }, { co2: 70 }, { co2: 50 }, { co2: 0 }],
    };
  },
};
</script>

<style lang="scss" scoped>
.climate-dot {
  display: inline-block;
  margin: 3px;
}
</style>
