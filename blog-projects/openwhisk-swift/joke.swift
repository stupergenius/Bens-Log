import Glibc

// Array sample from http://stackoverflow.com/a/24101606
extension Array {
    func sample() -> Element {
        let randomIndex = Int(rand()) % count
        return self[randomIndex]
    }
}

struct Joke {
  let content: String
  static let builtinJokes = [
    "Wanted: Swift developer with 5 years experience.",
    "Something... Taylor Swift? That's funny right?",
    "Swift: still not Lisp.",
    "Current OpenWhisk performance...",
  ]

  init(_ content: String) {
    self.content = content
  }

  static func tell() -> Joke {
    let joke = Joke(Joke.builtinJokes.sample())
    return joke
  }
}

// The main function is called when invoking the action.
func main(args: [String:Any]) -> [String:Any] {
  let time = UInt32(NSDate().timeIntervalSinceReferenceDate)
  srand(time)
  
  let joke = Joke.tell()
  return [
    "response_type": "in_channel",
    "text": joke.content
  ]
}
