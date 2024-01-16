export interface GuestUser {
  id?: number;
  name: string;
  last_name : string;
  email: string;
}

export class GuestUserModel implements GuestUser{
  id?: number;
  name: string;
  last_name : string;
  email: string;

  constructor({id, name, last_name, email}: GuestUser) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.email = email;
  }

  transform() {
    return {
      id: this.id,
      name: this.name,
      last_name: this.last_name,
      email: this.email,
    }
  }

}
