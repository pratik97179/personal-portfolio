import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const isProductionBuild =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.npm_lifecycle_event === "build";

export const env = createEnv({
    clientPrefix: "NEXT_PUBLIC_",
    server: {
        DATABASE_URL: z.string().url(),

        GITHUB_TOKEN: z.string().optional(),
        ALLOWED_GITHUB_USERNAME: z.string().optional(),

        IP_INFO_TOKEN: z.string().optional(),
    },
    client: {},
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,

        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        ALLOWED_GITHUB_USERNAME: process.env.ALLOWED_GITHUB_USERNAME,

        IP_INFO_TOKEN: process.env.IP_INFO_TOKEN,
    },
    emptyStringAsUndefined: true,
    // Only skip during `next build` page collection — never at request runtime.
    skipValidation:
        isProductionBuild || process.env.SKIP_ENV_VALIDATION === "1",
});
