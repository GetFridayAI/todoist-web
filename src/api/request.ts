type Primitive = string | number | boolean | null | undefined;

type RequestArgs = object;
import { mockResponses } from './mocks';

const USER_ID = 'USR_2A9X1B7K';
const SESSION_TOKEN = 'SESS_91FQ3LM8ZT';

enum REQUEST_METHOD {
  GET = 'GET',
  POST = 'POST',
}

interface MockInvocation {
  route: string;
  method: REQUEST_METHOD;
  args?: RequestArgs;
}

type REQUEST_SCHEME = 'http' | 'https';

const requestScheme: REQUEST_SCHEME = "https";
const runtimeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
const isMockEnabled = runtimeEnv?.EXPO_PUBLIC_USE_MOCKS === 'true';
const BASE_URI = `${requestScheme}://`;

const withAuthArgs = (args?: RequestArgs): RequestArgs => {
  return {
    ...(args ?? {}),
    userId: USER_ID,
    sessionToken: SESSION_TOKEN,
  };
};

const normalizeRoute = (route: string): string => {
  const trimmedRoute = route.trim();
  if (!trimmedRoute) {
    throw new Error('Route is required.');
  }
  return trimmedRoute;
};

const buildQueryString = (args?: RequestArgs): string => {
  if (!args || Object.keys(args).length === 0) {
    return '';
  }

  const searchParams = new URLSearchParams();
  Object.entries(args as Record<string, unknown>).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item));
        }
      });
      return;
    }

    if (value === undefined || value === null) {
      return;
    }

    if (typeof value === 'object') {
      searchParams.set(key, JSON.stringify(value));
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

const loadMockResponse = async <TResponse>(invocation: MockInvocation): Promise<TResponse> => {
  const [pathOnly] = normalizeRoute(invocation.route).split('?');
  const normalizedPath = pathOnly.replace(/^\/+|\/+$/g, '');

  if (!normalizedPath) {
    throw new Error('Mock route cannot be empty.');
  }

  const mockResponse = mockResponses[normalizedPath];
  if (mockResponse === undefined) {
    throw new Error(`No mock response found for route: ${normalizedPath}`);
  }

  if (typeof mockResponse === 'function') {
    return (mockResponse as (input: MockInvocation) => TResponse)(invocation);
  }
  return mockResponse as TResponse;
};

export const getRequest = async <TResponse>(route: string, args?: RequestArgs): Promise<TResponse> => {
  const normalizedRoute = normalizeRoute(route);
  const enrichedArgs = withAuthArgs(args);

  if (isMockEnabled) {
    return loadMockResponse<TResponse>({ route: normalizedRoute, method: REQUEST_METHOD.GET, args: enrichedArgs });
  }

  const queryString = buildQueryString(enrichedArgs);
  const response = await fetch(`${BASE_URI}${normalizedRoute}${queryString}`, {
    method: REQUEST_METHOD.GET,
  });

  if (!response.ok) {
    throw new Error(`GET ${normalizedRoute} failed with status ${response.status}`);
  }

  return (await response.json()) as TResponse;
};

export const postRequest = async <TResponse>(route: string, args?: RequestArgs): Promise<TResponse> => {
  const normalizedRoute = normalizeRoute(route);
  const enrichedArgs = withAuthArgs(args);

  if (isMockEnabled) {
    return loadMockResponse<TResponse>({ route: normalizedRoute, method: REQUEST_METHOD.POST, args: enrichedArgs });
  }

  const response = await fetch(`${BASE_URI}${normalizedRoute}`, {
    method: REQUEST_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrichedArgs),
  });

  if (!response.ok) {
    throw new Error(`POST ${normalizedRoute} failed with status ${response.status}`);
  }

  return (await response.json()) as TResponse;
};
