export class Team {
  id: number;
  names: Names = new Names();
  posts: Posts = new Posts();
  image: string;
  descriptions: Descriptions = new Descriptions();
  linkedin: string;
  created_at: string;
  updated_at: string;
  name: string;
  post: string;
  description: string;
  change_img: boolean;
}

export class Names {
  en: string;
  ru: string;
}

export class Posts {
  en: string;
  ru: string;
}

export class Descriptions {
  en: string;
  ru: string;
}
