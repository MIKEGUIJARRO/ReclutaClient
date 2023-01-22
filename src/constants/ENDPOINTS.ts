export const ENDPOINTS = {
  reclutaHostNameURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : 'http://www.recluta.io/',
};
