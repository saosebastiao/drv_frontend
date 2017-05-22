import VenueClient from "./PartierClient";

describe("PartierClient TestSuite", () => {
  let client = VenueClient;
  it("gets my profile", async () => {
    let x = client.getMyProfile();
    expect(x).toBeTruthy();
  });

});