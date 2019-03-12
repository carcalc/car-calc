<template>
  <section class="about-text">
    <h2>Om CarCalc</h2>
    <p>
      Vi tror att drivkraften bakom övergången till fossilfria transporter främst kommer att vara
      ekonomiska, även om det finns många andra goda skäl till att köra elektriskt. Därför vill vi
      göra det enkelt att räkna ut besparingar i driftkostnad och ställa dem i relation till
      elbilens (för närvarande) högre inköpspris. Förhoppningsvis kan en inblick i totalkostnaden
      motivera fler människor att köra miljövänligt!
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
      Driftkostnaden är betydligt lägre för elbilar än traditionella bilar och mycket pekar på att
      så även är fallet med värdeminskning, underhåll<sup>1</sup> och skatt, men detta är svåra och
      i bästa fall imprecisa beräkningar som vi för närvarande valt att utelämna.
      Miljöbilspremien<sup>2</sup> om 60 000 kr som betalas ut till köpare av nya elbilar är
      medräknad där det är relevant.
    </p>
    <h2>Källor</h2>
    <p>
      Även om vi försöker ange korrekta biluppgifter, så kan det inte garanteras att den data som
      presenteras är hundra procent korrekt. Vi tillhandahåller en lista på vanliga bilar att utgå
      ifrån, men uppmanar även till att göra justeringar vid behov.
    </p>
    <p>
      Klimatindex samt övriga specifikationer på bilarna i databasen kommer främst från
      bilsvar.se<sup>3</sup>. Bilarnas förbrukning avser blandad körning. I beräkningarna antas det
      att man som bilägare av elbil betalar 100% av bilens laddning.
    </p>
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
