export function normalizeInquiryPayload(payload = {}) {
    const sourcePage = String(payload.sourcePage || payload.source || 'contact').toLowerCase();
    const productName = payload.productName || payload.product || '';
    const subject = payload.subject || (sourcePage === 'product' ? 'Product Inquiry' : 'General Query');

    return {
        name: payload.name || payload.fullName || 'Anonymous',
        email: payload.email || '',
        company: payload.company || '',
        subject,
        message: payload.message || '',
        sourcePage: sourcePage === 'product' ? 'product' : 'contact',
        productName: productName || (sourcePage === 'product' ? 'Product enquiry' : ''),
        createdAt: new Date(),
    };
}
