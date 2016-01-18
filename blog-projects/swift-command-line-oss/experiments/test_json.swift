import Foundation

let jsonString = "{\"high\": \"434.00\", \"last\": \"433.00\", \"timestamp\": \"1452741801\", \"bid\": \"433.00\", \"vwap\": \"429.8\", \"volume\": \"7284.25412926\", \"low\": \"424.50\", \"ask\": \"433.05\", \"open\": 432.64}"

if let jsonData = jsonString.dataUsingEncoding(NSUTF8StringEncoding),
    parsed = try NSJSONSerialization.JSONObjectWithData(jsonData, options: []) as? Dictionary<String, Any> {

    print("last = \(parsed["last"]!)")
} else {
    print("parsing failed")
}
