import config from './config';

/**
 * Get current time stamp used for logging
 * @returns time stamp
 */
const getTimeStamp = (): string => {
  return new Date().toISOString();
};

/**
 * Reshape namespace
 * @param namespace of file
 * @returns namespace with length
 */
const updateNamespace = (namespace: string): string => {
  return String(namespace + '          ').slice(0, 10);
};

/**
 * Log info
 * @param namespace Name of file, class or function
 * @param message to be printed
 * @param object which may be printed
 */
const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.log(
      `[${getTimeStamp()}] [\x1b[32mINFO\x1b[0m ] [${updateNamespace(
        namespace
      )}] ${message}, object`
    );
  } else {
    console.log(
      `[${getTimeStamp()}] [\x1b[32mINFO\x1b[0m ] [${updateNamespace(
        namespace
      )}] ${message}`
    );
  }
};

/**
 * Log warnings
 * @param namespace Name of file, class or function
 * @param message to be printed
 * @param object which may be printed
 */
const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(
      `[${getTimeStamp()}] [\x1b[33mWARN\x1b[0m ] [${updateNamespace(
        namespace
      )}] ${message}, object`
    );
  } else {
    console.warn(
      `[${getTimeStamp()}] [\x1b[33mWARN\x1b[0m ] [${updateNamespace(
        namespace
      )}] ${message}`
    );
  }
};

/**
 * Log error
 * @param namespace Name of file, class or function
 * @param message to be printed
 * @param object which may be printed
 */
const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      `[${getTimeStamp()}] [\x1b[31mERROR\x1b[0m] [${updateNamespace(
        namespace
      )}] ${message}, object`
    );
  } else {
    console.error(
      `[${getTimeStamp()}] [\x1b[31mERROR\x1b[0m] [${updateNamespace(
        namespace
      )}] ${message}`
    );
  }
};

/**
 * Log debug
 * @param namespace Name of file, class or function
 * @param message to be printed
 * @param object which may be printed
 */
const debug = (namespace: string, message: string, object?: any) => {
  if (config.debug) {
    if (object) {
      console.debug(
        `[${getTimeStamp()}] [\x1b[36mDEBUG\x1b[0m] [${updateNamespace(
          namespace
        )}] ${message}, object`
      );
    } else {
      console.debug(
        `[${getTimeStamp()}] [\x1b[36mDEBUG\x1b[0m] [${updateNamespace(
          namespace
        )}] ${message}`
      );
    }
  }
};

export default { info, warn, error, debug };
