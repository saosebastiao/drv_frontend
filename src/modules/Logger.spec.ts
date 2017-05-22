import Logger from "./Logger";

describe("Logger Implementation", () => {
  Logger.setTestMode();
  it("respects DEBUG log levels", () => {
    Logger.setDebug();
    expect(Logger.debug("")).toBeDefined()
    expect(Logger.info("")).toBeDefined()
    expect(Logger.warn("")).toBeDefined()
    expect(Logger.error("")).toBeDefined()
  });
  it("respects INFO log levels", () => {
    Logger.setInfo();
    expect(Logger.debug("")).toBeUndefined()
    expect(Logger.info("")).toBeDefined()
    expect(Logger.warn("")).toBeDefined()
    expect(Logger.error("")).toBeDefined()
  });
  it("respects WARN log levels", () => {
    Logger.setWarn();
    expect(Logger.debug("")).toBeUndefined()
    expect(Logger.info("")).toBeUndefined()
    expect(Logger.warn("")).toBeDefined()
    expect(Logger.error("")).toBeDefined()
  });
  it("respects ERROR log levels", () => {
    Logger.setError();
    expect(Logger.debug("")).toBeUndefined()
    expect(Logger.info("")).toBeUndefined()
    expect(Logger.warn("")).toBeUndefined()
    expect(Logger.error("")).toBeDefined()
  });
});