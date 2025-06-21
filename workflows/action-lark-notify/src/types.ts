export interface RequestSignature {
  timestamp?: string
  sign?: string
}

export interface LarkResponse {
  code: number
  msg: string
  data: any
}
