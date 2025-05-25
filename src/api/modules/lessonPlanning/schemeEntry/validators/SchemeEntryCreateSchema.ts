import { z } from "zod";

export const schemeEntryCreateSchema = z.object({
  week: z.number({ required_error: "Week is required" }),
  theme: z.string({ required_error: "Theme is required" }),
  topics: z.any({ required_error: "Topics are required" }),
  objectives: z.any({ required_error: "Objectives are required" }),
  resources: z.any({ required_error: "Resources are required" }),
  schemeOfWorkId: z.number({ required_error: "Scheme of Work ID is required" }),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
