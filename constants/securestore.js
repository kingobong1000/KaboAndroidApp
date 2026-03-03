import * as SecureStore from "expo-secure-store";

const KEYS = {
  currentUserId: "current_user_id",
  accessToken: "access_token",
  refreshToken: "refresh_token",
};

export async function setCurrentUserId(userId) {
  // Keep it small
  await SecureStore.setItemAsync(KEYS.currentUserId, String(userId));
}

export async function getCurrentUserId() {
  return SecureStore.getItemAsync(KEYS.currentUserId);
}

export async function saveAuthTokens({ accessToken, refreshToken }) {
  if (accessToken) await SecureStore.setItemAsync(KEYS.accessToken, accessToken);
  if (refreshToken) await SecureStore.setItemAsync(KEYS.refreshToken, refreshToken);
}

export async function getAuthTokens() {
  const [accessToken, refreshToken] = await Promise.all([
    SecureStore.getItemAsync(KEYS.accessToken),
    SecureStore.getItemAsync(KEYS.refreshToken),
  ]);
  return { accessToken, refreshToken };
}

export async function clearSession() {
  await Promise.all([
    SecureStore.deleteItemAsync(KEYS.currentUserId),
    SecureStore.deleteItemAsync(KEYS.accessToken),
    SecureStore.deleteItemAsync(KEYS.refreshToken),
  ]);
}