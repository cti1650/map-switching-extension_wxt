export function useQuery() {
  const sp = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const get = (k: string) => sp.get(k);
  const all = Object.fromEntries(sp.entries());
  return { get, all };
}
