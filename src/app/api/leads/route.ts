import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const leads = store.getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, goal, source, planInterest, bmiData, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const lead = store.addLead({
      name,
      phone,
      email: email || undefined,
      goal: goal || 'General Fitness',
      source: source || 'contact',
      planInterest: planInterest || undefined,
      bmiData: bmiData || undefined,
      notes: notes || undefined,
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const success = store.updateLeadStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}
