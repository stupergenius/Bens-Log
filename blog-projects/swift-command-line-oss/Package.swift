// swift-tools-version:4.0
import PackageDescription

let package = Package(
    name: "btc",
    products: [
        .executable(name: "btc", targets: ["btc"]),
    ],
    dependencies: [
        .package(url: "http://github.com/kylef/Commander", .exact("0.5.0")),
    ],
    targets: [
        .target(name: "btc", dependencies: ["Commander"], path: "Sources"),
    ]
)
