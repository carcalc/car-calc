<template>
  <section class="about-text">
    <h2>Om</h2>
    <p>
      Vi tror att drivkraften bakom övergången till fossilfria transporter främst kommer att vara
      ekonomiska, även om det finns många andra goda skäl till att köra elektriskt. Därför vill vi
      göra det enkelt att räkna ut besparingar i driftkostnad och ställa dem i relation till
      elbilens (för närvarande) högre inköpspris. Förhoppningsvis kan en inblick i totalkostnaden
      motivera fler människor att köra miljövänligt! Men självklart går det bra att jämföra andra
      sorters bilar också.
    </p>
    <h2>Om oss</h2>
    <p>
      Vi som utvecklat denna sajt heter Andreas och Gabriel. Vi har själva saknat en app där man på
      ett enkelt och smidigt sätt kan jämföra kostnaderna över tid mellan elbil och vanlig bil.
      Kontakta oss gärna med feedback och idéer!
    </p>

    <h2>Beräkningar</h2>
    <p>
      Drift-, skatte- och underhållskostnader är ofta betydligt lägre för elbilar än traditionella
      bilar och mycket pekar på att så även är fallet med värdeminskning, men de är svåra och i
      bästa fall imprecisa beräkningar som vi för närvarande valt att utesluta i v1.0.
    </p>
    <p>
      Bonusen om 60 000 kr som betalas ut till ägare av bilar med låga utsläpp är medräknad när det
      är relevant.
      <sup>1</sup>.
    </p>
    <h2>Källor</h2>
    <p>
      Även om vi försöker ange korrekta biluppgifter, så kan det inte garanteras att den data som
      presenteras är hundra procent korrekt. Dock har det använts så oberoende källor som möjligt.
      Vi tillhandahåller en lista på vanliga bilar att välja från, men uppmanar även till att göra
      justeringar vid behov.
    </p>
    <p>
      De färgade markörerna bredvid bilnamnen anger vilken klimatpåverkan bilen har. De finns i
      färgerna grön, gul, orange samt röd, där grön är den som gör minst klimatpåverkan och röd
      störst. Detta klimatindex samt övriga specifikationer på bilarna i databasen kommer främst
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
