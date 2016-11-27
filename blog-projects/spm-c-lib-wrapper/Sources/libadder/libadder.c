#import "include/libadder.h"

long add(long x, long y) {
	return x + y;
}

add_operation added(add_operation op) {
	add_operation result = {op.x, op.y, add(op.x, op.y)};
	return result;
}

void adding(add_operation *op) {
	op->result = add(op->x, op->y);
}
