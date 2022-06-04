load("ext://helm_remote", "helm_remote")
load("ext://uibutton", "cmd_button")

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

cmd_button(
    "postgresql:upgrade",
    argv=["sh", "-c", "cd ./backend && go run . db upgrade"],
    resource="postgresql",
    icon_name="upgrade",
    text="Upgrade DB",
)

helm_remote(
    "minio",
    repo_url="https://charts.min.io/",
    set=[
        "resources.requests.memory=512Mi",
        "rootUser=root",
        "rootPassword=bogos-binted",
        "users[0].accessKey=bogos",
        "users[0].secretKey=bogos-binted",
        "users[0].policy=consoleAdmin",
        "buckets[0].name=bogos-bucket",
        "buckets[0].policy=download",
        "persistence.size=5Gi",
        "replicas=1",
        "mode=standalone",
    ],
)
k8s_resource("minio", port_forwards=[9000, 9001])
