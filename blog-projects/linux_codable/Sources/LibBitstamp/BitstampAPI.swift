#if os(Linux)
import Glibc
#else
import Darwin
#endif
import Foundation

public protocol BitstampAPIOperations {
    func prices() -> [PriceIntervalType : Float]
    func price(`for` interval: PriceIntervalType) -> Float
}

public enum BitstampAPI: BitstampAPIOperations {
    public func prices() -> [PriceIntervalType : Float] {
        return [:]
    }

    public func price(for interval: PriceIntervalType) -> Float {
        return 0.0
    }
}
