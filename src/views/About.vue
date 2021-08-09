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
      <a :href="`mailto:${contact.email}`">{{ contact.email }}</a> eller hör av er till
      {{ contact.andreas.name }}
      <a :href="`mailto:${contact.andreas.email}`"><i class="far fa-envelope"></i></a>
      <a target="_blank" :href="contact.andreas.linkedIn"><i class="fab fa-linkedin-in"></i></a>
      eller
      {{ contact.gabriel.name }}
      <a :href="`mailto:${contact.gabriel.email}`"><i class="far fa-envelope"></i></a>
      <a target="_blank" :href="contact.gabriel.linkedIn"><i class="fab fa-linkedin-in"></i></a>
      direkt.
    </p>

    <h2>Beräkningar</h2>
    <p>
      Driftkostnad och skatt är betydligt lägre för elbilar än bilar med förbränningsmotor och
      mycket talar för att så även är fallet underhåll<sup>1</sup>, men det är en svår och imprecis
      beräkning att uppskatta, så vi har förnärvarande valt att utelämna den. Det kan inte
      garanteras att den data som presenteras bland exempelbilarna är 100% korrekt. Vi
      tillhandahåller en lista på vanliga bilar att utgå ifrån, men uppmanar även till att göra
      justeringar vid behov genom att mata in data från t.ex. din nuvarande bils faktiska
      förbrukning. På grund av de många variabler som påverkar en bils totala ägandekostnad ska
      siffrorna ses som väglendande snarare än en absolut sanning. Vi kan omöjligen veta exakt.
      <br />
      Miljöbilspremien<sup>2</sup>
      som betalas ut till köpare av nya elbilar är medräknad där det är relevant och så länge boxen
      är ikryssad.
    </p>
    <h2>Källor</h2>

    <ol class="references">
      <li>
        <a target="_blank" :href="references.elbilsnytt">Elbilsnytt</a>
      </li>
      <li>
        <a target="_blank" :href="references.transportstyrelsen">Transportstyrelsen</a>
      </li>
      <li>
        <a target="_blank" :href="references.bilsvar">Bilsvar</a>
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
      references: {
        elbilsnytt: 'http://elbilsnytt.se/elbilar-mycket-billigare-att-serva/',
        bilsvar: 'http://www.bilsvar.se',
        transportstyrelsen: 'https://transportstyrelsen.se/sv/vagtrafik/Miljo/Klimat/Miljobilar1/',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.about-page {
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
  i {
    margin: 0 3px;
  }
  sup {
    font-size: 0.7rem;
    color: $brand-color2;
  }
  h2,
  p {
    margin-bottom: 1rem;
    color: $white;
  }
  a {
    font-weight: bold;
    color: $brand-color2;
    text-decoration: none;
    @media screen and (min-width: $size-desktop) {
      &:hover {
        text-decoration: underline;
        color: $brand-color3;
      }
    }
  }
  ol,
  ul {
    margin-bottom: 1rem;
    li {
      color: $white;
    }
  }
  .references {
    color: $brand-color2;

    li {
      font-size: 0.8rem;
      padding: 0.5rem 0;
      margin-left: 1rem;
    }
  }
}
</style>
