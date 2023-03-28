<template>
  <div :class="name" class="input-block">
    <label class="input-title" :for="name">{{ title }} {{ unit }}</label>
    <input
      v-on:input="$emit('input', $event.target.value)"
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      lang="sv"
      class="input-display"
      type="range"
    />
  </div>
</template>

<script>
export default {
  name: 'InputBlockRange',
  props: {
    title: { required: true, type: Number },
    name: { required: true, type: String },
    unit: { required: true, type: String },
    value: { required: true, type: Number },
    step: { required: false, type: Number, default: 1 },
    min: { required: false, type: Number, default: 0 },
    max: { required: false, type: Number },
  },
};
</script>

<style lang="scss" scoped>
.input-block {
  position: relative;
  font-style: italic;
  display: block;
  width: 100%;
  height: 100%;
}

.input-title {
  font-weight: bold;
  font-size: 0.8rem;
  position: absolute;
  top: 24px;
  left: 10px;
  font-style: italic;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }

  @media screen and (min-width: $size-tablet) {
    position: initial;
  }
}

.input-display {
  width: 100%;
  height: 100%;
  font-weight: bold;
  color: $black;
  margin: 0;
  border: none;
  display: block;
  line-height: 0;
  font-style: italic;
  outline: none;
  padding: 9px 12px 0 7px;
  font-size: 1rem;
}
</style>
