

interface ImportMetaEnv {
    readonly VITE_SEC_KEY: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
