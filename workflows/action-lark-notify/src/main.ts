import { createHmac } from "node:crypto"
import core from "@actions/core"
import { HttpClient } from "@actions/http-client"
import shell from "shelljs"
import { getEnvironment } from "./environment"
import type { LarkResponse, RequestSignature } from "./types"

const env = getEnvironment()

export function toBoolean(value: string | undefined): boolean {
  return value === "true"
}

export function getRequestSignature(): RequestSignature {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const secret = env.LARK_SECRET
  if (!secret) {
    core.warning(
      "LARK_SECRET is not set, sign is skipped and it may lead to signature verification failure in Lark.",
    )
    core.warning(
      "See https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot#c1491056 for more information.",
    )
    return {}
  }
  const buffer = Buffer.from(`${timestamp}\n${secret}`, "utf-8")
  const sign = createHmac("sha256", buffer).update(Buffer.alloc(0)).digest("base64")
  return {
    timestamp,
    sign,
  }
}

export function getWorkflowFileName(): string | undefined {
  return env.GITHUB_WORKFLOW_REF?.split("@")[0].split("/").at(-1)
}

export function getCardHeader(): Record<string, any> {
  const data: Record<string, any> = {
    title: {
      tag: "plain_text",
      content: env.LARK_MESSAGE_TITLE || env.GITHUB_WORKFLOW,
    },
    subtitle: {
      tag: "plain_text",
      content: env.LARK_MESSAGE_SUBTITLE,
    },
    icon: {
      img_key: env.LARK_MESSAGE_ICON_IMG_KEY,
    },
    template: env.LARK_MESSAGE_TEMPLATE,
  }
  if (!data.icon.img_key) {
    data.icon = undefined
  }
  return data
}

export function getCardElements(): any[] {
  const result = shell.exec("git log -1 --pretty=%B", { silent: true })
  if (result.code !== 0) {
    core.setFailed(
      `Cannot get Git information. Have you setup the action correctly? ${
        result.stderr ?? result.stdout
      }`,
    )
  }
  const lastGitMessage = result.stdout.trim()

  return [
    {
      tag: "column_set",
      flex_mode: "bisect",
      background_style: "default",
      horizontal_spacing: "default",
      columns: [
        {
          tag: "column",
          width: "weighted",
          weight: 1,
          elements: [
            {
              tag: "markdown",
              content: `**Repo**\n[${env.GITHUB_REPOSITORY}](${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY})`,
            },
          ],
        },
        {
          tag: "column",
          width: "weighted",
          weight: 1,
          elements: [
            {
              tag: "markdown",
              content: `**Actor**\n[${
                env.LARK_MESSAGE_AUTHOR || env.GITHUB_ACTOR
              }](${env.GITHUB_SERVER_URL}/${env.LARK_MESSAGE_AUTHOR || env.GITHUB_ACTOR})`,
            },
          ],
        },
      ],
    },
    {
      tag: "column_set",
      flex_mode: "bisect",
      background_style: "default",
      horizontal_spacing: "default",
      columns: [
        {
          tag: "column",
          width: "weighted",
          weight: 1,
          elements: [
            {
              tag: "markdown",
              content: `**Ref**\n[${env.GITHUB_REF}](${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/tree/${env.GITHUB_REF_NAME})`,
            },
          ],
        },
        {
          tag: "column",
          width: "weighted",
          weight: 1,
          elements: [
            {
              tag: "markdown",
              content: `**Event**\n${env.GITHUB_EVENT_NAME}`,
            },
          ],
        },
      ],
    },
    {
      tag: "column_set",
      flex_mode: "bisect",
      background_style: "default",
      horizontal_spacing: "default",
      columns: [
        {
          tag: "column",
          width: "weighted",
          weight: 1,
          elements: [
            {
              tag: "markdown",
              content: `**Workflow / Run**\n[${env.GITHUB_WORKFLOW}](${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/workflows/${getWorkflowFileName()}) / [${env.GITHUB_RUN_ID}](${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID})`,
            },
          ],
        },
        {
          tag: "column",
          width: "weighted",
          weight: 1,
          elements: [
            {
              tag: "markdown",
              content: `**Commit**\n[${env.GITHUB_SHA?.slice(0, 8)}](${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/commit/${env.GITHUB_SHA})`,
            },
          ],
        },
      ],
    },
    {
      tag: "markdown",
      content: `**Message**\n${lastGitMessage}`,
    },
  ]
}

export function getCardConfig(): Record<string, any> {
  return {
    enable_forward: toBoolean(env.LARK_MESSAGE_ENABLE_FORWARD),
    update_multi: toBoolean(env.LARK_MESSAGE_UPDATE_MULTI),
  }
}

export function getCardLink(): Record<string, any> {
  return {
    url: env.LARK_MESSAGE_URL,
    android_url: env.LARK_MESSAGE_ANDROID_URL,
    ios_url: env.LARK_MESSAGE_IOS_URL,
    pc_url: env.LARK_MESSAGE_PC_URL,
  }
}

export async function getRequestBody(): Promise<Record<string, any>> {
  const requestSignature = getRequestSignature()
  const header = getCardHeader()
  const elements = getCardElements()
  const config = getCardConfig()
  const link = getCardLink()

  return {
    ...requestSignature,
    msg_type: "interactive",
    card: {
      header,
      elements,
      config,
      card_link: link,
    },
  }
}

export async function notifyLarkSuite(): Promise<LarkResponse | undefined> {
  const httpClient = new HttpClient()
  const larkHookUrl = env.LARK_WEBHOOK
  core.debug(`Request URL: ${larkHookUrl}`)
  const requestBody = await getRequestBody()
  core.debug(`Request Body: ${JSON.stringify(requestBody, null, 2)}`)

  try {
    const response = await httpClient.postJson<LarkResponse>(larkHookUrl, requestBody)
    core.debug(`Server Response: ${JSON.stringify(response, null, 2)}`)
    const { statusCode, result } = response
    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(`Server status code ${statusCode} is out of range`)
    }
    if (!result) {
      throw new Error("Server response is empty")
    }
    if (result.code !== 0) {
      throw new Error(`Server response code: ${result.code}, message: ${result.msg}`)
    }
    return result
  } catch (error) {
    core.setFailed(`Notify failed. Error message: ${error.message}`)
  }
}
