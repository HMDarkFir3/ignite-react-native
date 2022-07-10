import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import fetchMock from "jest-fetch-mock";
import { renderHook, act } from "@testing-library/react-hooks";
import AuthProvider from "../../contexts/AuthContext";
import { useAuth } from "../../hooks/useAuth";

fetchMock.enableMocks();

const userTest = {
  id: "any_id",
  email: "john.doe@email.com",
  name: "John Doe",
  photo: "any_photo.png",
};

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("expo-auth-session", () => ({
  startAsync: () => ({
    type: "success" || "cancel",
    params: { access_token: "test-token" },
  }),
}));

describe("Auth Hook", () => {
  it("should be able to sign in with existing Google account", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signInWithGoogle();
    });
    expect(result.current.user.email).toBe(userTest.email);
  });

  it("user should not connect if cancel authentication with google", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("any_id");
  });
});
