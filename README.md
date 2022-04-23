# bogos

bogos binted 👽

_work in progress_

## Setup (development)

- Install the dependencies:
  - [kind](https://kind.sigs.k8s.io/docs/user/quick-start#installation)
  - [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
  - [helm](https://helm.sh/docs/intro/install/)
  - [ctlptl](https://github.com/tilt-dev/ctlptl#how-do-i-install-it)
  - [tilt](https://docs.tilt.dev/#get-tilt)
- Create a new `kind` cluster
  - `ctlptl create cluster kind --registry=ctlptl-registry`
- Start up everything
  - `tilt up`
- Once started, click the "Upgrade DB" button on the postgresql pod to apply database migrations
