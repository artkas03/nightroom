import { getAccessToken } from "../auth/token";
import { ApiError } from "./apiError";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiClientOptions = {
  baseUrl: string;
  getAccessToken?: () => string | null;
};

export class ApiClient {
  private baseUrl: string;
  private getAccessToken?: () => string | null;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.getAccessToken = options.getAccessToken;
  }

  async request<TResponce, TBody>(
    path: string,
    method: HttpMethod = "GET",
    body?: TBody,
    init?: Omit<RequestInit, "method" | "body">
  ): Promise<TResponce> {
    const url = `${this.baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

    const headers = new Headers(init?.headers);
    if (body !== undefined) headers.set("Content-Type", "application/json");

    const token =  this.getAccessToken?.();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
      ...init
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    const parsed = await (isJson ? res.json() : res.text());

    if (!res.ok) {
      const message = parsed?.message || `Request failed with status ${res.status}`;
      throw new ApiError(message, res.status, parsed);
    }

    return parsed as TResponce;
  }

  async get<TResponce>(path: string, init?: Omit<RequestInit, "method">): Promise<TResponce> {
    return this.request<TResponce, undefined>(path, "GET", undefined, init);
  }

  async post<TResponce, TBody>(path: string, body: TBody, init?: Omit<RequestInit, "method">): Promise<TResponce> {
    return this.request<TResponce, TBody>(path, "POST", body, init);
  }

  async put<TResponce, TBody>(path: string, body: TBody, init?: Omit<RequestInit, "method">): Promise<TResponce> {
    return this.request<TResponce, TBody>(path, "PUT", body, init);
  }

  async patch<TResponce, TBody>(path: string, body: TBody, init?: Omit<RequestInit, "method">): Promise<TResponce> {
    return this.request<TResponce, TBody>(path, "PATCH", body, init);
  }

  async delete<TResponce>(path: string, init?: Omit<RequestInit, "method">): Promise<TResponce> {
    return this.request<TResponce, undefined>(path, "DELETE", undefined, init);
  }
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

const api = new ApiClient({
  baseUrl: baseUrl,
  getAccessToken: getAccessToken
});

export default api;