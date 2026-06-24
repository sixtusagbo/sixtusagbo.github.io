import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "unsubscribed"],
      default: "pending",
    },
    // Random, unguessable token used for both the confirm and unsubscribe links.
    token: { type: String, required: true, index: true },
    confirmedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type SubscriberDoc = InferSchemaType<typeof subscriberSchema>;

export const Subscriber: Model<SubscriberDoc> =
  models.Subscriber ?? model("Subscriber", subscriberSchema);
