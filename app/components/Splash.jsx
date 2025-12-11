import Image from 'next/image';
import splash from '../../public/assets/images/splash.webp';

const SplashScreen = () => {
	return (
		<section>
			<Image src={splash} alt="Splash" />
			<article>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
	);
};

export default SplashScreen;
