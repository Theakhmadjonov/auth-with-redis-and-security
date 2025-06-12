import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;
  @IsString()
  phone: string;
}

export class verifyOtp {
  @IsString()
  phone: string;
  @IsString()
  code: string;
}

export class RegisterDto {
  @IsString()
  phone: string;
  @IsString()
  password: string;
  @IsString()
  session_token: string;
}