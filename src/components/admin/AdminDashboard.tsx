'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Flame,
  CreditCard,
  ShoppingBag,
  Download,
  Activity,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  Lock,
  ArrowLeft,
  Calendar,
  Save,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { Lead, CrowdStatus, MembershipPlan, AffiliateProduct } from '@/types';
import { INITIAL_CROWD_STATUS, INITIAL_MEMBERSHIP_PLANS, INITIAL_AFFILIATE_PRODUCTS } from '@/lib/seed-data';
import { formatINR } from '@/lib/utils';
import { GYM_DETAILS } from '@/lib/constants';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'crowd' | 'plans' | 'affiliates'>('overview');

  // Leads
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Live Crowd Control
  const [crowd, setCrowd] = useState<CrowdStatus>(INITIAL_CROWD_STATUS);
  const [crowdLevel, setCrowdLevel] = useState<CrowdStatus['level']>('MODERATE');
  const [occupancy, setOccupancy] = useState<number>(38);
  const [maxCap, setMaxCap] = useState<number>(110);
  const [crowdMsg, setCrowdMsg] = useState<string>('Comfortable workout conditions. Ample free benches.');
  const [isSavingCrowd, setIsSavingCrowd] = useState(false);
  const [crowdSavedSuccess, setCrowdSavedSuccess] = useState(false);

  // Membership Plans
  const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);

  // Affiliate Products
  const [affiliates, setAffiliates] = useState<AffiliateProduct[]>(INITIAL_AFFILIATE_PRODUCTS);

  const correctPin = 'gymholic2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPin) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Admin PIN. (Default demo PIN is: gymholic2026)');
    }
  };

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const fetchCrowd = async () => {
    try {
      const res = await fetch('/api/crowd');
      if (res.ok) {
        const data = await res.json();
        setCrowd(data);
        setCrowdLevel(data.level);
        setOccupancy(data.currentOccupancy);
        setMaxCap(data.maxCapacity);
        setCrowdMsg(data.statusMessage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
      fetchCrowd();
    }
  }, [isAuthenticated]);

  const handleSaveCrowd = async () => {
    setIsSavingCrowd(true);
    try {
      const res = await fetch('/api/crowd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: crowdLevel,
          currentOccupancy: Number(occupancy),
          maxCapacity: Number(maxCap),
          statusMessage: crowdMsg,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCrowd(updated);
        setCrowdSavedSuccess(true);
        setTimeout(() => setCrowdSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingCrowd(false);
    }
  };

  const handleUpdateLeadStatus = async (id: string, status: Lead['status']) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSource =
      sourceFilter === 'ALL' || l.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b] p-4 text-white">
        <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-amber-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-black flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white">GYM HOLIC ADMIN</h2>
            <p className="text-xs text-zinc-400">
              Authorized Management & Telemetry Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                Admin Passcode / PIN
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-700 text-white text-sm outline-none focus:border-amber-400"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Demo access PIN: <code className="text-amber-400 font-mono">gymholic2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.01] transition-all"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Top Admin Nav */}
      <header className="border-b border-zinc-800 bg-[#0f0f14] sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            title="View Live Site"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-base font-black tracking-wider flex items-center gap-2">
              <span>GYM HOLIC</span>
              <span className="text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                COMMAND CENTER
              </span>
            </h1>
            <p className="text-[10px] text-zinc-400">Ambikapur, Chhattisgarh</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/leads/export"
            download
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Leads CSV</span>
          </a>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
          >
            Lock Dashboard
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
          {[
            { id: 'overview', label: '📊 Executive Overview' },
            { id: 'crowd', label: '🔥 Live Gym Busy Meter Controller' },
            { id: 'leads', label: `👥 Leads & Enquiries (${leads.length})` },
            { id: 'plans', label: '💳 Membership Pricing' },
            { id: 'affiliates', label: '🛍️ Affiliate Store Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Total Leads Captured</span>
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">{leads.length}</div>
                <div className="text-[11px] text-emerald-400 mt-1">Across Web & WhatsApp</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Current Live Occupancy</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-amber-400">
                  {crowd.percentage}%
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {crowd.currentOccupancy} Athletes on floor
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Free VIP Passes Issued</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {leads.filter((l) => l.source === 'free_trial').length}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">High conversion trial pipeline</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>AI Diet Plans Generated</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {leads.filter((l) => l.source === 'diet_plan').length}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">PDFs delivered with 10% coupon</div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-white">
                  Export Member Enquiries & Database
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Export all member names, phone numbers, BMI data, and goals to Excel/Google Sheets.
                </p>
              </div>
              <a
                href="/api/leads/export"
                download
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Full CSV</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE CROWD METER CONTROLLER */}
        {activeTab === 'crowd' && (
          <div className="max-w-3xl rounded-3xl bg-zinc-900 border border-amber-500/30 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Telemetry Overrides
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                UPDATE LIVE GYM BUSY METER
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Manually control the status shown on the homepage and mobile apps in real-time.
              </p>
            </div>

            {/* Level Toggle Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                Crowd Traffic Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'LOW', label: 'LOW TRAFFIC (<35%)', color: 'emerald' },
                  { id: 'MODERATE', label: 'MODERATE TRAFFIC (35-70%)', color: 'amber' },
                  { id: 'HIGH', label: 'HIGH TRAFFIC / RUSH (>70%)', color: 'red' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setCrowdLevel(lvl.id as any)}
                    className={`py-3 px-3 rounded-xl border text-center text-xs font-extrabold transition-all ${
                      crowdLevel === lvl.id
                        ? 'bg-amber-400 text-black border-amber-400 shadow-lg'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Occupancy & Max Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-zinc-300">Current Occupancy Count</span>
                  <span className="text-amber-400">{occupancy} Athletes</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-zinc-300">Max Floor Capacity</span>
                  <span className="text-zinc-400">{maxCap} Max</span>
                </div>
                <input
                  type="number"
                  value={maxCap}
                  onChange={(e) => setMaxCap(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-zinc-700 text-white text-xs outline-none"
                />
              </div>
            </div>

            {/* Custom Status Message */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                Front Floor Announcement / Note
              </label>
              <textarea
                rows={2}
                value={crowdMsg}
                onChange={(e) => setCrowdMsg(e.target.value)}
                placeholder="e.g. Plenty of squat racks free. Bench press zone clear."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleSaveCrowd}
                disabled={isSavingCrowd}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                <Save className="w-4 h-4 text-black" />
                <span>{isSavingCrowd ? 'Saving Changes...' : 'Save & Publish Live Status'}</span>
              </button>

              {crowdSavedSuccess && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Status updated live on website!
                </span>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LEADS & ENQUIRIES TABLE */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-zinc-500" />
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="ALL">All Sources</option>
                  <option value="membership">Membership Registrations</option>
                  <option value="free_trial">1-Day Free Trial Passes</option>
                  <option value="diet_plan">AI Diet Plans</option>
                  <option value="consultation">Consultations</option>
                  <option value="contact">Contact Forms</option>
                </select>

                <button
                  onClick={fetchLeads}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  title="Refresh leads"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Phone (WhatsApp)</th>
                      <th className="p-3.5">Goal / Plan</th>
                      <th className="p-3.5">Source</th>
                      <th className="p-3.5">BMI / Metrics</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-300">
                    {filteredLeads.length > 0 ? (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-zinc-800/50 transition-colors">
                          <td className="p-3.5 font-bold text-white whitespace-nowrap">
                            {lead.name}
                            {lead.email && (
                              <span className="block text-[10px] text-zinc-500 font-normal">
                                {lead.email}
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:underline font-mono"
                            >
                              {lead.phone}
                            </a>
                          </td>
                          <td className="p-3.5 max-w-[200px] truncate" title={lead.goal}>
                            {lead.goal}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-800 text-zinc-300 border border-zinc-700">
                              {lead.source}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            {lead.bmiData?.bmi ? (
                              <span className="text-[11px] text-amber-300 font-mono">
                                BMI {lead.bmiData.bmi} ({lead.bmiData.category})
                              </span>
                            ) : (
                              <span className="text-zinc-600">—</span>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                              className="bg-black/60 border border-zinc-700 rounded-lg px-2 py-1 text-[11px] font-bold text-amber-400 outline-none"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="CONVERTED">CONVERTED</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)}!%20This%20is%20Coach%20from%20Gym%20Holic%20Ambikapur.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold inline-flex items-center gap-1"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-zinc-500">
                          No leads match your filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MEMBERSHIP PLANS */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white">Active Membership Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-base">{p.name}</h4>
                      <p className="text-xs text-zinc-400">{p.duration}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-amber-400">{formatINR(p.priceINR)}</span>
                      <span className="text-xs text-zinc-500 line-through block">{formatINR(p.originalPriceINR)}</span>
                    </div>
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1">
                    {p.features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-amber-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AFFILIATE STORE LINKS */}
        {activeTab === 'affiliates' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white">Affiliate Commission Catalog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {affiliates.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-amber-400 uppercase text-[10px]">{item.platform}</span>
                    <span className="font-bold text-white">{formatINR(item.priceINR)}</span>
                  </div>
                  <h4 className="font-bold text-white line-clamp-1">{item.title}</h4>
                  <a
                    href={item.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline block truncate text-[11px]"
                  >
                    {item.affiliateUrl}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
