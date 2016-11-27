import libadder

protocol Addable {
    func add(_ x: Int, _ y: Int) -> Int
}

struct SimpleAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        return libadder.add(x, y)
    }
}

struct StructAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        let op = add_operation(x: x, y: y, result: 0)
        let result = libadder.added(op)
        return result.result;
    }
}

struct PointerAdd: Addable {
    func add(_ x: Int, _ y: Int) -> Int {
        var op = add_operation(x: x, y: y, result: 0)
        libadder.adding(&op)
        return op.result;
    }
}
