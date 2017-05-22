enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4
}

class EnvLogger {
  private isTestMode = false;
  static instance: EnvLogger;
  private logLevel = LogLevel.DEBUG;
  private log(level: LogLevel, msg: any) {
    if (this.logLevel <= level) {
      let date = new Date().toISOString();
      let label = `${date} [${LogLevel[level]}]:`
      if (this.isTestMode) {
        return label;
      } else {
        console.log(label, msg);
      }
    }
  }
  private constructor() { }
  static getLogger() {
    if (!EnvLogger.instance) {
      EnvLogger.instance = new EnvLogger();
    }
    return EnvLogger.instance;
  }
  setTestMode() { this.isTestMode = true }
  setDebug() { this.logLevel = LogLevel.DEBUG }
  setInfo() { this.logLevel = LogLevel.INFO }
  setWarn() { this.logLevel = LogLevel.WARN }
  setError() { this.logLevel = LogLevel.ERROR }
  debug(input: any) { return this.log(LogLevel.DEBUG, input); }
  info(input: any) { return this.log(LogLevel.INFO, input); }
  warn(input: any) { return this.log(LogLevel.WARN, input) };
  error(input: any) { return this.log(LogLevel.ERROR, input); }
}

export default EnvLogger.getLogger();