import { redirect } from 'next/navigation';

export default async function LegacyPaymentFailurePage({ searchParams }) {
    const params = await searchParams;
    const query = new URLSearchParams();

    if (params?.orderId) {
        query.set('orderId', params.orderId);
    }

    if (params?.reason) {
        query.set('reason', params.reason);
    }

    const suffix = query.toString() ? `?${query.toString()}` : '';
    redirect(`/payment/failed${suffix}`);
}
