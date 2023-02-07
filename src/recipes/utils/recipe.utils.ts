import { QuantityByServeSize, ServeSize } from "../types/recipe.types";

/**
 * create a quantity by serve size map based on an array of 
 * objects with serve size and relevant quantity.
 * @param args 
 * @returns 
 */
export function createQuantityByServeSize(
    ...args:{size:ServeSize,quantity:number}[]
):QuantityByServeSize {
    const map = new Map<ServeSize,number>();
    args.forEach(arg=>{
        map.set(arg.size,arg.quantity);
    })
    return map;
}