<template>
  <section class="about-page">
    <h2>Om CarCalc</h2>
    <p>
      Vi tror att drivkraften bakom övergången till fossilfria transporter främst är ekonomiska,
      även om det finns många andra goda skäl till att köra elektriskt. Därför vill vi göra det
      enkelt att räkna ut besparingar i driftkostnad och ställa dem i relation till elbilens högre
      inköpspris. Förhoppningsvis kan en inblick i totalkostnaden motivera fler människor att köra
      miljövänligt!
    </p>
    <h2>Om oss</h2>
    <p>
      Vi som utvecklat denna sajt heter {{ contact.andreas.name }} och {{ contact.gabriel.name }}.
      Kontakta oss gärna med feedback och idéer på
      <a :href="`mailto:${contact.email}`">{{ contact.email }}</a
      >.
    </p>

    <h2>Beräkningar</h2>
    <p>
      Driftkostnad och skatt <sup>1</sup> är betydligt lägre för elbilar än bilar med
      förbränningsmotor och mycket talar för att så även är fallet underhåll<sup>2</sup>, men det är
      en svår och imprecis beräkning att uppskatta, så vi har förnärvarande valt att utelämna den.
      Det kan inte garanteras att den data som presenteras bland exempelbilarna är 100% korrekt. Vi
      tillhandahåller en lista på vanliga bilar att utgå ifrån, men uppmanar även till att göra
      justeringar vid behov genom att mata in data från t.ex. din nuvarande bils faktiska
      förbrukning. På grund av de många variabler som påverkar en bils totala ägandekostnad ska
      siffrorna ses som väglendande snarare än en absolut sanning. Vi kan omöjligen veta exakt.
    </p>
    <p>
      Miljöbilspremien<sup>3</sup>
      som betalas ut till köpare av nya elbilar är medräknad där det är relevant och så länge boxen
      är ikryssad.
    </p>
    <h2>Källor</h2>

    <ol class="references">
      <li v-for="ref in references" :key="ref.title">
        <a target="_blank" :href="ref.url">{{ ref.title }}</a>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: 'About',
  props: { contact: { type: Object, required: true } },
  data() {
    return {
      references: [
        {
          title: 'Bavaria',
          url: 'https://bavariabil.se/Bilguiden/Infor-bilkopet/bonus-malus/',
        },
        {
          title: 'Elbilsnytt',
          url: 'http://elbilsnytt.se/elbilar-mycket-billigare-att-serva/',
        },
        {
          title: 'Transportstyrelsen',
          url: 'https://www.transportstyrelsen.se/sv/vagtrafik/Fordon/bonus-malus/bonus/berakna-din-preliminara-bonus/',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.about-page {
  @include info-page();
}
</style>
