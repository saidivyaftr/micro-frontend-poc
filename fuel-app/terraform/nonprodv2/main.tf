data "terraform_remote_state" "network" {
  backend = "remote"

  config = {
    organization = var.tfc_org_name
    workspaces   = {
      name = var.tfc_network_workspace_name
    }
  }
}

locals {
  subnet_id              = data.terraform_remote_state.network.outputs.env_outputs[var.environment]["homepage_integration_subnet_id"]
  pvt_endpoint_subnet_id = data.terraform_remote_state.network.outputs.env_outputs[var.environment]["pvt_endpoints_subnet_id"]
  vnet_id                = data.terraform_remote_state.network.outputs.vnet_id
  pvt_dns_zone_id        = data.terraform_remote_state.network.outputs.pvt_dns_zone_id
  do_autoscaling         = var.environment == "prod" ? true : false
}

module "homepage" {
  source               = "app.terraform.io/frontier-devops/app-services/azure"
  version              = "~> 0.4"
  name                 = "ftr-homepage"
  location             = var.location
  environment          = var.environment
  image_tag            = var.image_tag
  image                = var.image
  subscription_id      = var.subscription_id
  health_check         = "/pages"
  subnet_id            = local.subnet_id
  acr_name             = var.acr_name
  acr_resource_group   = var.acr_resource_group
  app_settings         = { vnetRouteAllEnabled = true }
  disable_auto-scaling = var.disable_auto-scaling
  disable_logging      = var.disable_logging
  num_deploy_slots     = var.num_deploy_slots
}

module "pvt_endpoint" {
  source                         = "./private-endpoint"
  environment                    = var.environment
  location                       = var.location
  name                           = "ftr-homepage"
  private_connection_resource_id = module.homepage.app_service_id
  pvt_endpoint_subnet_id         = local.pvt_endpoint_subnet_id
  resource_group_name            = module.homepage.resource_group_name
  vnet_id                        = local.vnet_id
  pvt_dns_zone_id                = local.pvt_dns_zone_id
}
