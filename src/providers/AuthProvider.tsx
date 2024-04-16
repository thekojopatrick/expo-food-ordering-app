import { Alert, AppState } from 'react-native';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface ProfileProps {
	avatar_url: string | null;
	full_name: string | null;
	role: string;
	username: string | null;
}

type AuthData = {
	session: Session | null;
	profile: ProfileProps | null;
	userName: string | null;
	isAdmin: boolean;
	loading: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	profile: null,
	userName: null,
	isAdmin: false,
	loading: true,
});

AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState<ProfileProps | null>(null);
	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [role, setRole] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState('');

	useEffect(() => {
		if (!session) {
			fetchSession();
		}

		//if (session) getProfile();

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	const fetchSession = async () => {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		setSession(session);

		if (session) {
			// fetch profile
			await getProfile({ session });
		}

		setLoading(false);
	};

	const getProfile = async ({ session }: { session: Session }) => {
		try {
			setLoading(true);

			if (!session) throw new Error('No user on the session!');

			//console.log({ session });

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`full_name,username, role, avatar_url`)
				.eq('id', session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setRole(data.role);
				setAvatarUrl(data.avatar_url);
				setFullName(data.full_name);
				setProfile({
					...data,
				});
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const updateProfile = async ({
		username,
		avatar_url,
	}: {
		username: string;
		avatar_url: string;
	}) => {
		try {
			setLoading(true);
			if (!session?.user) throw new Error('No user on the session!');

			const updates = {
				id: session?.user.id,
				username,
				avatar_url,
				updated_at: new Date(),
			};

			const { error } = await supabase.from('profiles').upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	console.log({ profile });

	return (
		<AuthContext.Provider
			value={{
				session,
				loading,
				profile,
				userName: fullName,
				isAdmin: role === 'ADMIN',
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
