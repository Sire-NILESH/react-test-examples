import { User } from "../types/types";

const guestUser: User = {
  id: 1,
  email: "guest-user@email.com",
  role: "user",
};

/**
 * A uitility function to create a fake delay in asynchronous way
 * @param delay A number of milliseconds to wait
 */
const delay = async (delay: number = 1000) =>
  await new Promise((resolve) => setTimeout(resolve, delay));

/**
 * A uitility function to generate a random number string
 * @returns A random number string
 */
function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}

export async function getUser() {
  await delay();

  const authToken = generateAuthToken();

  return { status: 200, data: { authToken, user: guestUser } } as const;
}

export async function getLogin(email?: string, grantAdminPrivilege?: boolean) {
  await delay();

  const authToken = generateAuthToken();

  const response = {
    status: 200,
    data: {
      authToken,
      user: {
        ...guestUser,
        email: email ?? guestUser.email,
        role: grantAdminPrivilege ? "admin" : guestUser.role,
      },
    },
  } as const;

  return response;
}

export async function getLogout() {
  await delay();

  return { status: 200, data: { authToken: null, user: null } } as const;
}
