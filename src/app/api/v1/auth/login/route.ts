import { NextRequest, NextResponse } from 'next/server';

const MOCK_USERS = [
  { username: 'admin', password: 'admin', role: 'admin', name: 'Administrator' },
  { username: 'subadmin', password: 'subadmin', role: 'staff', name: 'Sub Admin' },
];

function createMockJWT(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 }));
  const signature = btoa('mock-signature');
  return `${header}.${body}.${signature}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Username và password là bắt buộc', status: 400 },
      { status: 400 },
    );
  }

  const user = MOCK_USERS.find((u) => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json(
      { error: 'unauthorized', message: 'Sai tên đăng nhập hoặc mật khẩu', status: 401 },
      { status: 401 },
    );
  }

  const token = createMockJWT({ sub: user.username, role: user.role, name: user.name });

  return NextResponse.json({ data: token, message: 'Success', status: 200 });
}
