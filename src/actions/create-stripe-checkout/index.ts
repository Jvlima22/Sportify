"use server";

import { headers } from "next/headers";
import Stripe from "stripe";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

const input = z.object({
  priceId: z.string().min(1, "Price ID é obrigatório"),
});

type Input = z.infer<typeof input>;

export const createStripeCheckout = actionClient.action(
  input,
  async ({ priceId }: Input) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user) {
        throw new Error("Unauthorized");
      }
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Stripe secret key not found");
      }
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-05-28.basil",
      });
      const { id: sessionId } = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
        customer_email: session.user.email,
        subscription_data: {
          metadata: {
            userId: session.user.id,
          },
        },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
      });
      return {
        sessionId,
      };
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  }
);
