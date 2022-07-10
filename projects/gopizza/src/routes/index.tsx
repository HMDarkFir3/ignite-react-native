import React from "react";
import { NavigationContainer } from "@react-navigation/native";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Routes
import { AuthRoutes } from "@routes/auth.routes";
import { UserStackRoutes } from "@routes/user.stack.routes";
import { UserTabRoutes } from "@routes/user.tab.routes";

export const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
