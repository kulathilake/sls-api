import { TimeBreakdown, Media } from "../../common/common.types";

/**
 * Serve Sizes identified within the application
 */
export enum ServeSize {
    INDIVIDUAL = 'Individual',
    ADULTS2 = '2 Adults',
    FAMILY = 'Family (2 Adults 2 Children)',
    FAMILYPLUS = 'Family Plus (4 Adults)',
    CUSTOM = 'Custom'
}
/**
 * A type to define the quantities of a given ingredient
 * for each Serve Size defined in ServeSize enum.
 */

export type QuantityByServeSize = Map<ServeSize, number>;
/**
 * Recipe Instruction Type
 */


export type RecipeInstructionStep = {
    label: string;
    description: string;
    estimatedTimeTaken?: TimeBreakdown;
    media?: Media[];
    prevStep?: string | RecipeInstructionStep;
    nextStep?: string | RecipeInstructionStep;
    isFirst?: boolean;
    isLast?: boolean;
};
