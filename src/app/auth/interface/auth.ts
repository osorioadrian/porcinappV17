export class Auth {
  constructor(
    public email: string,
    public password: string,
    public remember: boolean,
    public roles: string[],
    public img?: string,
    public isActive?: boolean,
    public _id?: string
  ) {}
}
