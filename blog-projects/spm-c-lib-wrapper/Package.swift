import PackageDescription

let package = Package(
    name: "Clibadder",
    targets: [
        Target(name: "Clibadder", dependencies: ["libadder"])
    ]
)
