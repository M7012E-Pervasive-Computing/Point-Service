import config from './config';

// Returns TimeStamp
const getTimeStamp = (): string => {
  return new Date().toISOString();
};

// slices namespace to size 8
const updateNamespace = (namespace: string): string => {
  return String(namespace + '        ').slice(0, 8);
};

/**
 * Log info
 * @param namespace string
 * @param message string
 */
const info = (namespace: string, message: string) => {
  console.log(
    `[${getTimeStamp()}] [\x1b[32mINFO\x1b[0m ] [${updateNamespace(
      namespace
    )}] ${message}`
  );
};

/**
 * Log Warning
 * @param namespace string
 * @param message string
 */
const warn = (namespace: string, message: string) => {
  console.warn(
    `[${getTimeStamp()}] [\x1b[33mWARN\x1b[0m ] [${updateNamespace(
      namespace
    )}] ${message}`
  );
};

/**
 * Log error
 * @param namespace string
 * @param message string
 */
const error = (namespace: string, message: string) => {
  console.error(
    `[${getTimeStamp()}] [\x1b[31mERROR\x1b[0m] [${updateNamespace(
      namespace
    )}] ${message}`
  );
};

/**
 * Debug log
 * @param namespace string
 * @param message string
 */
const debug = (namespace: string, message: string) => {
  if (config.debug) {
    console.debug(
      `[${getTimeStamp()}] [\x1b[36mDEBUG\x1b[0m] [${updateNamespace(
        namespace
      )}] ${message}`
    );
  }
};

export default { info, warn, error, debug };
