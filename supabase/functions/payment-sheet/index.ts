//import * as mod from 'https://deno.land/std@0.168.0/http/server.ts';
//import {serve} from 'https://deno.land/std@0.223.0/http/server.ts';

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';

console.log('payment-sheet handler up and running!');

serve(async (req) => {
	try {
		const { amount } = await req.json();

		// Create a PaymentIntent so that the SDK can charge the logged in customer.
		const paymentIntent = await stripe?.paymentIntents.create({
			amount: 1099,
			currency: 'usd',
			// customer: customer,
			// In the latest version of the API, specifying the `automatic_payment_methods` parameter
			// is optional because Stripe enables its functionality by default.
			// automatic_payment_methods: {
			// 	enabled: true,
			// },
		});
		const res = {
			publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
			paymentIntent: paymentIntent.client_secret,
			// ephemeralKey: ephemeralKey.secret,
			// customer: customer,
		};
		return new Response(JSON.stringify(res), {
			headers: { 'Content-Type': 'application/json' },
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			headers: { 'Content-Type': 'application/json' },
			status: 400,
		});
	}
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"kojodev"}'

*/
