input.onPinPressed(TouchPin.P0, function () {
    if (lock == 1) {
        lock = 0
        music.setVolume(38)
        music.play(music.stringPlayable("E F G - - - - - ", 500), music.PlaybackMode.InBackground)
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
    music.play(music.createSoundExpression(WaveShape.Triangle, 43, 1500, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    if (lock == 0) {
        o += -1
        flashstorage.put("o", convertToText(o))
    } else {
        if (!(index < 1)) {
            index += -1
        } else {
            index = 28
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    if (lock == 1) {
        text = "" + text + current_letter
    }
})
radio.onReceivedString(function (receivedString) {
    music.setVolume(38)
    music.play(music.stringPlayable("C C5 D B E - - - ", 1000), music.PlaybackMode.InBackground)
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    music.play(music.createSoundExpression(WaveShape.Triangle, 43, 1500, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    if (lock == 0) {
        o += 1
        flashstorage.put("o", convertToText(o))
    } else {
        if (!(index > 28)) {
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
        if (alphabet[index] == " ") {
            basic.showString("_")
        } else {
            basic.showString("" + (alphabet[index]))
        }
        current_letter = alphabet[index]
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
" ",
"!",
"?"
]
lock = 0
text = ""
basic.forever(function () {
    if (lock == 0) {
        basic.showNumber(o)
        radio.setGroup(o)
    }
    music.setBuiltInSpeakerEnabled(true)
})
