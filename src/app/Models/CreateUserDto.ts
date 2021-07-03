export class CreateUserDto
{
  firstName!: string;
  middleName!: string;
  lastName?: string ;
  email?: string ;
  password?: string ;
  mobile?: string ;
  roles?: number[];

}
