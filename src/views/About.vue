<template>
  <div class="about">
    <div class="about-wrapper">
      <h2>Om Oss</h2>
      <p>Vi som gjort denna site är Andreas och Gabriel. Det är vårat ex-jobb på vår utbildning till frontendutvecklare på Nackademin. Syftet är främst för oss att lära oss jobba i projekt "från ax till limpa", men även leverera en användbar produkt. Vi har valt att jobba i ramverket vue, vilket för oss var helt outforskad mark. Stora delar av projekttiden har gått till att lära oss ramverket. Vi har försökt använda oss av "best practice" när det kommer till upplägg och kodning.</p>
    </div>
    <hr>
    <div class="contact-wrapper">
      <h2>Kontakt</h2>
      <p>Vid frågor kan ni nå oss via Linkedin!</p>
      <h4>
        Andreas:
        <i class="fab fa-linkedin-in fa-lg"></i>
      </h4>
      <h4>
        Gabriel:
        <i class="fab fa-linkedin-in fa-lg"></i>
      </h4>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.about-wrapper,
.contact-wrapper {
  margin: 0 auto;
  padding: 2rem;
  width: 80%;
}
i.fab {
  color: #0077b5;
  cursor: pointer;
}
hr {
  width: 50%;
  margin: auto;
}
</style>
