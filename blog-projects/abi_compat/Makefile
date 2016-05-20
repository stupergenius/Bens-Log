# A more complicated build file that is starting to look a lot like how
# Xcode internally structures its builds. The goal here is to show how
# one might actually go about building a full Xcode-capable build system
# without all of the requirements of Xcode, xcodebuild, and xcproj files.
#
# There will likely be limitations to this process, but lets see how far
# the wind takes us.

# Modified from the original at http://owensd.io/blog/swift-makefiles---take-2/

## USER CONFIGURABLE SETTINGS ##
MODULE_NAME  = main

## GLOBAL SETTINGS ##
ROOT_DIR            = $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
BUILD_DIR           = $(ROOT_DIR)/bin
SRC_DIR             = $(ROOT_DIR)/src

SWIFT    	        = swift -frontend -c -color-diagnostics
SWIFT_OLD           = ~/swift/versions/swift-2.2-SNAPSHOT-2015-12-01-b-ubuntu14.04/usr/bin/swift -frontend -c -color-diagnostics
SWIFTC				= swiftc

SOURCE = $(notdir $(wildcard $(SRC_DIR)/*.swift))

## BUILD TARGETS ##
tool: clean setup $(SOURCE) link

## COMPILE RULES FOR FILES ##

%.swift:
	$(SWIFT_OLD) -primary-file $(SRC_DIR)/$@ \
		$(addprefix $(SRC_DIR)/,$(filter-out $@,$(SOURCE))) \
		-module-name $(MODULE_NAME) -o $(BUILD_DIR)/$*.o -emit-module \
		-emit-module-path $(BUILD_DIR)/$*~partial.swiftmodule

main.swift:
	$(SWIFT) -primary-file $(SRC_DIR)/main.swift \
		$(addprefix $(SRC_DIR)/,$(filter-out $@,$(SOURCE))) \
		-module-name $(MODULE_NAME) -o $(BUILD_DIR)/main.o -emit-module \
		-emit-module-path $(BUILD_DIR)/main~partial.swiftmodule

link:
	$(SWIFTC) $(wildcard $(BUILD_DIR)/*.o) \
		-o $(BUILD_DIR)/$(MODULE_NAME)

clean:
	$(shell rm -r $(BUILD_DIR))

setup:
	$(shell mkdir -p $(BUILD_DIR))
