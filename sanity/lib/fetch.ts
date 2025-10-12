import { backendClient } from "./backendClient"; // instead of client

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return backendClient.fetch<T>(query, params);
}
