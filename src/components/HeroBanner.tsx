
import { Carousel } from '@mantine/carousel'
import './HeroBanner.scss'
import { Image } from '@mantine/core';
import vansTshirt from '../assets/vans_tshirt.webp'
import addidasTshirt from '../assets/adidas_tshirt.webp'
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import monteau from '../assets/manteau.webp'

interface Product {
    name: string,
    imageUrl: string,
    slogan: string
}


const products: Product[] = [{
    name: "vans-shirt",
    imageUrl: vansTshirt,
    slogan: "Trouvez ce qui vous va plus rapidement avec nos filtres, trouvez des marques qui vous rassemblent"
}, {
    name: "addidas-tshirt",
    imageUrl: addidasTshirt,
    slogan: "Trouvez ce qui vous va plus rapidement avec nos filtres, trouvez des marques qui vous rassemblent"
},
{
    name: "monteau",
    imageUrl: monteau,
    slogan: "Trouvez ce qui vous va plus rapidement avec nos filtres, trouvez des marques qui vous rassemblent"
}]

export default function HeroBanner() {
    const autoplay = useRef(
        Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
    )
    const slides = products.map((product) => (
        <Carousel.Slide><HeroItem {...product}></HeroItem></Carousel.Slide>
    ));

    return <div>
        <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            withIndicators
        >{slides}</Carousel>
    </div>
}



// the hero item

function HeroItem({ name, imageUrl, slogan }: Product) {
    return (
        <div className='hero-item-container'>
            <div className='image-container item'>
                <Image
                    src={imageUrl}
                    alt={name}
                    className='image'
                >
                </Image>
            </div>
            <div className='item slogan-section'>
                <p className='slogan-text'>{slogan}</p>
            </div>
        </div>
    )
}