<template>
  <div :class="name" class="input-block">
    <label class="input-title" :for="name">{{ title }}</label>
    <input
      v-model.number="newValue"
      v-on:input="handleInput"
      :placeholder="placeholder"
      :name="name"
      :step="step"
      :min="min"
      :max="max"
      :inputmode="noDecimals ? 'numeric' : 'decimal'"
      lang="sv"
      class="input-display"
      type="number"
      pattern="[0-9]*"
    />
    <span class="input-display-unit">{{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: 'InputBlockNumber',
  data() {
    return { newValue: this.value };
  },
  props: {
    title: { required: true, type: String },
    name: { required: true, type: String },
    unit: { required: true, type: String },
    value: { required: true, type: Number },
    step: { required: false, type: Number, default: 1 },
    min: { required: false, type: Number, default: 0 },
    max: { required: false, type: Number },
    maxLength: { required: false, type: Number },
    placeholder: { required: false, type: String, default: 'Fyll i' },
    noDecimals: { required: false, type: Boolean, default: false },
  },
  methods: {
    handleInput: function (e) {
      this.newValue = this.sanitizeInput(e.target.value);
      this.$emit('input', this.newValue);
    },
    sanitizeInput: function (input) {
      const isMax = input.length >= this.maxLength;
      input = isMax ? input.substring(0, this.maxLength) : (this.newValue = input);
      return parseFloat(input);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-block {
  position: relative;
  height: 60px;

  @media screen and (min-width: $size-small-tablet) {
    height: 70px;
  }

  @media screen and (min-width: $size-tablet) {
    height: 90px;
  }
}

.input-title {
  font-weight: bold;
  font-size: 0.8rem;
  position: absolute;
  top: 5px;
  left: 10px;
  font-style: italic;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
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
  border-radius: $border-radius;
  border: 3px solid transparent;
  background-color: $input-bg;
  line-height: 0;
  font-style: italic;
  outline: none;
  padding: 9px 12px 0px 7px;
  font-size: 1.7rem;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 1.8rem;
    padding: 17px 15px 3px 10px;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 2.5rem;
  }

  &:focus,
  &:hover {
    caret-color: $brand-color2;
    border: $input-focus-border;
  }

  &-display-unit {
    font-weight: bold;
    font-size: 0.5rem;
    font-style: italic;
    position: absolute;
    margin: 0;
    bottom: 3px;
    right: 10px;

    @media screen and (min-width: $size-small-tablet) {
      font-size: 0.6rem;
    }
    @media screen and (min-width: $size-tablet) {
      font-size: 0.8rem;
    }
  }
}
</style>
