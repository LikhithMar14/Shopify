export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Quick Cart"
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A modern e-commerce platform"
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(', '):['PayPal','Stripe','CashOnDelivery'];

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';
