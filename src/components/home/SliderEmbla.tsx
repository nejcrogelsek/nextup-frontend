import { FC, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const defaultData = [{ image: '/event1.png' }, { image: '/event2.png' }, { image: '/event3.png' }, { image: '/event4.png' },]

const EmblaCarousel: FC = () => {
	const [sliders, setSliders] = useState<{ image: string }[] | []>([])

	useEffect(() => {
		setSliders(defaultData)
	}, [])

	const [viewportRef] = useEmblaCarousel({
		dragFree: true,
		containScroll: 'trimSnaps',
	});

	return (
		<div ref={viewportRef}>
			<div className='flex'>
				{sliders.map((item: { image: string }, index: number) => (
					<div key={index}>
						<Image
							src={item.image}
							alt='Picture of the event'
							width={500}
							height={500}
							className='!w-auto !h-auto embla__slide__img'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmblaCarousel;