import { JwtPayload } from "jwt-decode";

export interface DecodedPAT extends JwtPayload {
  $id?: string;
  $type?: string;
  dgapi?: string;
  pubapi?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  cid?: string;
  uid?: string;
}
