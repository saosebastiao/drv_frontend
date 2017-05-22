import AdminClient from "./AdminClient";

describe("PartierClient TestSuite", () => {
  let client = AdminClient;
  it("gets my profile", async () => {
    let x = client.getMyProfile();
    expect(x).toBeTruthy();
  });

});
