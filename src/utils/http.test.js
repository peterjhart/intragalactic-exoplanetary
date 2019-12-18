import React from "react";
import http from "./http";

describe("utils/http", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should perform a get request for a url and return the response", () => {
    expect.assertions(3);
    fetch.mockResponseOnce(JSON.stringify({ xyz: 123 }));

    http.get("https://Z2l0aHViLmNvbS9qa2llbGV5").then(response => {
      expect(response.xyz).toEqual(123);
    });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("https://Z2l0aHViLmNvbS9qa2llbGV5");
  });

  it("should handle a rejection", () => {
    expect.assertions(1);
    fetch.mockReject(new Error("error message"));

    const promise = http.get("https://Z2l0aHViLmNvbS9qa2llbGV5");
    expect(promise).rejects.toBeInstanceOf(Error);
  });

  it("should handle a missing resource (404)", () => {
    expect.assertions(1);
    fetch.mockResponseOnce(JSON.stringify({ message: "Not Found" }), {
      status: 404
    });

    http.get("https://Z2l0aHViLmNvbS9qa2llbGV5").then(response => {
      expect(response.message).toEqual("Not Found");
    });
  });
});
