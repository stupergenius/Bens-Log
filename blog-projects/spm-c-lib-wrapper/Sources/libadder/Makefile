CC=gcc
CFLAGS=-I.
DEPS = include/libadder.h
OBJ = libadder.o adder.o 

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

adder: $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS)

.PHONY: clean

clean:
	rm -f *.o adder