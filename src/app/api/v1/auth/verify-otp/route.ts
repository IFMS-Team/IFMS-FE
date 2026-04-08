import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const VALID_OTP = '123456';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Email và OTP là bắt buộc', status: 400 },
      { status: 400 },
    );
  }

  if (otp !== VALID_OTP) {
    return NextResponse.json(
      { error: 'field validation failed', message: 'Mã OTP không đúng', status: 400 },
      { status: 400 },
    );
  }

  const resetToken = randomUUID();

  return NextResponse.json({ data: resetToken, message: 'Success', status: 200 });
}
