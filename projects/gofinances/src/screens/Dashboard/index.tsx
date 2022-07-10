//React
import React, { useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";

//React Navigation
import { useFocusEffect } from "@react-navigation/native";

//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//styled-components
import { useTheme } from "styled-components";

//Hooks
import { useAuth } from "../../hooks/useAuth";

//Storages
import { COLLECTION_TRANSACTIONS } from "../../storages/storage";

//Components
import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";

//Styles
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadingContainer,
} from "./styles";

//Types
import { TransactionCardProps } from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const [transactionsData, setTransactionsData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectionFiltered = collection.filter((item) => item.type === type);

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((item) => new Date(item.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `${COLLECTION_TRANSACTIONS}:${user.id}`;

    const data = await AsyncStorage.getItem(dataKey);

    const transactions = data ? JSON.parse(data) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactionsData(transactionsFormatted);

    const total = entriesTotal - expensivesTotal;

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );

    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 a ${lastTransactionExpensives}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensives === 0
            ? "Não há transações"
            : `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensives === 0 ? "Não há transações" : totalInterval,
      },
    });

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size={35} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: user.photo,
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction={highlightData.entries.lastTransaction}
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction={highlightData.expensives.lastTransaction}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactionsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
