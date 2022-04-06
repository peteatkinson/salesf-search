<template>
  <div data-testid="results-set" class="results-set__container">
    <span
      data-testid="results-set-hint-text"
      class="results-set__hint-text"
      v-if="!isError && products?.length === 0 && query?.length > 0"
    >
      Found 0 products for <b>{{ query }}</b>. Maybe try a different search.
    </span>
    <ul 
      data-testid="results-set-product-cards" 
      v-else-if="products?.length > 0 && !isError" 
      class="results-set"
    >
      <li
        v-for="product in products"
        :key="product.id"
        data-testid="results-set-product-card"
        class="results-set__product-card"
      >
        <div class="results-set__product-card--image-container">
          <img
            class="results-set__product-card--image"
            :src="product.imageUrl"
          />
        </div>
        <h3 class="results-set__product-card--title">{{ product.title }}</h3>
        <span class="results-set__product-card--pricing"
          >From {{ product.price }}</span
        >
        <a
          class="results-set__product-card--link"
          target="_blank"
          :href="product.link"
        >
          View
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  methods: {},
  setup() {
    const store = useStore();

    const transformProduct = (product) => {
      /**
       * Should probably put this somewhere else (maybe the action/mutator?)
       */
      const { id, title, price, link } = product;
      const imageUrl = product["image_url"];

      const formattedPrice = price?.min.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      });

      return {
        id,
        title,
        price: formattedPrice,
        link,
        imageUrl,
      };
    };
    const products = computed(() => 
      store.state.products.map((product) => transformProduct(product))
    );

    const isError = computed(() => store.state.isError);
    const query = computed(() => store.state.query?.query);

    return {
      products,
      isError,
      query,
    };
  },
};
</script>

<style lang="scss" scoped>
.results-set {
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 64px;
  &__hint-text {
    margin-top: 32px;
    display: block;
  }

  &__product-card {
    box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;

    &--image-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    &--image {
      height: 320px;
      width: 320px;
    }
    &--title {
      font-size: 16px;
      font-weight: normal;
      max-width: 50%;
    }
    &--pricing {
      font-size: 16px;
      font-weight: bold;
    }
    &--link {
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 16px 16px;
      text-decoration: none;
      font-size: 14px;
      margin-top: 16px;
      color: #fff;
      font-weight: bold;
      min-width: 60%;
      background-color: #000;
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        background-color: lighten(#000, 8%);
      }
    }
  }
}
</style>
