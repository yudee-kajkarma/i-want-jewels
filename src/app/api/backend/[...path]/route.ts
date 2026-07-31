import { NextRequest, NextResponse } from 'next/server';

const API_BASE = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(
  /\/$/,
  '',
);

const FORWARD_HEADERS = ['authorization', 'content-type', 'accept', 'accept-language'];

async function proxy(request: NextRequest, path: string[]) {
  if (!API_BASE) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Backend API is not configured. Set NEXT_PUBLIC_API_BASE_URL in .env.local and restart the dev server.',
      },
      { status: 503 },
    );
  }

  const targetUrl = `${API_BASE}/${path.join('/')}${request.nextUrl.search}`;
  const headers = new Headers();

  for (const name of FORWARD_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: 'no-store',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(targetUrl, init);
  const body = await response.arrayBuffer();
  const responseHeaders = new Headers();

  const contentType = response.headers.get('content-type');
  if (contentType) responseHeaders.set('content-type', contentType);

  return new NextResponse(body, {
    status: response.status,
    headers: responseHeaders,
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}
