import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const content = useContext(AuthContext);

  return content;
}
