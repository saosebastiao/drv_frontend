enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

class EnvLogger {
  private isTestMode = false;
  public static instance: EnvLogger;
  private logLevel = LogLevel.DEBUG;
  private log(level: LogLevel, msg: any) {
    if (this.logLevel <= level) {
      const date = new Date().toISOString();
      const label = `${date} [${LogLevel[level]}]:`;
      if (this.isTestMode) {
        return label;
      } else {
        // tslint:disable-next-line:no-console
        console.log(label, msg);
        return undefined;
      }
    } else return undefined;
  }
  private constructor() { }
  public static getLogger() {
    if (!EnvLogger.instance) {
      EnvLogger.instance = new EnvLogger();
    }
    return EnvLogger.instance;
  }
  public setTestMode() { this.isTestMode = true; }
  public setDebug() { this.logLevel = LogLevel.DEBUG; }
  public setInfo() { this.logLevel = LogLevel.INFO; }
  public setWarn() { this.logLevel = LogLevel.WARN; }
  public setError() { this.logLevel = LogLevel.ERROR; }
  public debug(input: any) { return this.log(LogLevel.DEBUG, input); }
  public info(input: any) { return this.log(LogLevel.INFO, input); }
  public warn(input: any) { return this.log(LogLevel.WARN, input); }
  public error(input: any) { return this.log(LogLevel.ERROR, input); }
}

export default EnvLogger.getLogger();
