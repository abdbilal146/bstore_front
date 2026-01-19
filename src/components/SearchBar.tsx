import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import './SearchBar.scss'


export default function SearchBar() {
    const searchInputText: string = "Rechercher un produits"
    return <div className="input-container">
        <Input
            placeholder={searchInputText}
            leftSection={<IconSearch></IconSearch>}
            size="md"
            className="input"
        ></Input>
    </div>
}