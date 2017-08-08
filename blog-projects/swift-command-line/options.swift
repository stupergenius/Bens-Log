#!/usr/bin/swift -F Carthage/Build/Mac/

// The above line is a modification of our previous "Hello World" script to tell
// Swift where to find our newly compiled OptionKit framework.

// Now that the compiler knows where to find the framework, we just import it as usual.
import OptionKit

// OptionKit lets us define long and short params, here we define two:
// one for help and one for say.
let sayOpt = Option(trigger: .mixed("s", "say"))
let helpOpt = Option(trigger: .mixed("h", "help"))
let parser = OptionParser(definitions:[sayOpt, helpOpt])
let actualArguments = Array(CommandLine.arguments[1..<CommandLine.arguments.count])

// Simple function to print the "help" message.
func printHelp(_ parser: OptionParser) {
    print(parser.helpStringForCommandName("options.swift"))
}

do {
    // The magic of OptionKit here parses the arguments into the options variable.
    // It also puts any additional un-parsed arguments into the rest variable.
    let (options, rest) = try parser.parse(actualArguments)

    // If the help option was specified, print the help message.
    if options[helpOpt] != nil {
        printHelp(parser)
    } else {
        // Otherwise, if the say option was specified, print the rest of the
        // arguments back out to the user.
        if options[sayOpt] != nil {
            let toSay = rest.joined(separator: " ")
            print(toSay)
        // And lastly if no arguments were given, print the help message.
        } else {
            printHelp(parser)
        }
    }
} catch let OptionKitError.invalidOption(description: description) {
    // Catches any invalid arguments and prints the invalid parameter.
    print(description)
}
