import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const status = store.getCrowdStatus();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve crowd status' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = store.updateCrowdStatus(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update crowd status' }, { status: 500 });
  }
}
