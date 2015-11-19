#!/usr/bin/swift -F Carthage/Build/Mac/

import OptionKit

// Handy enum to store the selected interval type.
enum IntervalType: String {
    LastIntervalType = "last",
    HourlyIntervalType = "hourly",
    VWAPIntervalType = "vwap",
}

func intervalFromArgs(args args: Array[String]) -> String? {
    let intervalOpt = Option(trigger:.Mixed("i", "interval"), numberOfParameters: 1)
    let helpOpt = Option(trigger:.Mixed("h", "help"))
    let parser = OptionParser(definitions:[intervalOpt, helpOpt])
    
    func printHelp(parser: OptionParser) {
        print(parser.helpStringForCommandName("btc.swift"))
    }
    
    do {
        let (options, rest) = try parser.parse(actualArguments)
    
        if options[helpOpt] != nil {
            printHelp(parser)
        } else {
            if options[intervalOpt] != nil {
                return rest.joinWithSeparator(" ")
            } else {
                return "last"
            }
        }
    } catch let OptionKitError.InvalidOption(description: description) {
        // Catches any invalid arguments and prints the invalid parameter.
        print(description)
    }
    
    return nil
}

func retrievePriceData(interval: IntervalType) -> NSData? {
    
}

if let interval = intervalFromArgs(Array(Process.arguments[1..<Process.arguments.count])) {
    if let intervalType = IntervalType(rawValue: interval.lowercaseString) {
        if let
            priceData = retrievePriceData(interval: intervalType),
            price = parsePrice(data: priceData) {
            // Success!
            print(NSString(format: "0.2f", price))
        } else {
            print("There was an error retrieving current price data.")
        }
    } else {
        print("Please provide one of the following interval types using the --interval option: last, hourly, vwap.")
    }
}
