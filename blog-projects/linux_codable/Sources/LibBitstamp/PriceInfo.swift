import Foundation

// {
//     ask = "3414.97";
//     bid = "3409.03";
//     high = "3448.00";
//     last = "3415.00";
//     low = "3311.17";
//     open = 3410;
//     timestamp = 1502415463;
//     volume = "9187.26133425";
//     vwap = "3398.49";
// }

public struct PriceInfo: Codable {
    let ask: Double
    let bid: Double
    let high: Double
    let last: Double
    let low: Double
    let `open`: Int
    let timestamp: Date
    let volume: Double
    let vwap: Double
}
