<template>
  <div class="about">
    <h1>Information</h1>
    <h2>Källkritik</h2>
    <p>Vi kan inte garantera att den data vi presenterar på vår site stämmer till punkt och pricka. Det kan skilja sig beroende på källa. Vi har dock försökt vara grundliga och hållt oss till så oberoende källor som möjligt. Specifikation på bilarna i vår databas kommer främst från www.bilsvar.se. Bilarnas förbrukning avser blandad körning.</p>
    <h2>Beräkningar</h2>
    <p>Vi har inte tagit hänsyn till skatteskillnader i miljöbil vs icke miljöbil. Ej heller data som värdeminskning, underhåll/reparationer m.m. Vi har tagit med bonusen om upp till 60 000 kr som betalas ut till ägare av bilar med låga utsläpp (https://transportstyrelsen.se/sv/vagtrafik/Fordon/bonus-malus/). Vi har också räknat på att man som bilägare av elbil betalar 100% av bilens laddning</p>
    <ul>
      <li>
        <span>Bilens bränslekostnader:</span> bränslekostnad * förbrukning
      </li>
      <li>
        <span>Totalkostnad första året:</span> bränslekostnader * mil/år + inköpspris (- ev. bonus)
      </li>
      <li>
        <span>Totalkostnad valt antal år:</span> bränslekostnader * mil/år * antal år + inköpspris (- ev. bonus)
      </li>
      <li></li>
      <li></li>
    </ul>
    <h2>Källor</h2>
    <ul>
      <a href="www.bilsvar.se">
        <li>1. Bilsvar</li>
      </a>
      
      <a href="https://transportstyrelsen.se/sv/vagtrafik/Fordon/bonus-malus/">
        <li>2. Transportstyrelsen</li>
      </a>
      
      <a href="..">
        <li>3. Other link</li>
      </a>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
ul {
  list-style: circle;
  li {
    padding: 10px;
  }
  span {
    font-size: 1.2rem;
    color: orangered;
  }
}
</style>
