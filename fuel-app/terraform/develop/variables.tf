variable "location" {
    type = string
    default = "Central US"
}

variable "sku_tier" {
    type = string
    default = "Standard"
    description = "Defines the performance tier of the new app service."
}

variable "sku_size" {
    type = string
    default = "S1"
    description = "Defines the performance class of the new App Service. The default 'S1' provides 1 CPU/1 Core with 1.75gb of ram"
}

variable "environment" {
  type        = string
  description = "Environment to which the application belongs"
  default     = "dev"
}

variable "website_port" {
  type        = number
  description = "The exposed container port"
  default     = 3000
}

variable "num_deploy_slots" {
    type = number
    default = 1
    description = "Defines the number of deployment slots to create"
}

variable "instance_min" {
    type = number
    default = 1
    description = "Minimum number of App Services instances when scaling"
}

variable "instance_max" {
    type = number
    default = 3
    description = "Maximum number of App Services instances when scaling"
}

variable "instance_default" {
    type = number
    default = 2
    description = "Maximum number of App Services instances when scaling"
}

variable "scale_up_threshold" {
    type = number
    default = 80
    description = "CPU usage threshold to trigger a scale-up action"
}

variable "scale_down_threshold" {
    type = number
    default = 50
    description = "CPU usage threshold to trigger a scale-down action"
}

variable "subscription_id" {
    description = "Azure subscription id defined in Terraform cloud"
}

variable "image_tag" {
    description = "Docker image to use from the image repository"
    default = "latest"
}

variable "registry_name" {
  default = "fuelhome"
}

variable "registry_group" {
  default = "fuel-home-sandbox-acr"
}

variable "production" {
    description = "Docker image to use from the image repository for the production slot"
    default = "latest"
}

variable "staged" {
    description = "Docker image to use from the image repository for the staged slot"
    default = "latest"
}

data "azurerm_container_registry" "ftrContainerRepo" {
  name                = "${var.registry_name}"
  resource_group_name = "${var.registry_group}"
}

locals {
    subscription_id = "${var.subscription_id}"    
    name = "ftr-homepage-${var.environment}"
    docker_reg_svr_pwd = sensitive(data.azurerm_container_registry.ftrContainerRepo.admin_password)    
    production = var.image_tag != "" ? var.image_tag : var.production
    staged = var.image_tag != "" ? var.image_tag : var.staged
}