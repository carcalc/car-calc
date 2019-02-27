<template>
  <div class="information">
    <div class="text-wrapper">
      <h2>Beräkningar</h2>
      <p>
        Det har inte tagit hänsyn till skatteskillnader i miljöbil vs icke
        miljöbil. Ej heller data som värdeminskning, underhåll/reparationer m.m.
        Bonusen om 60 000 kr som betalas ut till ägare av bilar med låga utsläpp
        är medräknad när det är relevant.
        <sup>1</sup>.
      </p>
    </div>
    <hr />
    <div class="text-wrapper">
      <h2>Källor</h2>
      <p>
        Det kan inte garanteras att den data som presenteras på denna site
        stämmer till punkt och pricka. Det kan skilja sig beroende på källa.
        Dock har det använts så oberoende källor som möjligt. Specifikation på
        bilarna i databasen kommer främst från bilsvar.se
        <sup>2</sup>. Bilarnas förbrukning avser blandad körning. I
        beräkningarna antas det att man som bilägare av elbil betalar 100% av
        bilens laddning.
      </p>
    </div>

    <div class="list-wrapper">
      <ul>
        <a :href="transportstyrelsen">
          <li>1. Transportstyrelsen</li>
        </a>
        <a :href="bilsvar">
          <li>2. Bilsvar</li>
        </a>
      </ul>
    </div>
    <hr />
    <div class="contact-wrapper">
      <h2>Kontakt</h2>
      <p>Vid frågor kan ni nå oss via Linkedin</p>
      <h4>
        Andreas:
        <a :href="linkedInAndreas">
          <i class="fab fa-linkedin-in fa-lg"></i>
        </a>
      </h4>
      <h4>
        Gabriel:
        <a :href="linkedInGabriel">
          <i class="fab fa-linkedin-in fa-lg"></i>
        </a>
      </h4>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bilsvar: "http://www.bilsvar.se",
      transportstyrelsen:
        "https://transportstyrelsen.se/sv/vagtrafik/Miljo/Klimat/Miljobilar1/",
      linkedInAndreas: "http://www.linkedin.com/in/andreas-hansson-",
      linkedInGabriel: "http://www.linkedin.com/in/andreas-hansson-"
    };
  }
};
</script>
<style lang="scss" scoped>
.text-wrapper,
.list-wrapper,
.contact-wrapper {
  margin: 0 auto;
  padding: 2rem;
  width: 80%;
}

hr {
  width: 50%;
  margin: auto;
}

ul {
  li {
    padding: 10px;
  }
}
h2 {
  margin-bottom: 1rem;
  color: orangered;
}
i.fab {
  color: #0077b5;
  cursor: pointer;
}
</style>
