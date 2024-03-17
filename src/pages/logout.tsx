import { postApiAuthLogout } from '@/shared/api/generated';
import { AUTH_ROUTE } from '@/shared/constants/routes/public';
import { GetServerSideProps, NextPage } from 'next';

const LogoutPage: NextPage = () => {
	return <></>;
};

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const refreshToken = context.req.cookies.refresh_token;

	postApiAuthLogout({ token: refreshToken ?? ''});

	context.res.setHeader('Set-Cookie', [
		`access_token=deleted; Max-Age=0; Path=/`,
		`refresh_token=deleted; Max-Age=0; Path=/`,
	]);
	return {
		redirect: { permanent: false, destination: AUTH_ROUTE },
		props: { initialState: {} },
	};
};
