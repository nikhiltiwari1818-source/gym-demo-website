import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const leads = store.getLeads();

    // Generate CSV
    const headers = [
      'Lead ID',
      'Name',
      'Phone',
      'Email',
      'Goal',
      'Source',
      'Plan Interest',
      'BMI Score',
      'BMI Category',
      'Status',
      'Created At',
      'Notes',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.goal || '').replace(/"/g, '""')}"`,
      `"${l.source}"`,
      `"${(l.planInterest || '').replace(/"/g, '""')}"`,
      l.bmiData?.bmi ? l.bmiData.bmi : '',
      `"${(l.bmiData?.category || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="gymholic_leads_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export leads' }, { status: 500 });
  }
}
