import { screen, render } from "@testing-library/vue";
import userEvent from '@testing-library/user-event';

import SearchBar from "./SearchBar.vue";

let mockSearch = jest.fn();
describe("<SearchBar/>", () => {

  beforeEach(() => {
    mockSearch.mockImplementation(({ target }) => null); 
  })

  it("renders the search component", () => {
    const { queryByTestId } = render(<SearchBar search={mockSearch} />);
    expect(queryByTestId("search-bar-text")).toBeTruthy();
  });
});
