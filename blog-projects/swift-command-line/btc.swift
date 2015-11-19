#!/usr/bin/swift -F Carthage/Build/Mac/

import Foundation
import OptionKit

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

func intervalFromArgs(args: Array<String>) -> String? {
    let intervalOpt = Option(trigger:.Mixed("i", "interval"), numberOfParameters: 1)
    let helpOpt = Option(trigger:.Mixed("h", "help"))
    let parser = OptionParser(definitions:[intervalOpt, helpOpt])
    
    func printHelp(parser: OptionParser) {
        print(parser.helpStringForCommandName("btc.swift"))
    }
    
    do {
        let (options, _) = try parser.parse(args)
    
        if options[helpOpt] != nil {
            printHelp(parser)
        } else {
            if let intervalOption = options[intervalOpt] {
                // Passing numberOfParameters to the interval option lets us
                // retrieve the interval parameter directly from the option.
                return intervalOption.joinWithSeparator(" ")
            } else {
                return IntervalType.LastIntervalType.rawValue
            }
        }
    } catch let OptionKitError.InvalidOption(description: description) {
        // Catches any invalid arguments and prints the invalid parameter.
        print(description)
    } catch {
        print("Unspecified error parsing arguments")
    }
    
    return nil
}

func bitstampURL(interval: IntervalType) -> NSURL {
    if (interval == .LastIntervalType || interval == .VWAPIntervalType) {
        return NSURL(string: "https://www.bitstamp.net/api/ticker/")!
    } else {
        return NSURL(string: "https://www.bitstamp.net/api/ticker_hour/")!
    }
}

func retrievePriceData(interval: IntervalType, completion: NSData? -> Void) -> Void {
    let
        url = bitstampURL(interval),
        request = NSURLRequest(URL: url),
        session = NSURLSession.sharedSession(),
        semaphore = dispatch_semaphore_create(0)

    let task = session.dataTaskWithRequest(request) {
         (data, response, error) -> Void in

        if error == nil {
            completion(data)
        } else {
            completion(nil)
        }
        dispatch_semaphore_signal(semaphore)
    }
    task.resume()

    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER)
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

if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        retrievePriceData(intervalType) {data in
            if let
                priceData = data,
                price = parsePrice(intervalType, data: priceData) {
                // Success!
                print(NSString(format: "%0.2f", price))
            } else {
                print("There was an error retrieving current price data.")
            }
        }
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}
