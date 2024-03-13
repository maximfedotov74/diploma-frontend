import { ModelSession, getApiUserSessionAll } from '@/shared/api/generated';
import { USER_SESSIONS } from '@/shared/api/query-keys/user';
import { useQuery } from '@tanstack/react-query';
import { UAParser } from 'ua-parser-js';

export type UserSessionModel = ModelSession & {
	browser?: string;
	os?: string;
	device?: string;
};
const parser = new UAParser();

export const useGetSessions = () => {
	return useQuery({
		queryKey: [USER_SESSIONS],
		queryFn: () => getApiUserSessionAll(),
		select: data => {
			const sessions = data.sessions
				.filter(item => item.session_id !== data.current.session_id)
				.map(item => {
					parser.setUA(item.user_agent);
					const userAgentParsed = parser.getResult();
					const newItem: UserSessionModel = {
						created_at: item.created_at,
						session_id: item.session_id,
						updated_at: item.updated_at,
						user_id: item.user_id,
						browser: userAgentParsed.browser.name,
						device: userAgentParsed.device.type,
						os: userAgentParsed.os.name,
						user_agent: item.user_agent,
					};
					return newItem;
				});
			parser.setUA(data.current.user_agent);
			const currentParsed = parser.getResult();
			const newItem: UserSessionModel = {
				created_at: data.current.created_at,
				session_id: data.current.session_id,
				updated_at: data.current.updated_at,
				user_id: data.current.user_id,
				browser: currentParsed.browser.name,
				device: currentParsed.device.type,
				os: currentParsed.os.name,
				user_agent: data.current.user_agent,
			};

			return {
				current: newItem,
				sessions: sessions,
			};
		},
	});
};
