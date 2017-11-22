export class Roadmap {
  id: number;
  quarters: Quarters = new Quarters();
  descriptions: Descriptions = new Descriptions();
  year: number;
  order: number;
  active: number;
  created_at: string;
  updated_at: string;
}

export class Quarters {
  en: string;
  ru: string;
}

export class Descriptions {
  en: string;
  ru: string;
}
