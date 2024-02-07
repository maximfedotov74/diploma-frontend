import { useEffect, useState } from 'react';
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	saveToLocalStorage,
} from '../../shared/utils/local-storage';

import { Button } from '../../shared/ui/button';
import { Icon } from '../../shared/ui/icon';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../shared/ui/dropdown-menu';
import { cn } from '../../shared/utils/cn';

const system = 'system';
const dark = 'dark';
const light = 'light';

type Theme = typeof system | typeof dark | typeof light;

type ThemeIcon = typeof dark | typeof light;

const themeLocalStorageKey = 'theme';

export const ChangeThemeButton = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
	const [theme, setTheme] = useState<Theme>(light);
	const [themeIcon, setThemeIcon] = useState<ThemeIcon>(light);

	useEffect(() => {
		const currentTheme = getFromLocalStorage<Theme>(themeLocalStorageKey);

		if (currentTheme) {
			if (currentTheme === dark || currentTheme === light) {
				setTheme(currentTheme);
			}
		} else {
			setTheme('system');
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');

		const makeDark = () => {
			setThemeIcon(dark);
			document.documentElement.classList.add(dark);
		};
		const makeLight = () => {
			setThemeIcon(light);
			document.documentElement.classList.remove(dark);
		};

		if (theme !== system) {
			saveToLocalStorage<Theme>(themeLocalStorageKey, theme);
			if (theme === dark) {
				makeDark();
			} else {
				makeLight();
			}
		} else {
			removeFromLocalStorage(themeLocalStorageKey);
			if (media.matches) {
				makeDark();
			} else {
				makeLight();
			}
		}

		const listener = (e: MediaQueryListEvent) => {
			if (theme === system) {
				if (e.matches) {
					makeDark();
				} else {
					makeLight();
				}
			}
		};

		media.addEventListener('change', listener);
		return () => {
			media.removeEventListener('change', listener);
		};
	}, [theme]);

	return (
		<div className={cn(className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Icon icon={themeIcon === dark ? 'moon' : 'sun_outline_24'} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setTheme(light)}>
						Светлая
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme(dark)}>
						Темная
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme(system)}>
						Системная
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
