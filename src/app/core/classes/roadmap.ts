export class Roadmap {
  id: number;
  quarters: Quarters = new Quarters();
  descriptions: Descriptions = new Descriptions();
  year: number;
  order: number;
  active: number;
  status: number;
  selectedStatus: string;
  created_at: string;
  updated_at: string;
}

export class Quarters {
  en: string;
  ru: string;
  cn: string;
  es: string;
  vn: string;
  kp: string;
}

export class Descriptions {
  en: string;
  ru: string;
  cn: string;
  es: string;
  vn: string;
  kp: string;
}
