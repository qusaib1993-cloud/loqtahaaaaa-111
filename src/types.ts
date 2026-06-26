export interface OrderDetails {
  name: string;
  phone: string;
  color: string;
  height: number;
  weight: number;
  notes?: string;
  id?: string;
  createdAt?: string;
}

export interface AbayaColor {
  id: string;
  name: string;
  arabicName: string;
  hex: string;
  description: string;
  tagline: string;
  mediaPlaceholder: string; // Describes the image/video layout
}
