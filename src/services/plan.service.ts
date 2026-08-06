import Plan, { type IPlan } from '@/models/Plan';
import { PLAN_SEED_DATA } from '@/lib/constants';

/**
 * Reads plans from MongoDB, seeding the collection from PLAN_SEED_DATA the
 * first time it's empty. Callers must have already called connectToDatabase().
 */
export async function getPlans(): Promise<IPlan[]> {
    const count = await Plan.countDocuments();
    if (count === 0) {
        await Plan.insertMany(PLAN_SEED_DATA);
    }

    return Plan.find().sort({ order: 1 });
}

export async function getPlanById(planId: number): Promise<IPlan | null> {
    const count = await Plan.countDocuments();
    if (count === 0) {
        await Plan.insertMany(PLAN_SEED_DATA);
    }

    return Plan.findOne({ id: planId });
}
