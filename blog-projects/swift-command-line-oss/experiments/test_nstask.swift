import Foundation

let task = NSTask()
task.launchPath = "/bin/ls"
task.arguments = ["-hal", "."]

let pipe = NSPipe()
task.standardOutput = pipe
task.launch()
task.waitUntilExit()

if (task.terminationStatus != 0) {
    print("died")
} else {
    print("worked")
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    print(NSString(data: data, encoding: NSUTF8StringEncoding)!)
}
