import XCTest
@testable import Clibadder

class ClibadderTests: XCTestCase {

    // Test Helpers

    func addPositive(_ adder: Addable) {
        let added = adder.add(5, 6)
        XCTAssertEqual(added, 11)
    }

    func notAdd(_ adder: Addable) {
        let added = adder.add(5, 6)
        XCTAssertNotEqual(added, 12)
    }

    func addNegative(_ adder: Addable) {
        let added = adder.add(5, -6)
        XCTAssertEqual(added, -1)
    }

    // Test Methods

    func testSimpleAdd() {
        let adder = SimpleAdd()
        addPositive(adder)
        notAdd(adder)
        addNegative(adder)
    }

    func testStructAdd() {
        let adder = StructAdd()
        addPositive(adder)
        notAdd(adder)
        addNegative(adder)
    }

    func testPointerAdd() {
        let adder = PointerAdd()
        addPositive(adder)
        notAdd(adder)
        addNegative(adder)
    }

    // XCTest Case Accumulation

    static var allTests : [(String, (ClibadderTests) -> () throws -> Void)] {
        return [
            ("testSimpleAdd", testSimpleAdd),
            ("testStructAdd", testStructAdd),
            ("testPointerAdd", testPointerAdd),
        ]
    }
}
