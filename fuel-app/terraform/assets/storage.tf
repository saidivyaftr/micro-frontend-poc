module "storage-container" {
  source      = "app.terraform.io/frontier-devops/storage-container/azure"
  version     = "~>0.1"
  name        = "fuelpageassets"
  environment = var.environment
  allowed_methods = [
    "OPTIONS",
    "GET"
  ]
  network_rules = var.environment == "staging" ? false : true
  ip_rules = local.storage_ips
  tags = {
    owner = ""
    createdby = ""
  }
}

locals {
  storage_ips = "${data.azurerm_network_service_tags.frontdoor_backend_ips.ipv4_cidrs}"
}

data "azurerm_network_service_tags" "frontdoor_backend_ips" {
  location        = "Central US"
  service         = "AzureFrontDoor"
}
