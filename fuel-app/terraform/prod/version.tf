terraform {
  cloud {
    organization = "frontier-devops"
    workspaces {
      name = "fuel-homepage-Prod"
    }
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.95.0"
    }
  }
  required_version = "~> 1.0"
}

provider "azurerm" {
  features {}
  skip_provider_registration  = true
}
