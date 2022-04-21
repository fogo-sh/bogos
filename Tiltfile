load("ext://helm_remote", "helm_remote")
load("ext://uibutton", "cmd_button")

db_username = "bogos"
db_password = "bogos-binted"
db_name = "bogos"

db_connection_url = "postgresql://" + db_username + ":" + db_password + "@localhost/" + db_name + "?sslmode=disable"

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

cmd_button(
    "postgresql:upgrade",
    argv=[
        "migrate",
        "-database",
        db_connection_url,
        "-path",
        "backend/pkg/database/migrations",
        "up"
    ],
    resource="postgresql",
    icon_name="upgrade",
    text="Upgrade DB",
)
