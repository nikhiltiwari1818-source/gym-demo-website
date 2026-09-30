import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Gym Holic Admin Portal | Telemetry & Leads Dashboard',
  description: 'Administrative portal for Gym Holic, The Fitness Club Ambikapur. Manage live crowd meter, membership plans, affiliate links, and leads.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
