import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { reset_token, new_password, confirm_password } = body;

  if (!reset_token || !new_password || !confirm_password) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Vui lòng nhập đầy đủ thông tin', status: 400 },
      { status: 400 },
    );
  }

  if (new_password !== confirm_password) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Mật khẩu xác nhận không khớp', status: 400 },
      { status: 400 },
    );
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(new_password)) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Mật khẩu không đáp ứng yêu cầu bảo mật', status: 400 },
      { status: 400 },
    );
  }

  return NextResponse.json({ data: 'Password reset successfully', message: 'Success', status: 200 });
}
