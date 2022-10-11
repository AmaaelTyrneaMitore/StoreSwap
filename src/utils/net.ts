import { networkInterfaces } from 'os';

const interfaces = networkInterfaces();
const results = Object.create(null);

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]!) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof iface.family === 'string' ? 'IPv4' : 4;
    if (iface.family === familyV4Value && !iface.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(iface.address);
    }
  }
}

export const printNetworkIfaceNames = (PORT: number) => {
  console.log(`[+] Visit http://localhost:${PORT}/`);
  for (const name of Object.keys(results)) {
    for (const iface of results[name]!) {
      console.log(`[+] Visit http://${iface}:${PORT}/`);
    }
  }
};
