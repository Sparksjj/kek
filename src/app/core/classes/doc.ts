export class Doc {
  id: number;
  names: Names = new Names();
  created_at: string;
  updated_at: string;
  image: string;
  docs: any[];
  change_img: boolean;
  onclick: string;
  show: any;
}

export class Names {
  en: string;
  ru: string;
  cn: string;
  es: string;
  vn: string;
  kp: string;
}
