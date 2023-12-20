locals {
  dns_prefix = "${var.dns_prefix}-${var.environment}"
  prefix     = "fuel-home-${var.environment}"
}

data "azurerm_container_registry" "home" {
  name                = "fuelacr"
  resource_group_name = "fuel-shared-${var.environment}"
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-homepage-${var.environment}-${var.location}-001"
  location = var.location
}

# TODO: Add IP ACLs to only accept traffic from the specificed front doors 
# Link: https://docs.microsoft.com/en-us/azure/frontdoor/front-door-faq#how-do-i-lock-down-the-access-to-my-backend-to-only-azure-front-door-
resource "azurerm_container_group" "this" {
  name                = "fuel-homepage-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  ip_address_type     = "public"
  dns_name_label      = local.dns_prefix
  os_type             = "Linux"
  image_registry_credential {
    server   = data.azurerm_container_registry.home.login_server
    username = data.azurerm_container_registry.home.admin_username
    password = data.azurerm_container_registry.home.admin_password
  }

  container {
    name   = "homepage"
    image  = "${data.azurerm_container_registry.home.login_server}/frontier-devops/fuel-homepage:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 3000
      protocol = "TCP"
    }

    readiness_probe {
      http_get {
        path   = "/"
        port   = 3000
        scheme = "Http"
      }
      initial_delay_seconds = 30
      period_seconds        = 15
      timeout_seconds       = 120
    }

    liveness_probe {
      http_get {
        path   = "/"
        port   = 3000
        scheme = "Http"
      }
      initial_delay_seconds = 150
      period_seconds        = 15
      timeout_seconds       = 120
    }
  }

  lifecycle {
    ignore_changes = [
      container[0].image
    ]
  }

  tags = {
    environment = var.environment
  }
}



