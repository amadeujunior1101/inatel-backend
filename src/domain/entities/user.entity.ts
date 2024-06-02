export class UserEntity {
  email: string;
  password: string;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}
