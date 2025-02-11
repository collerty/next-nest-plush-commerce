import {Bird, Dog, Fish, PawPrint, ShoppingBag, Sparkles} from "lucide-react";

export const CategoryIcons = {
    product: ShoppingBag,
    paw: PawPrint,
    sparkles: Sparkles,
    fish: Fish,
    bird: Bird,
    dog: Dog,
}

export type Icon = keyof typeof CategoryIcons