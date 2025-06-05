import { z } from "zod"

const environmentSchema: z.ZodObject<{
  LARK_WEBHOOK: z.ZodString
  LARK_MESSAGE_AUTHOR: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_SECRET: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_TITLE: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_SUBTITLE: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_ICON_IMG_KEY: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_TEMPLATE: z.ZodDefault<z.ZodOptional<z.ZodString>>
  LARK_MESSAGE_ENABLE_FORWARD: z.ZodDefault<z.ZodOptional<z.ZodString>>
  LARK_MESSAGE_UPDATE_MULTI: z.ZodDefault<z.ZodOptional<z.ZodString>>
  LARK_MESSAGE_URL: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_ANDROID_URL: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_IOS_URL: z.ZodString | z.ZodOptional<z.ZodString>
  LARK_MESSAGE_PC_URL: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_REPOSITORY: z.ZodString
  GITHUB_SERVER_URL: z.ZodString
  GITHUB_ACTOR: z.ZodString
  GITHUB_REF_NAME: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_HEAD_REF: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_BASE_REF: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_EVENT_NAME: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_REF: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_SHA: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_WORKFLOW: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_RUN_ID: z.ZodString | z.ZodOptional<z.ZodString>
  GITHUB_WORKFLOW_REF: z.ZodString | z.ZodOptional<z.ZodString>
}> = z.object({
  LARK_WEBHOOK: z.string(),
  LARK_MESSAGE_AUTHOR: z.string().optional(),
  LARK_SECRET: z.string().optional(),

  LARK_MESSAGE_TITLE: z.string().optional(),
  LARK_MESSAGE_SUBTITLE: z.string().optional(),
  LARK_MESSAGE_ICON_IMG_KEY: z.string().optional(),
  LARK_MESSAGE_TEMPLATE: z.string().optional().default("green"),
  LARK_MESSAGE_ENABLE_FORWARD: z.string().optional().default("true"),
  LARK_MESSAGE_UPDATE_MULTI: z.string().optional().default("false"),
  LARK_MESSAGE_URL: z.string().optional(),
  LARK_MESSAGE_ANDROID_URL: z.string().optional(),
  LARK_MESSAGE_IOS_URL: z.string().optional(),
  LARK_MESSAGE_PC_URL: z.string().optional(),

  GITHUB_REPOSITORY: z.string(),
  GITHUB_SERVER_URL: z.string(),
  GITHUB_ACTOR: z.string(),
  GITHUB_REF_NAME: z.string(),
  GITHUB_WORKFLOW_REF: z.string(),
  GITHUB_SHA: z.string(),
  GITHUB_HEAD_REF: z.string().optional(),
  GITHUB_BASE_REF: z.string().optional(),
  GITHUB_EVENT_NAME: z.string().optional(),
  GITHUB_REF: z.string().optional(),
  GITHUB_WORKFLOW: z.string().optional(),
  GITHUB_RUN_ID: z.string().optional(),
})

export function getEnvironment(): Environment {
  const env = process.env
  const result = environmentSchema.safeParse(env)
  if (!result.success) {
    throw new Error(`Invalid environment: ${result.error.message}`)
  }
  return result.data
}

export type Environment = z.infer<typeof environmentSchema>
