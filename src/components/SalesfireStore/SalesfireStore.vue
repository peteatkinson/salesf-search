<template>
  <div class="store__container">
    <div class="store">
      <SearchBar :search="search" />
      <ResultsSet />
    </div>
  </div>
</template>

<script>
import SearchBar from "../SearchBar/SearchBar.vue";
import ResultsSet from "../ResultsSet/ResultsSet.vue";

import { useStore } from "vuex";

export default {
  components: {
    SearchBar,
    ResultsSet,
  },
  setup() {
    const store = useStore();
    const search = async ({ target }) => {
      const value = target?.value;
      store.dispatch("update", { query: value });
    };

    return {
      search,
    };
  },
};
</script>