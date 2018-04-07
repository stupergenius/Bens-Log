public enum PriceIntervalType: String {
    case last, hourly, vwap

    public static let allCases: [PriceIntervalType] = [.last, .hourly, .vwap]
}