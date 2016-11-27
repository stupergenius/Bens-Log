import libadder

protocol Addable {
    func add(_ x: Int, _ y: Int) -> Int
}

public struct SimpleAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        return libadder.add(x, y)
    }
}

public struct StructAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        let op = add_operation(x: x, y: y, result: 0)
        let result = libadder.added(op)
        return result.result;
    }
}

public struct PointerAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        var op = add_operation(x: x, y: y, result: 0)
        libadder.adding(&op)
        return op.result;
    }
}
