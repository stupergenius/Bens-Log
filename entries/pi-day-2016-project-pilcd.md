Title: Pi Day 2016 Project - PiLCD
Date: 2016-03-13 20:58
Author: Ben Snider
Category: arduino, hardware, technology
Tags: arduino, hardware, technology

Every year [Pi Day](http://www.piday.org) rolls around and I always have the intention of creating some interesting Arduino (really hoping that gets easier to spell) project but I get sidetracked for whatever reason. The last time I actually succeeded in this was in 2012! I decided to use that project - [the PiSeg Arduino project](http://www.bensnider.com/piseg-arduino-project.html) - as a basis for this year. I figured I would be more successful adopting a previous project than starting a whole new one.

Well... it worked! This year, I present you with the PiLCD Arduino project:

<a href="http://imgur.com/2gC889M"><img src="http://i.imgur.com/2gC889M.gif" title="source: imgur.com" /></a>

## Rounding Is For Squares

See the [PiLCD GitHub project](https://github.com/stupergenius/Arduino-Sandbox/tree/master/PiLCD) for the all the juicy source code and Fritzing design. Overall, it's a *very* simple circuit driving a [16x2 LCD display](https://www.sparkfun.com/products/9052) that displays Pi out to 14 digits and then continuously scrolls through about 8,000 more digits of Pi. The Arduino isn't actually calculating Pi, but rather reading from a [stored list of digits](http://www.geom.uiuc.edu/~huberty/math5337/groupe/digits.html).

<img src="http://media.bensnider.com/images/PiLCD_bb.jpg" width="320" height="457" alt="Fritzing Diagram" />

## Rolling It All Together

The sketch itself is also fairly simple. One interesting bit is that I create a custom character for Pi and print that to the LCD display. Using the [LiquidCrystal](https://www.arduino.cc/en/Reference/LiquidCrystal) Arduino library makes this an easy proposition: just define a `byte` array where the lit and unlit segments of the LCD are defined by the value the array:

```cpp
// You can sort of see the pattern that will be displayed.
byte pi[8] = {
  B00000,
  B00000,
  B11111,
  B01010,
  B01010,
  B01010,
  B10011,
  B00000,
};
```


Another interesting bit is the sketch's use of [program space](https://www.arduino.cc/en/Reference/PROGMEM) to store the digits of Pi. Program space can be used (instead of RAM) to store larger amounts of data that might be more than the Arduino can store in RAM. To store data into program space, the variable simply needs to be declared `const` and marked with the special `PROGMEM` modifier. It's simpler than it sounds:

```cpp
const PROGMEM int DigitsOfPi[8811] = {1, 4, 1, 5, 9, 2, ...};
```

Data is copied from program space into dynamic memory at runtime using the `pgm_read_word_near` or `pgm_read_byte_near` functions, depending on the type of data that's stored in program space. The functions accept an offset into the program space variable. I use it as such, to retrieve the next digit of Pi:

```cpp
int displayValue = pgm_read_word_near(DigitsOfPi + piDigitOffset);
```

And that's basically all the tricky bits.

I wish all of you a happy Pi Day! Do a project of your own if you can, otherwise eat plenty of Pi or pie shaped foods!
