/**
 * Adding a `code` string with a custom status code for every
 * exception is a good practice.
 *
 * Since when that exception is transferred to another process `instanceof`
 * check cannot be performed anymore so a `code` string is used instead.
 *
 * Code constants can be stored in a separate file so they
 * can be shared and reused on a receiving side (code sharing is
 * useful when developing fullstack apps or microservices)
 */
export const CODE_ARGUMENT_INVALID = "GENERIC.ARGUMENT_INVALID"
export const CODE_ARGUMENT_OUT_OF_RANGE = "GENERIC.ARGUMENT_OUT_OF_RANGE"
export const CODE_ARGUMENT_NOT_PROVIDED = "GENERIC.ARGUMENT_NOT_PROVIDED"
export const CODE_NOT_FOUND = "GENERIC.NOT_FOUND"
export const CODE_CONFLICT = "GENERIC.CONFLICT"
export const CODE_TIMEOUT = "GENERIC.TIMEOUT"
export const CODE_INTERNAL_SERVER_ERROR = "GENERIC.INTERNAL_SERVER_ERROR"

/**
 * 1xx_MESSAGE: Indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response.
 * 2xx_MESSAGE: Indicates that the client\'s request was successfully received, understood, and accepted.
 * 3xx_MESSAGE: Indicates that further action needs to be taken by the user agent in order to fulfill the request.
 * 4xx_MESSAGE: Indicates that the client seems to have erred.
 * 5xx_MESSAGE: Indicates that the server is aware that it has erred or is incapable of performing the requested method.
 */
export const HTTP_CONTINUE = 100
export const HTTP_SWITCHING_PROTOCOLS = 101
export const HTTP_PROCESSING = 102 // RFC2518
export const HTTP_EARLY_HINTS = 103 // RFC8297
export const HTTP_OK = 200
export const HTTP_CREATED = 201
export const HTTP_ACCEPTED = 202
export const HTTP_NON_AUTHORITATIVE_INFORMATION = 203
export const HTTP_NO_CONTENT = 204
export const HTTP_RESET_CONTENT = 205
export const HTTP_PARTIAL_CONTENT = 206
export const HTTP_MULTI_STATUS = 207 // RFC4918
export const HTTP_ALREADY_REPORTED = 208 // RFC5842
export const HTTP_IM_USED = 226 // RFC3229
export const HTTP_MULTIPLE_CHOICES = 300
export const HTTP_MOVED_PERMANENTLY = 301
export const HTTP_FOUND = 302
export const HTTP_SEE_OTHER = 303
export const HTTP_NOT_MODIFIED = 304
export const HTTP_USE_PROXY = 305
export const HTTP_RESERVED = 306
export const HTTP_TEMPORARY_REDIRECT = 307
export const HTTP_PERMANENTLY_REDIRECT = 308 // RFC7238
export const HTTP_BAD_REQUEST = 400
export const HTTP_UNAUTHORIZED = 401
export const HTTP_PAYMENT_REQUIRED = 402
export const HTTP_FORBIDDEN = 403
export const HTTP_NOT_FOUND = 404
export const HTTP_METHOD_NOT_ALLOWED = 405
export const HTTP_NOT_ACCEPTABLE = 406
export const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407
export const HTTP_REQUEST_TIMEOUT = 408
export const HTTP_CONFLICT = 409
export const HTTP_GONE = 410
export const HTTP_LENGTH_REQUIRED = 411
export const HTTP_PRECONDITION_FAILED = 412
export const HTTP_REQUEST_ENTITY_TOO_LARGE = 413
export const HTTP_REQUEST_URI_TOO_LONG = 414
export const HTTP_UNSUPPORTED_MEDIA_TYPE = 415
export const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416
export const HTTP_EXPECTATION_FAILED = 417
export const HTTP_I_AM_A_TEAPOT = 418 // RFC2324
export const HTTP_MISDIRECTED_REQUEST = 421 // RFC7540
export const HTTP_UNPROCESSABLE_ENTITY = 422 // RFC4918
export const HTTP_LOCKED = 423 // RFC4918
export const HTTP_FAILED_DEPENDENCY = 424 // RFC4918
export const HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425 // RFC2817
export const HTTP_UPGRADE_REQUIRED = 426 // RFC2817
export const HTTP_PRECONDITION_REQUIRED = 428 // RFC6585
export const HTTP_TOO_MANY_REQUESTS = 429 // RFC6585
export const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431 // RFC6585
export const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451
export const HTTP_INTERNAL_SERVER_ERROR = 500
export const HTTP_NOT_IMPLEMENTED = 501
export const HTTP_BAD_GATEWAY = 502
export const HTTP_SERVICE_UNAVAILABLE = 503
export const HTTP_GATEWAY_TIMEOUT = 504
export const HTTP_VERSION_NOT_SUPPORTED = 505
export const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506 // RFC2295
export const HTTP_INSUFFICIENT_STORAGE = 507 // RFC4918
export const HTTP_LOOP_DETECTED = 508 // RFC5842
export const HTTP_NOT_EXTENDED = 510 // RFC2774
export const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511 // RFC6585

// Cloudflare HTTP Status Codes
export const HTTP_CF_UNKNOWN = 520
export const HTTP_CF_WEB_SERVER_IS_DOWN = 521
export const HTTP_CF_CONNECTION_TIMED_OUT = 522
export const HTTP_CF_ORIGIN_IS_UNREACHABLE = 523
export const HTTP_CF_A_TIMEOUT_OCCURRED = 524
export const HTTP_CF_SSL_HANDSHAKE_FAILED = 525
export const HTTP_CF_INVALID_SSL_CERTIFICATE = 526
export const HTTP_CF_RAILGUN_ERROR = 527
