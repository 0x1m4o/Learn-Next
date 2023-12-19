export interface Users {
  _id: string;
  username: string;
  fullname: string;
  city: string;
  country: string;
  job: string;
  avatar: string;
  about: string;
  instagram: string;
  twitter: string;
  facebook: string;
  __v: number;
}

export const defaultUserValues: Users = {
  _id: "",
  username: "",
  fullname: "",
  city: "",
  country: "",
  job: "",
  avatar: "",
  about: "",
  instagram: "",
  twitter: "",
  facebook: "",
  __v: 0,
};
