import { environment } from './../../../environments/environment.prod';
export class Push {
  title: string;
  body: string;
  url: string = environment.vebLink;
}
