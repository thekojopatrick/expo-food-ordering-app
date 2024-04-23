// esm.sh is used to compile stripe-node to be compatible with ES modules.
import Stripe from 'https://esm.sh/stripe@15.3.0?target=deno&deno-std=0.132.0&no-check';
//import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno&deno-std=0.132.0&no-check';
//import Stripe from 'stripe';

export const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
	httpClient: Stripe.createFetchHttpClient(),
	apiVersion: '2024-04-10',
});

console.log({ stripe });
