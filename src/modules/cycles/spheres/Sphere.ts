/**
 * A spehere is a key region of a user's life
 * that needs to be organized with added habits.
 */

export interface Sphere {
    type: SphereType;
    label: string;
    description: string 
    cycleGoal: string
    cycleGoalSymbol: string
    dailyHabits: string[]
}

export enum SphereType {
    BODY = "Body",
    MIND = "Mind",
    SOUL = "Soul"
}