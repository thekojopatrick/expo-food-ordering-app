import { Link, Redirect } from 'expo-router';

import React from 'react';

const index = () => {
	return <Redirect href={'/(auth)/'} />;
};

export default index;
