import Header from "@/common/Header.tsx";
import HeroSection from "@/components/home/HeroSection.tsx";
import FeaturesSection from "@/components/home/FeaturesSection.tsx";
import FeaturedProducts from "@/components/home/FeaturedProducts.tsx";
// import Categories from "@/components/Categories.tsx";
import Footer from "@/common/Footer.tsx";

const HomePage = () => {
    return(
        <div>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <FeaturedProducts />
            {/*<Categories />*/}
            <Footer />
        </div>

    )
}

export default HomePage