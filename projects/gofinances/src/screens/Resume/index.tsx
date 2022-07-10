//React
import React, { useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";

//React Navigation
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//Victory
import { VictoryPie } from "victory-native";

//date-fns
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

//styled-components
import { useTheme } from "styled-components";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

//Hooks
import { useAuth } from "../../hooks/useAuth";

//Storages
import { COLLECTION_TRANSACTIONS } from "../../storages/storage";

//Utils
import { categories } from "../../utils/categories";

//Components
import Header from "../../components/Header";
import HistoryCard from "../../components/HistoryCard";

//Styles
import {
  Container,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  ChartContainer,
  LoadingContainer,
} from "./styles";

//Types
import { TransactionCardProps } from "../../components/TransactionCard";

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
  color: string;
}

export default function Resume() {
  const { user } = useAuth();

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme();

  async function loadData() {
    setIsLoading(true);
    const dataKey = `${COLLECTION_TRANSACTIONS}:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (item: TransactionCardProps) =>
        item.type === "negative" &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionCardProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          percent,
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  if (isLoading) {
    return (
      <>
        <Header title="Resumo por categoria" />
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size={35} />
        </LoadingContainer>
      </>
    );
  }

  return (
    <Container>
      <Header title="Resumo por categoria" />

      <MonthSelect>
        <MonthSelectButton onPress={() => handleChangeDate("prev")}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>

        <MonthSelectButton onPress={() => handleChangeDate("next")}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      <Content
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
          paddingHorizontal: 24,
        }}
      >
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            colorScale={totalByCategories.map((item) => item.color)}
            labelRadius={50}
          />
        </ChartContainer>

        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
