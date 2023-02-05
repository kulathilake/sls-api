import { ServeSize } from "../../../common/common.types";
import { createQuantityByServeSize } from "../../../common/common.utils";
import { Recipe } from "../Recipe.model";

const mockGenericRecipe = new Recipe(
    'Sample Recipe',
    'This is a sample recipe',
    { type: 'VIDEO', 'url': 'ss' },
    [
        { id: "x", quantity: createQuantityByServeSize({ size: ServeSize.INDIVIDUAL, quantity: 10 }, { size: ServeSize.FAMILY, quantity: 42 })},

    ],
    [],
    { D: 0, H: 0, M: 30, S: 0 },
    0,
    [],
    {
        isVeg: false,
        containsDairy: true,
        containsNuts: false,
        isHalal: true,
        isHighProtein: true,
        isLowCarb: true
    },
    true,
    new Date(),
    'user'
)