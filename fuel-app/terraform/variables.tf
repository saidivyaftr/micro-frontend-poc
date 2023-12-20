variable "location" {
  description = "The location of the resource group in which resources are created"
  default     = "centralus"
}

variable "environment" {
  description = "What environment are we running on?"
  type        = string
}

variable "dns_prefix" {
  type    = string
  default = "aci-fuel-homepage"
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = { "env" = "sandbox", "tag" = "homepage" }
}
