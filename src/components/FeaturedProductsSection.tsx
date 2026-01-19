import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"
import { fetchAllTemplates} from "../api/product"
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { useNavigate } from "@tanstack/react-router"

import './FeaturedProductSection.scss'

const query = {
    fields: ['custom_tags', 'image', 'name', 'item_name', 'custom_price'],
    page: 1,
    size: 20
};

export default function FeatureProductsSection() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', query],
        queryFn: () => fetchAllTemplates(query),
    })

    const [products, setProducts] = useState<{ custom_tags: string, image: string, name: string, item_name: string, custom_price: string }[]>()
    const navigate = useNavigate()



    useEffect(() => {
        if (isLoading) return console.log('Loading')

        setProducts(data.data)
        if (error) {
            console.log(error)
        }
    })

    const goToPdp = (id: string) => {
        navigate({ to: "/product_page/$productId", params: { productId: id } })
    }

    const carouselItems = products?.map(item => {
        return <Carousel.Slide><ProductCard productId={item.name} onClick={() => { goToPdp(item.name) }} imageSource={item.image} productName={item.item_name} price={item.custom_price}></ProductCard></Carousel.Slide>
    })
    return (
        <div className="container">
            <Carousel
                slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg: '20%' }}
                slideGap="md"
            >
                {carouselItems}
            </Carousel>
        </div>
    )
}



