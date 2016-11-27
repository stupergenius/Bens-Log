#include <stdio.h>
#import "include/libadder.h"

void simple_add() {
	long x = 3;
	long y = 5;
	long added = add(x, y);

	printf("Sum is %ld\n", added);
}

void simple_added() {
	add_operation op = {3, 5};
	add_operation result = added(op);

	printf("Sum is %ld\n", result.result);
}

void simple_adding() {
	add_operation op = {3, 5};
	adding(&op);

	printf("Sum is %ld\n", op.result);
}

int main(void) {
	simple_add();
	simple_added();
	simple_adding();
}
