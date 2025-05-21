const getEnvVar = (key: string): string => {
  const envVar = import.meta.env[key];
  if (!envVar) {
    throw new Error(`Failed to load environmental variable by key ${key}`);
  }
  return envVar;
};

export const BACKEND_API_URL = getEnvVar("VITE_BACKEND_API_URL");
