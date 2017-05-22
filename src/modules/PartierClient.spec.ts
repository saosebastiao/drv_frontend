import PartierClient from "./PartierClient";

describe("PartierClient TestSuite", () => {
  let client = PartierClient;
  it("gets my profile", async () => {
    let x = client.getMyProfile();
    expect(x).toBeTruthy();
  });

});