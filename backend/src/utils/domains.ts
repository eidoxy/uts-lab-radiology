import { Request } from 'express';

export const allowedDomains = [
  'http://192.168.1.7:8083',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:8083',
  'http://localhost:8084',
  'http://103.101.225.18:8080',
  'http://103.101.225.18:8081',
  'http://103.101.225.18:8082',
  'http://103.101.225.18:8083',
  'http://103.101.225.18:8084',
  'http://103.101.225.18:3000',
  'http://lnr.chasterise.fun',
  'https://lnr.chasterise.fun',
];

// Function to get the cookie domain
export const getCookieDomain = (req: Request): string | undefined => {
  const origin = req.headers.origin || `http://${req.headers.host}`;
  if (!origin) return undefined;

  const matchedDomain = allowedDomains.find((domain) =>
    origin.includes(domain)
  );
  return matchedDomain || undefined;
};
