import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Routes
import { UserTabRoutes } from "./user.tab.routes";

//Screens
import { Home } from "@screens/Home";
import { Product } from "@screens/Product";
import { Order } from "@screens/Order";

const { Navigator, Screen, Group } = createNativeStackNavigator();

export const UserStackRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ header: () => null }} initialRouteName="Home">
      {user?.is_admin ? (
        <Group>
          <Screen name="Home" component={Home} />
          <Screen name="Product" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Screen name="Order" component={Order} />
        </Group>
      )}
    </Navigator>
  );
};
