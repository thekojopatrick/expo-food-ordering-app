import { Alert, AppState } from 'react-native';
import React, {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { Profile } from '@/types';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthData = {
	session: Session | null;
	profile: Profile | null;
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

// AppState.addEventListener('change', (state) => {
// 	if (state === 'active') {
// 		supabase.auth.startAutoRefresh();
// 	} else {
// 		supabase.auth.stopAutoRefresh();
// 	}
// });

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [fullName, setFullName] = useState('');
	//const [username, setUsername] = useState('');
	const [role, setRole] = useState<string | null>(null);
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
				.select(`*`)
				.eq('id', session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setRole(data?.role as string);
				setAvatarUrl(data.avatar_url!);
				setFullName(data.full_name!);
				setProfile({
					...data,
					username: data.full_name!.replace(/\s+/g, '').toLowerCase(),
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
				...session.user,
				id: session?.user.id,
				username: fullName.replace(/\s+/g, '').toLowerCase(),
				avatar_url,
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

	//console.log({ profile });
	//userName: fullName.split(' ').join('').toLowerCase().trim(),

	return (
		<AuthContext.Provider
			value={{
				session,
				loading,
				profile,
				userName: fullName.replace(/\s+/g, '').toLowerCase(),
				isAdmin: role === 'ADMIN',
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
