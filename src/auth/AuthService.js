import { useCookies } from 'vue3-cookies';

const COOKIE_NAME = 'id';

export function getCookie() {
  const { cookies } = useCookies();
  return cookies.get(COOKIE_NAME);
}