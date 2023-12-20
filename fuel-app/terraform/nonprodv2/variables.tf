variable "environment" {}
variable "location" {
  default = "Central US"
}
variable "image_tag" {
  default = "latest"
}
variable "image" {
  default = "frontier-devops/fuel-homepage"
}
variable "service_principal" {}
variable "subscription_id" {}
variable "tenant_id" {}
variable "tfc_network_workspace_name" {}
variable "tfc_org_name" {}
variable "acr_name" {
  default =   "ftrrepo"
}
variable "acr_resource_group" {
  default = "rg-infra-nonprod-001"
}

variable "num_deploy_slots" {
    type        = number
    default     = 0
    description = "Defines the number of additional deployment slots to create"
}

variable "disable_logging" {
    type        = number
    default     = 0 // 0 - disable; 1 - enable
    description = "Controls logging"
}

variable "disable_auto-scaling" {
    type        = number
    default     = 0 // 0 - disable; 1 - enable
    description = "Controls auto-scaling"
}
