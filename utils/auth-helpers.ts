import { getSessionByIdFromDB } from "../data-layer/session";
import { getUserByUsernameFromDB } from "../data-layer/user";

export async function getAuthenticatedUser(sessionId: string | undefined) {
  if (!sessionId) {
    return { authenticated: false };
  }

  const sessionData = await getSessionByIdFromDB(sessionId);
  if (sessionData.document === null) {
    return { authenticated: false };
  }
  const { username } = sessionData.document;

  const user = await getUserByUsernameFromDB(username);

  if (user.document === null) {
    return { authenticated: false };
  }

  return {
    authenticated: true,
    authenticatedUserName: user.document.username,
  };
}
