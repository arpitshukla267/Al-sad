'use client';

import { Button } from '@/components/ui/button';

interface PrimaryBtnProps {
	title: string;
	styles?: string;
	onClick: () => void;
}

const PrimaryBtn = ({ title, styles, onClick }: PrimaryBtnProps) => {
	return (
		<Button onClick={onClick} className={styles}>
			{title}
		</Button>
	);
};

export default PrimaryBtn;

