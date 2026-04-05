export type Profile = {
  id: string;
  name: string;
  college_email: string;
  college_name: string | null;
  bio: string | null;
  age: number | null;
  gender: string | null;
  photo_url: string | null;
  instagram_handle: string | null;
  created_at: string;
  deleted_at: string | null;
};

export type RequestStatus = 'pending' | 'accepted' | 'declined';

export type Request = {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: RequestStatus;
  created_at: string;
};

export type Message = {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};
