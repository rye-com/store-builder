import jwt_decode from 'jwt-decode';
import { getTokenFromCookie } from 'utils';

export function identify() {
  try {
    const token = getTokenFromCookie();
    const decodedToken = jwt_decode(token);
    if (decodedToken?.email_address) {
      window.heap.identify(decodedToken.email_address);
      window.heap.addUserProperties({
        publicKey: decodedToken.public_key,
        email: decodedToken.email_address,
      });
    }
  } catch {
    // No identifying if could not get and parse token
  }
}
