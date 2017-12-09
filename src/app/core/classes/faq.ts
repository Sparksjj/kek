export class Faq {
  id: number;
  questions: Questions = new Questions();
  created_at: string;
  updated_at: string;
  content: string;
  contents: Content[];
  contents2: Contents = new Contents();
}

export class Questions {
  en: string;
  ru: string;
  cn: string;
  es: string;
  vn: string;
  kp: string;
}

export class Contents {
  en: string;
  ru: string;
  cn: string;
  es: string;
  vn: string;
  kp: string;
}

export class Content {
  id: number;
  content: string;
  language: string;
  contentable_id: number;
  contentable_type: string;
  created_at: string;
  updated_at: string;
}
