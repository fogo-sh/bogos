terraform {
  cloud {
    organization = "fogo-sh"

    workspaces {
      name = "bogos"
    }
  }
}
