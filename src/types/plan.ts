export interface Plan {
    id: number;
    title: string;
    price: string;
    bookingAmountRupees: number;
    icon: string;
    bestFor: string;
    features: string[];
    featured?: boolean;
}

export interface PlanSeed extends Plan {
    order: number;
}
