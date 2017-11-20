export class News {
  id: number;
  titles: Titles = new Titles();
  short_contents: ShortContents = new ShortContents();
  views: number;
  created_at: string;
  updated_at: string;
  title: string;
  short_content: string;
  contents: Content[];
  contents2: Contents = new Contents();
  change_img: boolean;
}

export class Titles {
  en: string;
  ru: string;
}

export class ShortContents {
  en: string;
  ru: string;
}

export class Contents {
  en: string;
  ru: string;
}

export class Content {
  id: number;
  content: string;
  language: string;
  news_id: number;
  created_at: string;
  updated_at: string;
}
