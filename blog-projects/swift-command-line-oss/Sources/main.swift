#if os(Linux)
import Glibc
#else
import Darwin
#endif
import Commander
import Foundation

// Handy enum to store the selected interval type.
enum IntervalType: String, CustomStringConvertible {
    case lastIntervalType = "last"
    case hourlyIntervalType = "hourly"
    case vwapIntervalType = "vwap"

    var description: String {
        get {
            return self.rawValue
        }
    }
}

extension IntervalType {
    var bitstampURL: String { get {
        switch self {
        case .lastIntervalType, .vwapIntervalType:
            return "https://www.bitstamp.net/api/ticker/"
        default:
            return "https://www.bitstamp.net/api/ticker_hour/"
        }
    }}
    
    var priceKey: String { get {
        switch self {
        case .lastIntervalType, .hourlyIntervalType:
            return "last"
        default:
            return "vwap"
        }
    }}
}

func retrievePriceData(_ interval: IntervalType) -> Data? {
    // let
    //     url = bitstampURL(interval)
    //     request = NSURLRequest(URL: url),
    //     session = NSURLSession.sharedSession(),
    //     semaphore = dispatch_semaphore_create(0)

    // let task = session.dataTaskWithRequest(request) {
    //      (data, response, error) -> Void in

    //     if error == nil {
    //         completion(data)
    //     } else {
    //         completion(nil)
    //     }
    //     dispatch_semaphore_signal(semaphore)
    // }
    // task.resume()

    // dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER)

    guard let url = URL(string: interval.bitstampURL) else { return nil }
    do {
        return try Data(contentsOf: url)
    } catch {
        return nil
    }

    // let task = NSTask()
    // task.launchPath = "/usr/bin/curl"
    // task.arguments = [bitstampURL(interval)]

    // let pipe = NSPipe()
    // task.standardOutput = pipe
    // task.launch()
    // task.waitUntilExit()

    // if (task.terminationStatus == 0) {
    //     let data = pipe.fileHandleForReading.readDataToEndOfFile()
    //     print(NSString(data: data, encoding: NSUTF8StringEncoding))
    //     return data
    // } else {
    //     return nil
    // }
}

func parsePrice(_ interval: IntervalType, data: Data) -> Double? {
    do {
        let json = try JSONSerialization.jsonObject(with: data, options: [])
        if let priceData = json as? Dictionary<String, AnyObject>,
           let priceString = priceData[interval.priceKey] as? String {
            // Using the failable initializer to convert to a Double?
            return Double(priceString)
        }
    } catch {
        // died parsing the JSON
    }
    return nil
}

func fail(withMessage message: String, andCode code: Int32 = 0) -> Never  {
    print(message)
    exit(code)
}

let main = command(
    Option("interval", IntervalType.lastIntervalType.rawValue)
) { interval in
    guard let intervalType = IntervalType(rawValue: interval.lowercased()) else {
        fail(withMessage: "Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
    
    guard let priceData = retrievePriceData(intervalType),
          let price = parsePrice(intervalType, data: priceData) else {
        fail(withMessage: "There was an error retrieving current price data.")
    }
    
    print(String(format: "%0.2f", price))
}

main.run()
