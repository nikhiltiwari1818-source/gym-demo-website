import {
  Lead,
  CrowdStatus,
  MembershipPlan,
  AffiliateProduct,
  Consultation,
} from '@/types';
import {
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_CROWD_STATUS,
  INITIAL_AFFILIATE_PRODUCTS,
} from './seed-data';

// Server-side in-memory singleton cache with fallback
class GymDataStore {
  private static instance: GymDataStore;
  private leads: Lead[] = [
    {
      id: 'lead-demo-1',
      name: 'Aditya Verma',
      phone: '+91 98261 45012',
      email: 'aditya.v@gmail.com',
      goal: 'Muscle Gain',
      source: 'membership',
      planInterest: 'Transformation Quarterly',
      status: 'NEW',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'lead-demo-2',
      name: 'Priyanka Patel',
      phone: '+91 88712 90432',
      email: 'priyanka.p@yahoo.com',
      goal: 'Fat Loss',
      source: 'diet_plan',
      bmiData: {
        bmi: 26.4,
        category: 'Overweight',
        bodyFatEstimate: 29.5,
        caloriesDaily: 1650,
      },
      status: 'CONTACTED',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    },
    {
      id: 'lead-demo-3',
      name: 'Rohan Dewangan',
      phone: '+91 70008 12345',
      goal: 'General Fitness',
      source: 'free_trial',
      planInterest: '1-Day VIP Pass',
      status: 'NEW',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
  ];

  private crowdStatus: CrowdStatus = { ...INITIAL_CROWD_STATUS };
  private membershipPlans: MembershipPlan[] = [...INITIAL_MEMBERSHIP_PLANS];
  private affiliateProducts: AffiliateProduct[] = [...INITIAL_AFFILIATE_PRODUCTS];
  private consultations: Consultation[] = [];

  private constructor() {}

  public static getInstance(): GymDataStore {
    if (!GymDataStore.instance) {
      GymDataStore.instance = new GymDataStore();
    }
    return GymDataStore.instance;
  }

  // Leads
  public getLeads(): Lead[] {
    return [...this.leads].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  public updateLeadStatus(id: string, status: Lead['status']): boolean {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index !== -1) {
      this.leads[index].status = status;
      return true;
    }
    return false;
  }

  // Crowd Status
  public getCrowdStatus(): CrowdStatus {
    return { ...this.crowdStatus };
  }

  public updateCrowdStatus(partial: Partial<CrowdStatus>): CrowdStatus {
    const current = this.crowdStatus;
    const occupancy = partial.currentOccupancy !== undefined ? partial.currentOccupancy : current.currentOccupancy;
    const maxCapacity = partial.maxCapacity !== undefined ? partial.maxCapacity : current.maxCapacity;
    const percentage = Math.round((occupancy / maxCapacity) * 100);

    let level: CrowdStatus['level'] = 'MODERATE';
    if (percentage < 35) level = 'LOW';
    else if (percentage > 70) level = 'HIGH';

    this.crowdStatus = {
      ...current,
      ...partial,
      currentOccupancy: occupancy,
      maxCapacity,
      percentage,
      level: partial.level || level,
      updatedAt: new Date().toISOString(),
    };
    return { ...this.crowdStatus };
  }

  // Membership Plans
  public getMembershipPlans(): MembershipPlan[] {
    return [...this.membershipPlans];
  }

  public updateMembershipPlan(id: string, updates: Partial<MembershipPlan>): MembershipPlan | null {
    const idx = this.membershipPlans.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.membershipPlans[idx] = { ...this.membershipPlans[idx], ...updates };
      return this.membershipPlans[idx];
    }
    return null;
  }

  // Affiliate Products
  public getAffiliateProducts(): AffiliateProduct[] {
    return [...this.affiliateProducts];
  }

  public addAffiliateProduct(product: Omit<AffiliateProduct, 'id'>): AffiliateProduct {
    const newProd: AffiliateProduct = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    this.affiliateProducts.push(newProd);
    return newProd;
  }

  // Consultations
  public addConsultation(consultation: Omit<Consultation, 'id' | 'createdAt' | 'status'>): Consultation {
    const item: Consultation = {
      ...consultation,
      id: `consult-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    this.consultations.unshift(item);
    return item;
  }

  public getConsultations(): Consultation[] {
    return [...this.consultations];
  }
}

export const store = GymDataStore.getInstance();
