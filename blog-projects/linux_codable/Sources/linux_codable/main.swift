#if os(Linux)
import Glibc
#else
import Darwin
#endif
import Foundation
import LibBitstamp
import SwiftCLI

CLI.setup(name: "linux_codable")
CLI.register(command: PriceCommand())
// let _ = CLI.debugGo(with: "linux_codable price -t hourly")
let _ = CLI.go()
