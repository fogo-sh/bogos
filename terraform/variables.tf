variable "cloudflare_account_id" {
  description = "ID of the Cloudflare account to create Bogos resources in."
  type        = string
}

variable "r2_access_key" {
  description = "IAM access key ID for Cloudflare R2, to use for managing buckets."
  type        = string
}

variable "r2_secret_key" {
  description = "IAM secret key for Cloudflare R2, to use for managing buckets."
  type        = string
}
