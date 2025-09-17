import type { User } from '../types';

const FIREBASE_BASE_URL = import.meta.env.VITE_FIREBASE_BASE_URL;

/**
 * Fetches user ID using an encoded authentication string
 * @param encodedString - The encoded string created from email/password combination
 * @returns Promise<number> - User ID if found
 */
export const fetchUserIdByEncodedString = async (encodedString: string): Promise<number> => {
  try {
    const response = await fetch(`${FIREBASE_BASE_URL}/secrets/${encodedString}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user ID: ${response.status}`);
    }
    const userId = await response.json();
    if (!userId) throw new Error('User ID not found');
    return userId;
  } catch (error) {
    throw new Error(`Error fetching user ID: ${error}`);
  }
};

/**
 * Fetches user data by user ID
 * TODO: Improve this so it fetches only a single user, not all users and then filters. Currently a security risk and not scalable.
 * @param userId - The user ID to fetch data for
 * @returns Promise<User> - User data if found
 */
export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const response = await fetch(`${FIREBASE_BASE_URL}/users.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    const users = await response.json();
    const user = users.find((u: User) => u.id === userId) || null;
    if (!user) throw new Error('User with ID not found');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};

/**
 * Fetches all users from the database
 * @returns Promise<User[]> - Array of all users
 */
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${FIREBASE_BASE_URL}/users.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};