import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { AppState } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthData = {
	session: Session | null;
	profile: any;
	loading: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	profile: null,
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
	const [profile, setProfile] = useState(null);

	const fetchSession = async () => {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		setSession(session);

		if (session) {
			// fetch profile
			const { data } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.single();
			setProfile(data || null);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchSession();

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ session, loading, profile }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
