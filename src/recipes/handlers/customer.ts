import { mockGenericRecipe } from "../models/__mocks__/data.mocks";

export async function handler(){
    return {
        mock: mockGenericRecipe
    }
}