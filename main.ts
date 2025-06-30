input.onPinPressed(TouchPin.P0, function () {
    if (lock == 1) {
        lock = 0
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        radio.sendString(text)
        text = ""
        current_letter = ""
    }
})
input.onButtonPressed(Button.A, function () {
    if (lock == 0) {
        o += -1
        flashstorage.put("o", convertToText(o))
    } else {
        if (!(index < 1)) {
            index += -1
        } else {
            index = 26
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    if (lock == 1) {
        text = "" + text + current_letter
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    if (lock == 0) {
        o += 1
        flashstorage.put("o", convertToText(o))
    } else {
        if (!(index > 25)) {
            index += 1
        } else {
            index = 0
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    sublock = 1
    index = 0
    lock = 1
    while (lock == 1) {
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || input.logoIsPressed()) {
            if (alphabet[index] == " ") {
                basic.showString("_")
            } else {
                basic.showString("" + (alphabet[index]))
            }
            current_letter = alphabet[index]
        }
    }
})
let sublock = 0
let index = 0
let current_letter = ""
let text = ""
let lock = 0
let alphabet: string[] = []
let o = 0
o = parseFloat(flashstorage.getOrDefault("o", "0"))
alphabet = [
"a",
"b",
"c",
"d",
"e",
"f",
"g",
"h",
"i",
"j",
"k",
"l",
"m",
"n",
"o",
"p",
"q",
"r",
"s",
"t",
"u",
"v",
"w",
"x",
"y",
"z",
" "
]
lock = 0
text = ""
basic.forever(function () {
    if (lock == 0) {
        basic.showNumber(o)
        radio.setGroup(o)
    }
})
