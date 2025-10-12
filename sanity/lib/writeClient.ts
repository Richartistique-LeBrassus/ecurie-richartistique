import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

console.log("Write token present:", !!process.env.SANITY_WRITE_TOKEN); 

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token: process.env.SANITY_WRITE_TOKEN, 
});