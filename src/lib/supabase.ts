import 'react-native-url-polyfill/auto';

//import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store';

import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	},
};

const supabaseUrl = 'https://bgnhwjuemabdlxiwlgjj.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbmh3anVlbWFiZGx4aXdsZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyODA1MjIsImV4cCI6MjAyODg1NjUyMn0.PCpAnFnHChAeaAxMHnYnDVGA7KbPSzlUT9w7-Ix4EPY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
