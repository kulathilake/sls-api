/**
 * common file that exports all environment variables.
 * grouped by modules.
 */

/** common */
export const STAGE = process.env.STAGE || 'dev'

export const AWS_REGION = process.env.AWS_REGION || 'ap-southeast-1';

/** users */
export const USER_TABLE = process.env.USER_TABLE || `${STAGE}-user-table`;

/** cycles */
export const CYCLE_TABLE = process.env.CYCLE_TABLE || `${STAGE}-cycle-table`;

/** habits */
export const HABIT_TABLE = process.env.HABIT_TABLE || `${STAGE}-habit-table`;




