import jwt, { JwtPayload } from 'jwt-decode';

interface MyJwtPayload extends JwtPayload {
  auth: string;
}

const getUserRole = (token: string): string => {
  let parsedToken: MyJwtPayload = jwt(token);
  let app: string = parsedToken.auth;
  const sentence: string = app.replace(/\s+/g, ' ').trim();
  let role: string[] = sentence.split(',');

  return role[0];
};

export default getUserRole;
