resource "azurerm_resource_group" "root" {
  name		= "rg-appservice-homepage-${var.environment[0]}-001"
  location	= var.location
}

resource "azurerm_app_service_virtual_network_swift_connection" "root" {
  app_service_id = azurerm_app_service.root.id
  subnet_id      = data.azurerm_subnet.subnet.id
}

// Define the service plan to be used for the App Service
resource "azurerm_app_service_plan" "root" {
  name				        = "homepage-${var.environment[0]}-service-plan"
  kind                = "Linux"
  reserved            = true
  location            = var.location
  resource_group_name = azurerm_resource_group.root.name

  sku {
    tier = var.sku_tier
    size = var.sku_size
  }
}

// Define the primary instance of the application
resource "azurerm_app_service" "root" {
  name                = local.name
  location            = var.location
  resource_group_name = azurerm_resource_group.root.name
  app_service_plan_id = azurerm_app_service_plan.root.id
  https_only          = true

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.azurerm_container_registry.ftrContainerRepo.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = data.azurerm_container_registry.ftrContainerRepo.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = "${local.docker_reg_svr_pwd}"
    WEBSITES_PORT                   = var.website_port
    minTlsVersion                   = "1.2"
  }

  site_config {
    linux_fx_version = "DOCKER|${data.azurerm_container_registry.ftrContainerRepo.login_server}/frontier-devops/fuel-homepage:latest" # Find a graceful way of handling this
    always_on        = "true"
    health_check_path = "/pages"
  
    ip_restriction {
      name                      = "Allow access from vnet"
      virtual_network_subnet_id = "${data.azurerm_subnet.gateway.id}"
      priority                  = "200"
    } 

    ftps_state = "Disabled"
  }

  identity {
    type = "SystemAssigned"
  }

 logs {
    application_logs {
      file_system_level = "Error"
    }
    http_logs {
      file_system {
        retention_in_days = "7"
        retention_in_mb   = "100"
      }
    }
  }
}

// Define a deployment slot connected to the initial App Services instance. 
resource "azurerm_app_service_slot" "root" {
  count               = var.num_deploy_slots
  name                = format("app-%02d", count.index)
  app_service_name    = local.name
  location            = var.location
  resource_group_name = azurerm_resource_group.root.name
  app_service_plan_id = azurerm_app_service_plan.root.id

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.azurerm_container_registry.ftrContainerRepo.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = data.azurerm_container_registry.ftrContainerRepo.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = "${local.docker_reg_svr_pwd}"
    WEBSITES_PORT                   = var.website_port
    minTlsVersion                   = "1.2"
  }
  
site_config {
    linux_fx_version = "DOCKER|${data.azurerm_container_registry.ftrContainerRepo.login_server}/frontier-devops/fuel-homepage:latest"
    always_on        = "true"
    health_check_path = "/pages"
  }

  identity {
    type = "SystemAssigned"
  }
}


// Auto-scaling policy
resource "azurerm_monitor_autoscale_setting" "root" {
  name                = local.name
  resource_group_name = azurerm_resource_group.root.name
  location            = var.location
  target_resource_id  = azurerm_app_service_plan.root.id

  profile {
    name = "${local.name}-scaling-policy"

    capacity {
      default = var.instance_default
      minimum = var.instance_min
      maximum = var.instance_max
    }

    rule {
      metric_trigger {
        metric_name        = "CpuPercentage"
        metric_resource_id = azurerm_app_service_plan.root.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT10M"
        time_aggregation   = "Average"
        operator           = "GreaterThan"
        threshold          = var.scale_up_threshold

        dimensions {
          name     = "AppName"
          operator = "Equals"
          values   = ["App1"]
        }
      }

      scale_action {
        direction = "Increase"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT5M"
      }
    }

    rule {
      metric_trigger {
        metric_name        = "CpuPercentage"
        metric_resource_id = azurerm_app_service_plan.root.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT10M"
        time_aggregation   = "Average"
        operator           = "LessThan"
        threshold          = var.scale_down_threshold
      }

      scale_action {
        direction = "Decrease"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT5M"
      }
    }
  }
}  