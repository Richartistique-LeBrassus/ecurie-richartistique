import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // must be false for writes
  token: process.env.SANITY_WRITE_TOKEN, // ✅ token must be here
});

// ✅ Add this line right below
console.log("Write token present:", !!process.env.SANITY_WRITE_TOKEN);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: "http://localhost:3000/studio",
  },
});