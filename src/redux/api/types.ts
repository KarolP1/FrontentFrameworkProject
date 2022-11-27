export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  image?: string;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: IUser;
  coments?: IComent[];
}
export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IComent {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IPostNewComent {
  coment: Partial<IComent>;
  postId: number;
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
