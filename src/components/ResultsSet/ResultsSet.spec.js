import { render } from "@testing-library/vue";

import ResultsSet from "./ResultsSet.vue";
import Vuex from "vuex";

import { mockDefaultStore, mockErrorStore, mockSuccessStore } from "./fixtures";

const renderComponent = (customStore) => {
  return render(<ResultsSet />, {
    global: {
      plugins: [
        new Vuex.Store({
          state: { ...customStore },
        }),
      ],
    },
  });
};

describe("<ResultsSet />", () => {
  it("shows no search results when no products are in the store", () => {
    // Arrange
    const { queryByTestId } = renderComponent(mockErrorStore);
    
    // Act
    // Assert
    expect(queryByTestId("results-set-product-cards")).toBeFalsy();
  });

  it("shows products when products are in the store", async () => {
    // Arrange
    const { queryByTestId } = renderComponent(mockSuccessStore);

    // Act
    // Assert
    expect(queryByTestId("results-set-product-cards")).toBeTruthy();
  });

  it("does not show the hint message when no query has been made", async () => {
    // Arrange
    const { queryByTestId } = renderComponent(mockDefaultStore);

    // Act
    // Assert
    expect(queryByTestId("results-set-hint-text")).toBeFalsy();
  });
});
