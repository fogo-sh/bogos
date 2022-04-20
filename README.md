# bogos

bogos binted 👽

_work in progress_

## Setup (development)

- Install [kind](https://kind.sigs.k8s.io/docs/user/quick-start#installation), [ctlptl](https://github.com/tilt-dev/ctlptl#how-do-i-install-it), and [tilt](https://docs.tilt.dev/#get-tilt)
- Create a new `kind` cluster
  - `ctlptl create cluster kind --registry=ctlptl-registry`
- Start up everything
  - `tilt up`
