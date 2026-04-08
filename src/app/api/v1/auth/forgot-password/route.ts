import { NextRequest, NextResponse } from 'next/server';

const MOCK_USERS = [
  { username: 'admin', email: 'admin@ifms.com', phone: '0912345678', cccd: '012345678901' },
  { username: 'subadmin', email: 'subadmin@ifms.com', phone: '0987654321', cccd: '098765432109' },
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, email, phone, cccd } = body;

  if (!username || !email || !phone || !cccd) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Vui lòng nhập đầy đủ thông tin', status: 400 },
      { status: 400 },
    );
  }

  const user = MOCK_USERS.find(
    (u) => u.username === username && u.email === email && u.phone === phone && u.cccd === cccd,
  );

  if (!user) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Thông tin không khớp với tài khoản nào', status: 400 },
      { status: 400 },
    );
  }

  return NextResponse.json({
    data: `OTP sent to ${email}`,
    message: 'Success',
    status: 200,
  });
}
