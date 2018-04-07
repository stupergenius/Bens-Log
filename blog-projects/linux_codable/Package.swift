// swift-tools-version:4.0

import PackageDescription

let package = Package(
    name: "linux_codable",
    products: [
        .executable(name: "linux_codable", targets: ["linux_codable"]),
        .library(name: "LibBitstamp", targets: ["LibBitstamp"])
    ],
    dependencies: [
        .package(url: "https://github.com/jakeheis/SwiftCLI", .revision("ec53ea26658b2cf718d24add95a78228a0ec6230")),
    ],
    targets: [
        .target(
            name: "linux_codable",
            dependencies: ["SwiftCLI", "LibBitstamp"]),
        .target(
            name: "LibBitstamp",
            dependencies: []),
    ]
)
