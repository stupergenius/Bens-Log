#!/usr/bin/swift -F Carthage/Build/Mac/

import Foundation
import OptionKit

// Handy enum to store the selected interval type.
enum IntervalType: String, CustomStringConvertible {
    case last = "last"
    case hourly = "hourly"
    case vwap = "vwap"

    var description: String {
        get {
            return self.rawValue
        }
    }
}

func intervalFrom(args: Array<String>) -> String? {
    let intervalOpt = Option(trigger: .mixed("i", "interval"), numberOfParameters: 1)
    let helpOpt = Option(trigger: .mixed("h", "help"))
    let parser = OptionParser(definitions:[intervalOpt, helpOpt])
    
    func printHelp(_ parser: OptionParser) {
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
                return intervalOption.joined(separator: " ")
            } else {
                return IntervalType.last.rawValue
            }
        }
    } catch let OptionKitError.invalidOption(description: description) {
        // Catches any invalid arguments and prints the invalid parameter.
        print(description)
    } catch {
        print("Unspecified error parsing arguments")
    }
    
    return nil
}

func bitstampURL(_ interval: IntervalType) -> URL {
    if (interval == .last || interval == .vwap) {
        return URL(string: "https://www.bitstamp.net/api/ticker/")!
    } else {
        return URL(string: "https://www.bitstamp.net/api/ticker_hour/")!
    }
}

func retrievePriceData(_ interval: IntervalType, completion: @escaping (Data?) -> Void) -> Void {
    let
        url = bitstampURL(interval),
        request = URLRequest(url: url),
        session = URLSession.shared,
        semaphore = DispatchSemaphore(value: 0)

    let task = session.dataTask(with: request) {
         (data, response, error) -> Void in

        if error == nil {
            completion(data)
        } else {
            completion(nil)
        }
        semaphore.signal()
    }
    task.resume()

    let _ = semaphore.wait(timeout: DispatchTime.distantFuture)
}

func priceKey(_ interval: IntervalType) -> String {
    if (interval == .last || interval == .hourly) {
        return "last"
    } else {
        return "vwap"
    }
}

func parsePrice(_ interval: IntervalType, data: Data) -> Double? {
    do {
        let json = try JSONSerialization.jsonObject(with: data, options: [])
        if let priceData = json as? Dictionary<String, AnyObject>,
           let priceString = priceData[priceKey(interval)] as? String {
            // Using the failable initializer to convert to a Double?
            return Double(priceString)
        }
    } catch {
        // died parsing the JSON
    }
    return nil
}

if let interval = intervalFrom(args: Array(CommandLine.arguments[1..<CommandLine.arguments.count])) {
    if let intervalType = IntervalType(rawValue: interval.lowercased()) {
        retrievePriceData(intervalType) {data in
            if let priceData = data,
               let price = parsePrice(intervalType, data: priceData) {
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
