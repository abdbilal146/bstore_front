

import { useNavigate } from "@tanstack/react-router"
import { brands, inspiration } from "../constants/brands"
import './CategoriesSection.scss'

import './CategoriesSection.scss'
import { Container, Title, Grid, Paper, Group } from "@mantine/core"

export default function CategoriesSection() {
    const navigate = useNavigate()

    const navigateTo = (query: string) => {
        navigate({
            to: '/product-brand/$brand',
            params: { brand: query }
        })
    }
    return (
        <Container size="xl" className="categories-section-container">
            <div className="category-group">
                <Title order={3} className="section-title">Plus de marques</Title>
                <div className="brands-container">
                    {brands.map((item, index) => (
                        <a key={index} className="brand-chip" onClick={() => navigateTo(item.name)}>
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>

            <div className="category-group">
                <Title order={3} className="section-title">Plus d'inspiration</Title>
                <Grid>
                    {inspiration.map((item, index) => (
                        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                            <Paper className="inspiration-card">
                                {item.name}
                            </Paper>
                        </Grid.Col>
                    ))}
                </Grid>
            </div>
        </Container>
    )
}