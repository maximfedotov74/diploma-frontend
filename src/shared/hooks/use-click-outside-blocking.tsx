import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

type ClickOutsideBlocking<T, V> = {
	buttonRef: RefObject<T>;
	areaRef: RefObject<V>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	isOpened: boolean;
};

export const UseClickOutsideBlocking = <
	T extends HTMLElement,
	V extends HTMLElement
>(
	initialOpened: boolean,
	blockScroll: boolean = false
): ClickOutsideBlocking<T, V> => {
	const [opened, setOpened] = useState<boolean>(initialOpened);
	const ref = useRef<V>(null);
	const buttonRef = useRef<T>(null);

	const handleClickOutside = (event: Event) => {
		if (
			ref.current &&
			event.target instanceof Node &&
			!ref.current.contains(event.target) &&
			!buttonRef.current?.contains(event.target)
		) {
			setOpened(false);
		}
	};

	useEffect(() => {
		if (blockScroll) {
			if (opened) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'visible';
			}
		}
		return () => {
			document.body.style.overflow = 'visible';
		};
	}, [opened, blockScroll]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return {
		areaRef: ref,
		buttonRef: buttonRef,
		setOpen: setOpened,
		isOpened: opened,
	};
};
