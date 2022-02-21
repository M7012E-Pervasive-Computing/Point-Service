import config from './config';

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const updateNamespace = (namespace: string): string => {
  return String(namespace + '        ').slice(0, 8);
};

const info = (namespace: string, message: string) => {
  console.log(
    `[${getTimeStamp()}] [\x1b[32mINFO\x1b[0m ] [${updateNamespace(
      namespace
    )}] ${message}`
  );
};

const warn = (namespace: string, message: string) => {
  console.warn(
    `[${getTimeStamp()}] [\x1b[33mWARN\x1b[0m ] [${updateNamespace(
      namespace
    )}] ${message}`
  );
};

const error = (namespace: string, message: string) => {
  console.error(
    `[${getTimeStamp()}] [\x1b[31mERROR\x1b[0m] [${updateNamespace(
      namespace
    )}] ${message}`
  );
};

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
