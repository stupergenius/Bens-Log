import Foundation
import LibBitstamp
import SwiftCLI

// Adding an extension so we can use PriceIntervalType as a command key.
extension PriceIntervalType: Keyable {}

class PriceCommand: Command {
    let name = "price"

    static let validTypes = PriceIntervalType.allCases.map({$0.rawValue}).joined(separator: ", ")
    let type = Key<PriceIntervalType>("-t", "--type", usage: "The type of price, one of: \(validTypes)")

    func execute() throws {
        dump(type)
    }
}