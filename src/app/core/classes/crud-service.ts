export class Urls {
  api: string;
  show: string;
  index: string;
  create: string;
  paggination: string;
}
export class Names {
  en: string;
  ru1: string;
  ru2: string;
  ru3: string;
  ru4: string;
}
export class CrudService {
  constructor(public names: Names, public urls: Urls) {
    console.log(names);
    console.log(urls);
  }
}
