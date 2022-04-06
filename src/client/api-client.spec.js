import salesFireApiClient from "./api-client.js";
import { mockedBadRequest, mockedInternalServerError } from "./fixtures";
import axios from "axios";

jest.mock("axios");

describe("Salesfire API client", () => {
  beforeEach(() => {
    axios.get.mockImplementationOnce(() => Promise.resolve(null));
  });
  
  describe("Send Call with no HTTP error", () => {
    beforeEach(() => {
      process.env.VUE_APP_SALESFIRE_CLIENT_ID = "TEST_SALESFIRE_CLIENT_ID";
      process.env.VUE_APP_SALESFIRE_BASE_URL = "TEST_SALESFIRE_BASE_URL";
    });

    it("returns internal server error when no clientId", async () => {
      // Arrange
      delete process.env.VUE_APP_SALESFIRE_CLIENT_ID;
      // Act
      const data = await salesFireApiClient.send({ query: "TEST_QUERY" });
      // Assert
      expect(data).toEqual(mockedInternalServerError);
    });

    it("returns internal server error when no baseUrl", async () => {
      // Arrange
      delete process.env.VUE_APP_SALESFIRE_BASE_URL;
      // Act
      const data = await salesFireApiClient.send({ query: "TEST_QUERY" });
      // Assert
      expect(data).toEqual(mockedInternalServerError);
    });

    it("returns bad request when no query is given", async () => {
      // Arrange
      // Act
      const data = await salesFireApiClient.send({ query: null });
      // Assert
      expect(data).toEqual(mockedBadRequest);
    });
  });

  describe("Send call with HTTP error", () => {
    it("returns internal server error on http error", async () => {
      // Arrange
      process.env.VUE_APP_SALESFIRE_CLIENT_ID = "TEST_SALESFIRE_CLIENT_ID";
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Something bad happened..."))
      );

      // Act
      const data = await salesFireApiClient.send({ query: "TEST_QUERY" });
      // Assert
      expect(data).toEqual(mockedInternalServerError);
    });
  });
});
