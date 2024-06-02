export class UserEntity {
  id: string;
  email: string;
  password: string;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}
