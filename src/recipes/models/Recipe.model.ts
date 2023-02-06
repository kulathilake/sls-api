import { DomainDataModel } from "../../common/common.model";
import { Media, QuantityByServeSize, RecipeInstructionStep, ServeSize, TimeBreakdown } from "../../common/common.types";
import {RecipeDto} from "../dtos/Recipe.dto"
import { Ingredient } from "./Ingredient.model";

/**
 * Domain class for entity Recipe;
 */
export class Recipe extends DomainDataModel {

    private _recipeId: string;

    /**
     * 
     * @param _name Name of the recipe
     * @param _description Description of the recipe
     * @param _instructionVideo Media object or url to recipe instruction video 
     * @param _ingredients List of ingredient ids along with quatities per serve size
     * @param _instructions list of instruction steps in the expected order of 
     * execution or linked by nextStep & prevStep attributes
     * @param _totalPreptime total estimated time take to prepare this recipe 
     * @param _customerScore aggregated customer rating for this meal kit
     * @param _tags queriable phrases that define or relate to this meal kit.
     * @param _mealChecks a list of checks every recipe should declare. 
     * @param isAvailable flag to maintain the availability (or the contrary) of a given meal
     * @param createdOn the date on which the meal was created
     * @param createdBy the user id of the user by whom this meal kit (recipe) was created
     * @param recipeId mealkit id.
     */
    constructor(
        private _name: string,
        private _description: string,
        private _instructionVideo: string | Media,
        private _ingredients: { ingredient: Ingredient; quantity: QuantityByServeSize; }[],
        private _instructions: RecipeInstructionStep[],
        private _totalPreptime: TimeBreakdown,
        private _customerScore: number,
        private _tags: string[],
        private _mealChecks: {
            isVeg: boolean;
            isLowCarb: boolean;
            isHighProtein: boolean;
            containsNuts: boolean;
            containsDairy: boolean;
            isHalal: boolean;
        },
        private _isAvailable: boolean,
        createdOn: Date,
        createdBy: string,
        recipeId?: string,
        
    ) {
        super(createdOn,createdBy);
        if (recipeId) {
            this._recipeId = recipeId;
        } else {
            this._recipeId = Recipe.generateEntityId('recipe');
        }
    }

    public save() {
        throw new Error('method not implemented')
    }

    public mapToDto():RecipeDto  {
        return {
            id: this.recipeId,
            name: this.name,
            description: this.description,
            instructionVideo: this.instructionVideo,
            ingredients: this.ingredients,
            instrctions: this.instructions,
            totalPrepTime: this.totalPreptime,
            customerScore: this.customerScore,
            tags: this.tags,
            mealChecks: this.mealChecks,
            isAvailable: this.isAvailable,
            createdBy: this.createdBy,
            createdOn: this.createdOn,
            updatedBy: this.updatedBy,
            updatedOn: this.updatedOn,
            isRemoved: this.isRemoved,
            removedBy: this.removedBy,
            removedOn: this.removedOn,
            sharedWith: this.sharedWith
        }
    }
    
    /** Getters & Setters */
    public get recipeId(): string {
        return this._recipeId;
    }
    public set recipeId(value: string) {
        this._recipeId = value;
    }

    public get mealChecks(): {
        isVeg: boolean;
        isLowCarb: boolean;
        isHighProtein: boolean;
        containsNuts: boolean;
        containsDairy: boolean;
        isHalal: boolean;
    } {
        return this._mealChecks;
    }
    public set mealChecks(value: {
        isVeg: boolean;
        isLowCarb: boolean;
        isHighProtein: boolean;
        containsNuts: boolean;
        containsDairy: boolean;
        isHalal: boolean;
    }) {
        this._mealChecks = value;
    }
    public get tags(): string[] {
        return this._tags;
    }
    public set tags(value: string[]) {
        this._tags = value;
    }
    public get customerScore(): number {
        return this._customerScore;
    }
    public set customerScore(value: number) {
        this._customerScore = value;
    }
    public get totalPreptime(): TimeBreakdown {
        return this._totalPreptime;
    }
    public set totalPreptime(value: TimeBreakdown) {
        this._totalPreptime = value;
    }
    public get instructions(): RecipeInstructionStep[] {
        return this._instructions;
    }
    public set instructions(value: RecipeInstructionStep[]) {
        this._instructions = value;
    }
    public get ingredients(): { ingredient: Ingredient; quantity: QuantityByServeSize; }[] {
        return this._ingredients;
    }
    public set ingredients(value: { ingredient: Ingredient; quantity: QuantityByServeSize; }[]) {
        this._ingredients = value;
    }
    public get instructionVideo(): string | Media {
        return this._instructionVideo;
    }
    public set instructionVideo(value: string | Media) {
        this._instructionVideo = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    public get isAvailable(): boolean {
        return this._isAvailable;
    }
    public set isAvailable(value: boolean) {
        this._isAvailable = value;
    }
   


}




