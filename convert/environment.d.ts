declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // JWT_ACCESS_KEY: string;
      // JWT_REFRESH_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
