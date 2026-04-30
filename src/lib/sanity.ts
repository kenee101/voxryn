import { createClient } from "@sanity/client";
import { type SanityDocument } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: import.meta.env.VITE_SANITY_USE_CDN,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

// Test query
export async function testConnection() {
  try {
    console.log("Testing Sanity connection...");

    // Simple query to test the connection
    const result = await client.fetch('count(*[!(_id in path("_.**"))])');

    console.log("✅ Successfully connected to Sanity!");
    console.log(`Total documents in your dataset: ${result}`);
    return true;
  } catch (error: any) {
    console.error("❌ Error connecting to Sanity:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.body);
    }
    return false;
  }
}

// Run the test if this file is executed directly
if (import.meta.env.DEV) {
  testConnection().then((success) => {
    if (!success) {
      console.log("\nTroubleshooting tips:");
      console.log(
        "1. Make sure your .env.local file exists with VITE_SANITY_PROJECT_ID and VITE_SANITY_API_TOKEN",
      );
      console.log("2. Verify your Sanity token has the correct permissions");
      console.log("3. Check that your project ID is correct");
      console.log("4. Ensure your network allows connections to api.sanity.io");
    }
  });
}

const options = { next: { revalidate: 30 } };

// Basic query example
export async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    price,
    stock,
    image
  }`;
  return client.fetch<SanityDocument[]>(query, options);
  // return client.fetch<SanityDocument[]>(query, {}, options);
}
