// swift-tools-version:4.0
import PackageDescription

let package = Package(
    name: "Clibadder",
    products: [
        .library(name: "Clibadder", targets: ["Clibadder"])
    ],
    targets: [
        .target(name: "libadder", dependencies: [], exclude: ["adder.c"]),
        .target(name: "Clibadder", dependencies: ["libadder"]),
        .testTarget(name: "ClibadderTests", dependencies: ["Clibadder"])
    ]
)
