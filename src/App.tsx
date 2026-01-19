import './App.css'
import CategoriesSection from './components/CategoriesSection'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <>
      <Header></Header>
      <SearchBar></SearchBar>
      <HeroBanner></HeroBanner>
      <CategoriesSection></CategoriesSection>
      <Footer></Footer>
    </>
  )
}

export default App
