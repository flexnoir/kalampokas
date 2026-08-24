// One-off migration: backfill the "35mm Film Photography" add-on price on
// existing offer documents that predate the field.
//
// Only fills the price when it is missing (setIfMissing) - never overwrites
// a value someone already set manually in the Studio.
//
// Usage (PowerShell):
//   $env:SANITY_API_TOKEN="<token with write access>"; node scripts/migrate-film35mm-addon.mjs
//
// Add -DryRun to preview without writing:
//   node scripts/migrate-film35mm-addon.mjs --dry-run

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o5nu4jkv";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const dryRun = process.argv.includes("--dry-run");

if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN env var. Create a write-enabled token in " +
      "manage.sanity.io -> API -> Tokens, then set it before running this script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const DEFAULTS = {
  wedding: { path: "addonPrices.film35mm", price: 500 },
  christening: { path: "christeningAddonPrices.film35mm", price: 500 },
  event: { path: "eventAddonPrices.film35mm", price: 500 },
};

async function main() {
  const offers = await client.fetch(
    `*[_type == "offer"]{ _id, clientName, eventType, addonPrices, christeningAddonPrices, eventAddonPrices }`
  );

  console.log(`Found ${offers.length} offer document(s).`);

  const tx = client.transaction();
  let patchCount = 0;

  for (const offer of offers) {
    const eventType = offer.eventType || "wedding";
    const config = DEFAULTS[eventType];
    if (!config) continue;

    const [group, field] = config.path.split(".");
    const alreadySet = offer[group]?.[field] !== undefined;
    if (alreadySet) continue;

    console.log(
      `${dryRun ? "[dry-run] " : ""}Patching ${offer._id} (${offer.clientName || "?"}, ${eventType}) -> ${config.path} = ${config.price}`
    );

    if (!dryRun) {
      tx.patch(offer._id, (p) => p.setIfMissing({ [config.path]: config.price }));
    }
    patchCount += 1;
  }

  if (patchCount === 0) {
    console.log("Nothing to patch - all offers already have the field set.");
    return;
  }

  if (dryRun) {
    console.log(`Dry run complete. ${patchCount} document(s) would be patched.`);
    return;
  }

  await tx.commit();
  console.log(`Done. Patched ${patchCount} document(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
