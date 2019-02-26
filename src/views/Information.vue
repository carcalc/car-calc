<template>
  <div class="information">
    <div class="text-wrapper">
      <h2>Källkritik</h2>
      <p>
        Vi kan inte garantera att den data vi presenterar på vår site stämmer till punkt och pricka. Det kan skilja sig beroende på källa. Vi har dock försökt vara grundliga och hållt oss till så oberoende källor som möjligt. Specifikation på bilarna i vår databas kommer främst från bilsvar.se
        <sup>1</sup>. Bilarnas förbrukning avser blandad körning.
      </p>
    </div>
    <hr>
    <div class="text-wrapper">
      <h2>Hur vi har beräknat</h2>
      <p>
        Vi har inte tagit hänsyn till skatteskillnader i miljöbil vs icke miljöbil. Ej heller data som värdeminskning, underhåll/reparationer m.m. Vi har tagit med bonusen om upp till 60 000 kr som betalas ut till ägare av bilar med låga utsläpp
        <sup>2</sup>. Vi har också räknat på att man som bilägare av elbil betalar 100% av bilens laddning
      </p>
    </div>
    <hr>
    <div class="list-wrapper">
      <h2>Källor</h2>
      <ul>
        <a :href="bilsvar">
          <li>1. Bilsvar</li>
        </a>
        
        <a :href="transportstyrelsen">
          <li>2. Transportstyrelsen</li>
        </a>
        
        <a href="..">
          <li>3. Other link</li>
        </a>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bilsvar: "http://www.bilsvar.se",
      transportstyrelsen:
        "https://transportstyrelsen.se/sv/vagtrafik/Miljo/Klimat/Miljobilar1/"
    };
  }
};
</script>
<style lang="scss" scoped>
.text-wrapper,
.list-wrapper {
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
  span {
    font-size: 1.2rem;
    color: orangered;
  }
}
h2 {
  margin-bottom: 1rem;
}
</style>
