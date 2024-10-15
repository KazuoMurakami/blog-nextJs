"use server";
import AuthService from "../services/auth-service";

export async function userRole() {
  const session = await AuthService.isSessionValid();
  const role = session && typeof session.sub === "string" ? session.sub : " ";
  return role;
}
