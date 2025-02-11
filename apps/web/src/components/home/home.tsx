import {HeroSection} from "@/components/home/hero-section";
import {CategoriesSection} from "@/components/home/categories-section";
import {FeaturedProductsSection} from "@/components/home/featured-products-section";

// const sections : React.ReactNode[] = [
//     {
//         name: "Hero section",
//         <HeroSection />
//     },
//
//     <CategoriesSection/>,
//     <FeaturedProductsSection/>
// ] as const;
export function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            {/*{sections.map((section: React.ReactNode) => section)}*/}
            <HeroSection/>
            <CategoriesSection/>
            <FeaturedProductsSection/>
        </div>
    )
}

