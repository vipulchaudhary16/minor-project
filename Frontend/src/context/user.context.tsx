/**
 * A context that
 */
import {
	useState,
	createContext,
	ReactNode,
	useContext,
	SetStateAction,
	useEffect,
} from 'react';

type User = {
	// Define the structure of the user object here
	// For example:
	id: number;
	role: number;
	email: string;
	// Add other properties as needed
};

type UserContextType = {
	user: User | null;
	setUser: React.Dispatch<SetStateAction<User | null>>;
};

const defaultUser: User | null = null;

export const UserContext = createContext<UserContextType>({
	user: defaultUser,
	setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(defaultUser);
	const value: UserContextType = {
		user,
		setUser,
	};

	useEffect(() => {
		if (localStorage.getItem('user')) {
			setUser(JSON.parse(localStorage.getItem('user') || '{}'));
		}
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Optional: You can also create a custom hook for using the UserContext easily.
export const useUserContext = (): UserContextType => useContext(UserContext);
