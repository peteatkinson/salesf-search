<template>
  <div class="search-bar__container">
    <div class="search-bar">
      <input
        class="search-bar__input"
        data-testid="search-bar-text"
        name="input"
        placeholder="Search for Armani, Gucci, Baume &amp; Mercier..."
        type="text"
        @keydown="handler"
      />
    </div>
  </div>
</template>

<script>
import debounce from "debounce";
export default {
  props: ["search"],
  setup(props) {
    const handler = debounce(props.search, 300);
    return {
      handler,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  &__input {
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    margin: 0;
    min-width: 560px;
    width: 560px;
    border: 0px solid transparent;
    font-size: 16px;
    background-color: #f3f3f4;
    color: #000;
    padding-left: 16px;
    padding-right: 16px;
    height: 64px;
    max-height: 64px;
    font-weight: bold;
    border-radius: 8px;
    margin: 0;
    box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
    &::placeholder {
      color: #000;
      font-style: normal;
    }
    &:active,
    &:focus {
      margin: 0;
      border: none;
      outline: none;
    }
  }
}
</style>
