<template>
  <section class="sources">
    <h2>Beräkningar</h2>
    <p>
      Det har inte tagits hänsyn till skatteskillnader i miljöbil vs icke miljöbil. Ej heller data
      som värdeminskning, underhåll/reparationer m.m. Bonusen om 60 000 kr som betalas ut till ägare
      av bilar med låga utsläpp är medräknad när det är relevant.
      <sup>1</sup>.
    </p>
    <h2>Källor</h2>
    <p>
      Det kan inte garanteras att den data som presenteras på denna site stämmer till punkt och
      pricka. Det kan skilja sig beroende på källa. Dock har det använts så oberoende källor som
      möjligt. De färgade markörerna bredvid bilnamnen anger vilken klimatpåverkan bilen har. De
      finns i färgerna grön, gul, orange samt röd, där grön är den som gör minst klimatpåverkan och
      röd störst. Detta klimatindex samt övriga specifikationer på bilarna i databasen kommer främst
      från bilsvar.se
      <sup>2</sup>. Bilarnas förbrukning avser blandad körning. I beräkningarna antas det att man
      som bilägare av elbil betalar 100% av bilens laddning.
    </p>
    <ol>
      <li>
        <a :href="transportstyrelsen">Transportstyrelsen</a>
      </li>
      <li>
        <a :href="bilsvar">Bilsvar</a>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bilsvar: 'http://www.bilsvar.se',
      transportstyrelsen: 'https://transportstyrelsen.se/sv/vagtrafik/Miljo/Klimat/Miljobilar1/',
    };
  },
};
</script>
<style lang="scss" scoped>
ol {
  color: $accent-color;
  li {
    font-size: 0.8rem;
    padding: 0.5rem 0;
    a {
      font-weight: bold;
      color: $accent-color;
    }
  }
}

h2,
p {
  margin-bottom: 1rem;
  color: $white;
}
</style>
