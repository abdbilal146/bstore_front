import { Divider } from "@mantine/core";
import CategoriesSection from "../../components/CategoriesSection";
import FeatureProductsSection from "../../components/FeaturedProductsSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroBanner from "../../components/HeroBanner";
import './HomePage.scss'


export default function HomePage() {
    const featureSectionTitle: string = "Les Produits Phares"

    return <>
        <Header></Header>
        <HeroBanner></HeroBanner>
        <div className="title-container">
            <Divider>

            </Divider>
            <div>
                <h1>
                    {featureSectionTitle}
                </h1>
            </div>
            <Divider>

            </Divider>
        </div>
        <FeatureProductsSection></FeatureProductsSection>
        <CategoriesSection></CategoriesSection>
        <Footer></Footer>
    </>
}