import { DomainDataModel } from "../../common/common.model";
import { Media, QuantityByServeSize, RecipeInstructionStep, ServeSize, TimeBreakdown } from "../../common/common.types";
import { createQuantityByServeSize } from "../../common/common.utils";

/**
 * Domain class for entity Recipe;
 */
export class Recipe extends DomainDataModel {
   
    private _mealKitId: string;

    constructor(
        private _name: string,
        private _description: string,
        private _instructionVideo: string | Media,
        private _ingredients: { id: string; quantity: QuantityByServeSize; }[],
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
        private isAvailable: boolean,
        createdOn: Date,
        createdBy: string,
        mealKitId?: string,
        
    ) {
        super(createdOn,createdBy);
        if (mealKitId) {
            this._mealKitId = mealKitId;
        } else {
            this._mealKitId = Recipe.generateEntityId();
        }
    }

    public save() {
        throw new Error('method not implemented')
    }
    
    /** Getters & Setters */
    public get mealKitId(): string {
        return this._mealKitId;
    }
    public set mealKitId(value: string) {
        this._mealKitId = value;
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
    public get ingredients(): { id: string; quantity: QuantityByServeSize; }[] {
        return this._ingredients;
    }
    public set ingredients(value: { id: string; quantity: QuantityByServeSize; }[]) {
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


}




