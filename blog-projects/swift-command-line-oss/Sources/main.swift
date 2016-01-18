#if os(Linux)
import Glibc
#else
import Darwin
#endif
import Commander
import Foundation

// Handy enum to store the selected interval type.
enum IntervalType: String, CustomStringConvertible {
    case LastIntervalType = "last"
    case HourlyIntervalType = "hourly"
    case VWAPIntervalType = "vwap"

    var description: String {
        get {
            return self.rawValue
        }
    }
}

func bitstampURL(interval: IntervalType) -> String {
    if (interval == .LastIntervalType || interval == .VWAPIntervalType) {
        return "https://www.bitstamp.net/api/ticker/"
    } else {
        return "https://www.bitstamp.net/api/ticker_hour/"
    }
}

func retrievePriceData(interval: IntervalType) -> NSData? {
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

    let url = bitstampURL(interval),
        data = NSData(contentsOfURL: NSURL(string: url)!)

    return data

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

func priceKey(interval: IntervalType) -> String {
    if (interval == .LastIntervalType || interval == .HourlyIntervalType) {
        return "last"
    } else {
        return "vwap"
    }
}

func parsePrice(interval: IntervalType, data: NSData) -> Double? {
    do {
        let json = try NSJSONSerialization.JSONObjectWithData(data, options: [])
        if let
            priceData = json as? Dictionary<String, AnyObject>,
            priceString = priceData[priceKey(interval)] as? String {
            // Using the failable initializer to convert to a Double?
            return Double(priceString)
        }
    } catch {
        // died parsing the JSON
    }
    return nil
}

let main = command(
    Option("interval", IntervalType.LastIntervalType.rawValue)
) { interval in
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        if let
            priceData = retrievePriceData(intervalType),
            price = parsePrice(intervalType, data: priceData) {

            // Success!
            print(NSString(format: "%0.2f", price))
        } else {
            print("There was an error retrieving current price data.")
        }
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}

main.run()