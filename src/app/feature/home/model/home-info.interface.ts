export interface InfoText {
  services: Service[];
  users: User[];
  installations: Installation[];
  'home-texts': HomeTexts;
  reservations: any[];
}

export interface HomeTexts {
  info: Info;
  banner: Banner;
  hero: Hero;
  contact: Contact;
}

export interface Banner {
  action: string;
  title: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  subInfo: string;
}

export interface Contact {
  title: string;
  subTitle: string;
  button: string;
}

export interface Info {
  title: string;
  subTitle: string;
  options: Option[];
}

export interface Option {
  icon: string;
  title: string;
  description: string;
}

export interface Installation {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Service {
  id: number;
  name: string;
  subTitle: string;
  price: number;
  time: string;
  description: string;
  image: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}
