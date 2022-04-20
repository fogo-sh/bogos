load("ext://helm_remote", "helm_remote")

db_username = "bogos"
db_password = "bogos-binted"
db_name = "bogos"

helm_remote(
    "postgresql",
    repo_url="https://charts.bitnami.com/bitnami",
    set=[
        "auth.username=" + db_username,
        "auth.password=" + db_password,
        "auth.database=" + db_name,
    ],
)
k8s_resource("postgresql", port_forwards=[5432])
