export class Template {
  id: number;
  created_at: string;
  updated_at: string;
  contents: Content[];
  contents2: Contents = new Contents();
  key: string;
  description: string;
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
  news_id: number;
  created_at: string;
  updated_at: string;
}
