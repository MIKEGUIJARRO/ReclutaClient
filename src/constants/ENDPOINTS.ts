export const ENDPOINTS = {
  reclutaHostNameURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : 'http://54.166.97.9',
};
