export interface StaffMember {
  id: number;
  discord_id: string;
  name: string;
  message_count: number;
  current_role: string | null;
  added_at: string;
  updated_at: string;
}

export interface Milestone {
  id: number;
  message_threshold: number;
  role_id: string;
  role_name: string;
  created_at: string;
  updated_at: string;
}

export interface MilestoneLog {
  id: number;
  staff_member_id: number;
  discord_id: string;
  username: string;
  message_count: number;
  role_received: string;
  achieved_at: string;
}
