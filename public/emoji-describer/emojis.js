function getMatchingEmojis(query) {
	var codes = [];
	var remaining = config.emojiSearchLimit;
	for (var code of Object.keys(emojis)) {
		if (matchesTags(query, emojis[code].tags)) {
			codes.push(code);
			remaining--;
			// console.log('%c ', `font-size:100px; background:url(https://openmoji.org/data/color/svg/${code}.svg) no-repeat; background-size: contain;`);
		}
		if (remaining == 0) { //if 20 have been got
			return codes;
		}
	};
	return codes; //if less than 20 were found
}

function getRandomEmojis() {
	//gets 20 random emojis to display when nothing is entered
	var codes = [];
	var keys = Object.keys(emojis);
	for (var x = 0; x < config.emojiSearchLimit; x++) {
		codes.push(keys[keys.length * Math.random() << 0]);
	};
	return codes; //if less than 20 were found
}

function matchesTags(string, taglist) {
	//want to match the beginning of any word of a tag, but not just 'include'
	//i.e. 'car' should return true for the tag 'red car' but not for 'flag of nicaragua'
	let re = new RegExp(`\\b${string}`, "gi");
	for (let tag of taglist) {
		if (re.test(tag)) {
			return true;
		}
	}
	return false;
}

// var unicode_emojis = "😀😃😄😁😆😅😂😇😉😍😘😗😙😋😛😝😜😎😏😒😞😔😟😕☹️😣😖😫😩😢😭😤😠😡😳😱😨😰😥😓😶😐😑😬😯😦😧😮😲😴😪😵😷😈👿👹👺💩👻💀☠️👽👾🎃😺😸😹😻😼😽🙀😿😾👐🙌👏👍👎👊✊✌️👌👈👉👆👇☝️✋👋💪✍️🙏💍💄💋👄👅👂👃👣👀👤👥👶👧👦👩👨👱‍♀️👱‍♂️👵👴👲👳‍♀️👳‍♂️👮‍♀️👮‍♂️👷‍♀️👷‍♂️💂‍♀️💂‍♂️👩‍⚕️👨‍⚕️👩‍🌾👨‍🌾👩‍🍳👨‍🍳👩‍🎓👨‍🎓👩‍🎤👨‍🎤👩‍🏫👨‍🏫👩‍🏭👨‍🏭👩‍💻👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬👨‍🔬👩‍🎨👨‍🎨👩‍🚒👨‍🚒👩‍✈️👨‍✈️👩‍🚀👨‍🚀👩‍⚖️👨‍⚖️👰👸🎅👼🙇‍♀️🙇‍♂️💁‍♀️💁‍♂️🙅‍♀️🙅‍♂️🙆‍♀️🙆‍♂️🙋‍♀️🙋‍♂️🙎‍♀️🙎‍♂️🙍‍♀️🙍‍♂️💇‍♀️💇‍♂️💆‍♀️💆‍♂️💅💃👯‍♀️👯‍♂️🚶‍♀️🚶‍♂️🏃‍♀️🏃‍♂️👫👭👬💑👩‍❤️‍👩👨‍❤️‍👨💏👩‍❤️‍💋‍👩👨‍❤️‍💋‍👨👪👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👦👩‍👧👩‍👧‍👦👩‍👦‍👦👩‍👧‍👧👨‍👦👨‍👧👨‍👧‍👦👨‍👦‍👦👨‍👧‍👧👚👕👖👔👗👙👘👠👡👢👞👟🎩👒🎓⛑👑👝👛👜💼🎒👓🌂🐶🐱🐭🐹🐰🐻🐼🐨🐯🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🐺🐗🐴🐝🐛🐌🐚🐞🐜🐢🐍🐙🐡🐠🐟🐬🐳🐋🐊🐅🐆🐘🐪🐫🐃🐂🐄🐎🐖🐏🐑🐐🐕🐩🐈🐓🐇🐁🐀🐾🐉🐲🌵🎄🌲🌳🌴🌱🌿☘️🍀🎍🎋🍃🍂🍁🍄🌾💐🌷🌹🌺🌸🌼🌻🌞🌝🌛🌜🌚🌕🌖🌗🌘🌑🌒🌓🌔🌙🌎🌍🌏💫⭐️🌟✨⚡️☄️💥🔥🌈☀️⛅️☁️⛈❄️☃️⛄️💨💧💦☔️☂️🌊🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🍅🍆🌽🍠🍞🍳🍗🍖🍔🍟🍕🍝🍜🍲🍛🍣🍱🍤🍙🍚🍘🍥🍢🍡🍧🍨🍦🍰🎂🍮🍭🍬🍫🍩🍪🌰🍯🍼☕️🍵🍶🍺🍻🍷🍸🍹🍴⚽️🏀🏈⚾️🎾🏉🎱⛳️🎣🎽⛸⛷🏂🏇🏄‍♀️🏄‍♂️🏊‍♀️🏊‍♂️🚣‍♀️🚣‍♂️🚵‍♀️🚵‍♂️🚴‍♀️🚴‍♂️🏆🎫🎪🎭🎨🎬🎤🎧🎼🎹🎷🎺🎸🎻🎲🎯🎳🎮🎰🚗🚕🚙🚌🚎🚓🚑🚒🚐🚚🚛🚜🚲🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉✈️💺🚀🚁⛵️🚤⛴🚢⚓️⛽️🚧🚦🚥🚏🗿🗽🗼🏰🏯🎡🎢🎠⛲️⛱🌋⛰🗻⛺️🏠🏡🏭🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒⛪️⛩🗾🎑🌅🌄🌠🎇🎆🌇🌆🌃🌌🌉🌁⌚️📱📲💻⌨️💽💾💿📀📼📷📹📞☎️📟📠📺📻⏱⏲⏰⌛️⏳📡🔋🔌💡🔦💸💵💴💶💷💰💳💎⚖️🔧🔨⚒⛏🔩⚙️⛓🔫💣🔪⚔️🚬⚰️⚱️🔮💈⚗️🔭🔬💊💉🚽🚰🚿🛁🔑🚪🎁🎈🎏🎀🎊🎉🎎🏮🎐✉️📩📨📧💌📥📤📦📪📫📬📭📮📯📜📃📄📑📊📈📉📆📅📇📋📁📂📰📓📔📒📕📗📘📙📚📖🔖🔗📎📐📏📌📍✂️📝✏️🔍🔎🔏🔐🔒🔓❤️💛💚💙💜💔💕💞💓💗💖💘💝💟🔯⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔🉑📴📳🈶🈚️🈸🈺🈷️✴️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘❌⭕️⛔️📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗️❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯️💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿️🅿️🈳🈂️🛂🛃🛄🛅🚹🚺🚼🚻🚮🎦📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟🔢#️⃣*️⃣⏏️▶️⏩⏪⏫⏬◀️🔼🔽➡️⬅️⬆️⬇️↗️↘️↙️↖️↕️↔️↪️↩️⤴️⤵️🔀🔁🔂🔄🔃🎵🎶➕➖➗✖️💲💱™️©️®️〰️➰➿🔚🔙🔛🔝🔜✔️☑️🔘⚪️⚫️🔴🔵🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️⬛️⬜️🔈🔇🔉🔊🔔🔕📣💬💭♠️♣️♥️♦️🃏🎴🀄️🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🏁🚩🎌"

const emojis = {
    "2049": {
        "name": "exclamation question mark",
        "tags": [
            "exclamation question mark"
        ]
    },
    "2117": {
        "name": "sound recording copyright",
        "tags": [
            "sound recording copyright"
        ]
    },
    "2120": {
        "name": "service mark",
        "tags": [
            "service mark"
        ]
    },
    "2122": {
        "name": "trade mark",
        "tags": [
            "trade mark"
        ]
    },
    "2139": {
        "name": "information",
        "tags": [
            "information"
        ]
    },
    "2194": {
        "name": "left-right arrow",
        "tags": [
            "left-right arrow"
        ]
    },
    "2195": {
        "name": "up-down arrow",
        "tags": [
            "up-down arrow"
        ]
    },
    "2196": {
        "name": "up-left arrow",
        "tags": [
            "up-left arrow"
        ]
    },
    "2197": {
        "name": "up-right arrow",
        "tags": [
            "up-right arrow"
        ]
    },
    "2198": {
        "name": "down-right arrow",
        "tags": [
            "down-right arrow"
        ]
    },
    "2199": {
        "name": "down-left arrow",
        "tags": [
            "down-left arrow"
        ]
    },
    "2328": {
        "name": "keyboard",
        "tags": [
            "keyboard"
        ]
    },
    "2600": {
        "name": "sun",
        "tags": [
            "sun"
        ]
    },
    "2601": {
        "name": "cloud",
        "tags": [
            "cloud"
        ]
    },
    "2602": {
        "name": "umbrella",
        "tags": [
            "umbrella"
        ]
    },
    "2603": {
        "name": "snowman",
        "tags": [
            "snowman"
        ]
    },
    "2604": {
        "name": "comet",
        "tags": [
            "comet"
        ]
    },
    "2605": {
        "name": "black star",
        "tags": [
            "black star"
        ]
    },
    "2611": {
        "name": "check box with check",
        "tags": [
            "check box with check"
        ]
    },
    "2614": {
        "name": "umbrella with rain drops",
        "tags": [
            "umbrella with rain drops"
        ]
    },
    "2615": {
        "name": "hot beverage",
        "tags": [
            "hot beverage"
        ]
    },
    "2618": {
        "name": "shamrock",
        "tags": [
            "shamrock"
        ]
    },
    "2620": {
        "name": "skull and crossbones",
        "tags": [
            "skull and crossbones"
        ]
    },
    "2622": {
        "name": "radioactive",
        "tags": [
            "radioactive"
        ]
    },
    "2623": {
        "name": "biohazard",
        "tags": [
            "biohazard"
        ]
    },
    "2626": {
        "name": "orthodox cross",
        "tags": [
            "orthodox cross"
        ]
    },
    "2638": {
        "name": "wheel of dharma",
        "tags": [
            "wheel of dharma"
        ]
    },
    "2639": {
        "name": "frowning face",
        "tags": [
            "frowning face"
        ]
    },
    "2640": {
        "name": "female sign",
        "tags": [
            "female sign"
        ]
    },
    "2642": {
        "name": "male sign",
        "tags": [
            "male sign"
        ]
    },
    "2648": {
        "name": "Aries",
        "tags": [
            "Aries"
        ]
    },
    "2649": {
        "name": "Taurus",
        "tags": [
            "Taurus"
        ]
    },
    "2650": {
        "name": "Sagittarius",
        "tags": [
            "Sagittarius"
        ]
    },
    "2651": {
        "name": "Capricorn",
        "tags": [
            "Capricorn"
        ]
    },
    "2652": {
        "name": "Aquarius",
        "tags": [
            "Aquarius"
        ]
    },
    "2653": {
        "name": "Pisces",
        "tags": [
            "Pisces"
        ]
    },
    "2660": {
        "name": "spade suit",
        "tags": [
            "spade suit"
        ]
    },
    "2663": {
        "name": "club suit",
        "tags": [
            "club suit"
        ]
    },
    "2665": {
        "name": "heart suit",
        "tags": [
            "heart suit"
        ]
    },
    "2666": {
        "name": "diamond suit",
        "tags": [
            "diamond suit"
        ]
    },
    "2668": {
        "name": "hot springs",
        "tags": [
            "hot springs"
        ]
    },
    "2692": {
        "name": "hammer and pick",
        "tags": [
            "hammer and pick"
        ]
    },
    "2693": {
        "name": "anchor",
        "tags": [
            "anchor"
        ]
    },
    "2694": {
        "name": "crossed swords",
        "tags": [
            "crossed swords"
        ]
    },
    "2695": {
        "name": "medical symbol",
        "tags": [
            "medical symbol"
        ]
    },
    "2696": {
        "name": "balance scale",
        "tags": [
            "balance scale"
        ]
    },
    "2697": {
        "name": "alembic",
        "tags": [
            "alembic"
        ]
    },
    "2699": {
        "name": "gear",
        "tags": [
            "gear"
        ]
    },
    "2702": {
        "name": "scissors",
        "tags": [
            "scissors"
        ]
    },
    "2705": {
        "name": "check mark button",
        "tags": [
            "check mark button"
        ]
    },
    "2708": {
        "name": "airplane",
        "tags": [
            "airplane"
        ]
    },
    "2709": {
        "name": "envelope",
        "tags": [
            "envelope"
        ]
    },
    "2712": {
        "name": "black nib",
        "tags": [
            "black nib"
        ]
    },
    "2714": {
        "name": "check mark",
        "tags": [
            "check mark"
        ]
    },
    "2716": {
        "name": "multiply",
        "tags": [
            "multiply"
        ]
    },
    "2721": {
        "name": "star of David",
        "tags": [
            "star of David"
        ]
    },
    "2728": {
        "name": "sparkles",
        "tags": [
            "sparkles"
        ]
    },
    "2733": {
        "name": "eight-spoked asterisk",
        "tags": [
            "eight-spoked asterisk"
        ]
    },
    "2734": {
        "name": "eight-pointed star",
        "tags": [
            "eight-pointed star"
        ]
    },
    "2744": {
        "name": "snowflake",
        "tags": [
            "snowflake"
        ]
    },
    "2747": {
        "name": "sparkle",
        "tags": [
            "sparkle"
        ]
    },
    "2753": {
        "name": "red question mark",
        "tags": [
            "red question mark"
        ]
    },
    "2754": {
        "name": "white question mark",
        "tags": [
            "white question mark"
        ]
    },
    "2755": {
        "name": "white exclamation mark",
        "tags": [
            "white exclamation mark"
        ]
    },
    "2757": {
        "name": "red exclamation mark",
        "tags": [
            "red exclamation mark"
        ]
    },
    "2763": {
        "name": "heart exclamation",
        "tags": [
            "heart exclamation"
        ]
    },
    "2764": {
        "name": "red heart",
        "tags": [
            "red heart"
        ]
    },
    "2795": {
        "name": "plus",
        "tags": [
            "plus"
        ]
    },
    "2796": {
        "name": "minus",
        "tags": [
            "minus"
        ]
    },
    "2797": {
        "name": "divide",
        "tags": [
            "divide"
        ]
    },
    "2934": {
        "name": "right arrow curving up",
        "tags": [
            "right arrow curving up"
        ]
    },
    "2935": {
        "name": "right arrow curving down",
        "tags": [
            "right arrow curving down"
        ]
    },
    "3030": {
        "name": "wavy dash",
        "tags": [
            "wavy dash"
        ]
    },
    "3297": {
        "name": "Japanese “congratulations” button",
        "tags": [
            "Japanese “congratulations” button"
        ]
    },
    "3299": {
        "name": "Japanese “secret” button",
        "tags": [
            "Japanese “secret” button"
        ]
    },
    "1F600": {
        "name": "grinning face",
        "tags": [
            "grinning face"
        ]
    },
    "1F603": {
        "name": "grinning face with big eyes",
        "tags": [
            "grinning face with big eyes"
        ]
    },
    "1F604": {
        "name": "grinning face with smiling eyes",
        "tags": [
            "grinning face with smiling eyes"
        ]
    },
    "1F601": {
        "name": "beaming face with smiling eyes",
        "tags": [
            "beaming face with smiling eyes"
        ]
    },
    "1F606": {
        "name": "grinning squinting face",
        "tags": [
            "grinning squinting face"
        ]
    },
    "1F605": {
        "name": "grinning face with sweat",
        "tags": [
            "grinning face with sweat"
        ]
    },
    "1F923": {
        "name": "rolling on the floor laughing",
        "tags": [
            "rolling on the floor laughing"
        ]
    },
    "1F602": {
        "name": "face with tears of joy",
        "tags": [
            "face with tears of joy"
        ]
    },
    "1F642": {
        "name": "slightly smiling face",
        "tags": [
            "slightly smiling face"
        ]
    },
    "1F643": {
        "name": "upside-down face",
        "tags": [
            "upside-down face"
        ]
    },
    "1F609": {
        "name": "winking face",
        "tags": [
            "winking face"
        ]
    },
    "1F60A": {
        "name": "smiling face with smiling eyes",
        "tags": [
            "smiling face with smiling eyes"
        ]
    },
    "1F607": {
        "name": "smiling face with halo",
        "tags": [
            "smiling face with halo"
        ]
    },
    "1F970": {
        "name": "smiling face with hearts",
        "tags": [
            "smiling face with hearts"
        ]
    },
    "1F60D": {
        "name": "smiling face with heart-eyes",
        "tags": [
            "smiling face with heart-eyes"
        ]
    },
    "1F929": {
        "name": "star-struck",
        "tags": [
            "star-struck"
        ]
    },
    "1F618": {
        "name": "face blowing a kiss",
        "tags": [
            "face blowing a kiss"
        ]
    },
    "1F617": {
        "name": "kissing face",
        "tags": [
            "kissing face"
        ]
    },
    "263A": {
        "name": "smiling face",
        "tags": [
            "smiling face"
        ]
    },
    "1F61A": {
        "name": "kissing face with closed eyes",
        "tags": [
            "kissing face with closed eyes"
        ]
    },
    "1F619": {
        "name": "kissing face with smiling eyes",
        "tags": [
            "kissing face with smiling eyes"
        ]
    },
    "1F972": {
        "name": "smiling face with tear",
        "tags": [
            "smiling face with tear"
        ]
    },
    "1F60B": {
        "name": "face savoring food",
        "tags": [
            "face savoring food"
        ]
    },
    "1F61B": {
        "name": "face with tongue",
        "tags": [
            "face with tongue"
        ]
    },
    "1F61C": {
        "name": "winking face with tongue",
        "tags": [
            "winking face with tongue"
        ]
    },
    "1F92A": {
        "name": "zany face",
        "tags": [
            "zany face"
        ]
    },
    "1F61D": {
        "name": "squinting face with tongue",
        "tags": [
            "squinting face with tongue"
        ]
    },
    "1F911": {
        "name": "money-mouth face",
        "tags": [
            "money-mouth face"
        ]
    },
    "1F917": {
        "name": "hugging face",
        "tags": [
            "hugging face"
        ]
    },
    "1F92D": {
        "name": "face with hand over mouth",
        "tags": [
            "face with hand over mouth"
        ]
    },
    "1F92B": {
        "name": "shushing face",
        "tags": [
            "shushing face"
        ]
    },
    "1F914": {
        "name": "thinking face",
        "tags": [
            "thinking face"
        ]
    },
    "1F910": {
        "name": "zipper-mouth face",
        "tags": [
            "zipper-mouth face"
        ]
    },
    "1F928": {
        "name": "face with raised eyebrow",
        "tags": [
            "face with raised eyebrow"
        ]
    },
    "1F610": {
        "name": "neutral face",
        "tags": [
            "neutral face"
        ]
    },
    "1F611": {
        "name": "expressionless face",
        "tags": [
            "expressionless face"
        ]
    },
    "1F636": {
        "name": "face without mouth",
        "tags": [
            "face without mouth"
        ]
    },
    "1F636-200D-1F32B-FE0F": {
        "name": "face in clouds",
        "tags": [
            "face in clouds"
        ]
    },
    "1F60F": {
        "name": "smirking face",
        "tags": [
            "smirking face"
        ]
    },
    "1F612": {
        "name": "unamused face",
        "tags": [
            "unamused face"
        ]
    },
    "1F644": {
        "name": "face with rolling eyes",
        "tags": [
            "face with rolling eyes"
        ]
    },
    "1F62C": {
        "name": "grimacing face",
        "tags": [
            "grimacing face"
        ]
    },
    "1F62E-200D-1F4A8": {
        "name": "face exhaling",
        "tags": [
            "face exhaling"
        ]
    },
    "1F925": {
        "name": "lying face",
        "tags": [
            "lying face"
        ]
    },
    "1F60C": {
        "name": "relieved face",
        "tags": [
            "relieved face"
        ]
    },
    "1F614": {
        "name": "pensive face",
        "tags": [
            "pensive face"
        ]
    },
    "1F62A": {
        "name": "sleepy face",
        "tags": [
            "sleepy face"
        ]
    },
    "1F924": {
        "name": "drooling face",
        "tags": [
            "drooling face"
        ]
    },
    "1F634": {
        "name": "sleeping face",
        "tags": [
            "sleeping face"
        ]
    },
    "1F637": {
        "name": "face with medical mask",
        "tags": [
            "face with medical mask"
        ]
    },
    "1F912": {
        "name": "face with thermometer",
        "tags": [
            "face with thermometer"
        ]
    },
    "1F915": {
        "name": "face with head-bandage",
        "tags": [
            "face with head-bandage"
        ]
    },
    "1F922": {
        "name": "nauseated face",
        "tags": [
            "nauseated face"
        ]
    },
    "1F92E": {
        "name": "face vomiting",
        "tags": [
            "face vomiting"
        ]
    },
    "1F927": {
        "name": "sneezing face",
        "tags": [
            "sneezing face"
        ]
    },
    "1F975": {
        "name": "hot face",
        "tags": [
            "hot face"
        ]
    },
    "1F976": {
        "name": "cold face",
        "tags": [
            "cold face"
        ]
    },
    "1F974": {
        "name": "woozy face",
        "tags": [
            "woozy face"
        ]
    },
    "1F635": {
        "name": "knocked-out face",
        "tags": [
            "knocked-out face"
        ]
    },
    "1F635-200D-1F4AB": {
        "name": "face with spiral eyes",
        "tags": [
            "face with spiral eyes"
        ]
    },
    "1F92F": {
        "name": "exploding head",
        "tags": [
            "exploding head"
        ]
    },
    "1F920": {
        "name": "cowboy hat face",
        "tags": [
            "cowboy hat face"
        ]
    },
    "1F973": {
        "name": "partying face",
        "tags": [
            "partying face"
        ]
    },
    "1F978": {
        "name": "disguised face",
        "tags": [
            "disguised face"
        ]
    },
    "1F60E": {
        "name": "smiling face with sunglasses",
        "tags": [
            "smiling face with sunglasses"
        ]
    },
    "1F913": {
        "name": "nerd face",
        "tags": [
            "nerd face"
        ]
    },
    "1F9D0": {
        "name": "face with monocle",
        "tags": [
            "face with monocle"
        ]
    },
    "1F615": {
        "name": "confused face",
        "tags": [
            "confused face"
        ]
    },
    "1F61F": {
        "name": "worried face",
        "tags": [
            "worried face"
        ]
    },
    "1F641": {
        "name": "slightly frowning face",
        "tags": [
            "slightly frowning face"
        ]
    },
    "1F62E": {
        "name": "face with open mouth",
        "tags": [
            "face with open mouth"
        ]
    },
    "1F62F": {
        "name": "hushed face",
        "tags": [
            "hushed face"
        ]
    },
    "1F632": {
        "name": "astonished face",
        "tags": [
            "astonished face"
        ]
    },
    "1F633": {
        "name": "flushed face",
        "tags": [
            "flushed face"
        ]
    },
    "1F97A": {
        "name": "pleading face",
        "tags": [
            "pleading face"
        ]
    },
    "1F626": {
        "name": "frowning face with open mouth",
        "tags": [
            "frowning face with open mouth"
        ]
    },
    "1F627": {
        "name": "anguished face",
        "tags": [
            "anguished face"
        ]
    },
    "1F628": {
        "name": "fearful face",
        "tags": [
            "fearful face"
        ]
    },
    "1F630": {
        "name": "anxious face with sweat",
        "tags": [
            "anxious face with sweat"
        ]
    },
    "1F625": {
        "name": "sad but relieved face",
        "tags": [
            "sad but relieved face"
        ]
    },
    "1F622": {
        "name": "crying face",
        "tags": [
            "crying face"
        ]
    },
    "1F62D": {
        "name": "loudly crying face",
        "tags": [
            "loudly crying face"
        ]
    },
    "1F631": {
        "name": "face screaming in fear",
        "tags": [
            "face screaming in fear"
        ]
    },
    "1F616": {
        "name": "confounded face",
        "tags": [
            "confounded face"
        ]
    },
    "1F623": {
        "name": "persevering face",
        "tags": [
            "persevering face"
        ]
    },
    "1F61E": {
        "name": "disappointed face",
        "tags": [
            "disappointed face"
        ]
    },
    "1F613": {
        "name": "downcast face with sweat",
        "tags": [
            "downcast face with sweat"
        ]
    },
    "1F629": {
        "name": "weary face",
        "tags": [
            "weary face"
        ]
    },
    "1F62B": {
        "name": "tired face",
        "tags": [
            "tired face"
        ]
    },
    "1F971": {
        "name": "yawning face",
        "tags": [
            "yawning face"
        ]
    },
    "1F624": {
        "name": "face with steam from nose",
        "tags": [
            "face with steam from nose"
        ]
    },
    "1F621": {
        "name": "pouting face",
        "tags": [
            "pouting face"
        ]
    },
    "1F620": {
        "name": "angry face",
        "tags": [
            "angry face"
        ]
    },
    "1F92C": {
        "name": "face with symbols on mouth",
        "tags": [
            "face with symbols on mouth"
        ]
    },
    "1F608": {
        "name": "smiling face with horns",
        "tags": [
            "smiling face with horns"
        ]
    },
    "1F47F": {
        "name": "angry face with horns",
        "tags": [
            "angry face with horns"
        ]
    },
    "1F480": {
        "name": "skull",
        "tags": [
            "skull"
        ]
    },
    "1F4A9": {
        "name": "pile of poo",
        "tags": [
            "pile of poo"
        ]
    },
    "1F921": {
        "name": "clown face",
        "tags": [
            "clown face"
        ]
    },
    "1F479": {
        "name": "ogre",
        "tags": [
            "ogre"
        ]
    },
    "1F47A": {
        "name": "goblin",
        "tags": [
            "goblin"
        ]
    },
    "1F47B": {
        "name": "ghost",
        "tags": [
            "ghost"
        ]
    },
    "1F47D": {
        "name": "alien",
        "tags": [
            "alien"
        ]
    },
    "1F47E": {
        "name": "alien monster",
        "tags": [
            "alien monster"
        ]
    },
    "1F916": {
        "name": "robot",
        "tags": [
            "robot"
        ]
    },
    "1F63A": {
        "name": "grinning cat",
        "tags": [
            "grinning cat"
        ]
    },
    "1F638": {
        "name": "grinning cat with smiling eyes",
        "tags": [
            "grinning cat with smiling eyes"
        ]
    },
    "1F639": {
        "name": "cat with tears of joy",
        "tags": [
            "cat with tears of joy"
        ]
    },
    "1F63B": {
        "name": "smiling cat with heart-eyes",
        "tags": [
            "smiling cat with heart-eyes"
        ]
    },
    "1F63C": {
        "name": "cat with wry smile",
        "tags": [
            "cat with wry smile"
        ]
    },
    "1F63D": {
        "name": "kissing cat",
        "tags": [
            "kissing cat"
        ]
    },
    "1F640": {
        "name": "weary cat",
        "tags": [
            "weary cat"
        ]
    },
    "1F63F": {
        "name": "crying cat",
        "tags": [
            "crying cat"
        ]
    },
    "1F63E": {
        "name": "pouting cat",
        "tags": [
            "pouting cat"
        ]
    },
    "1F648": {
        "name": "see-no-evil monkey",
        "tags": [
            "see-no-evil monkey"
        ]
    },
    "1F649": {
        "name": "hear-no-evil monkey",
        "tags": [
            "hear-no-evil monkey"
        ]
    },
    "1F64A": {
        "name": "speak-no-evil monkey",
        "tags": [
            "speak-no-evil monkey"
        ]
    },
    "1F48B": {
        "name": "kiss mark",
        "tags": [
            "kiss mark"
        ]
    },
    "1F48C": {
        "name": "love letter",
        "tags": [
            "love letter"
        ]
    },
    "1F498": {
        "name": "heart with arrow",
        "tags": [
            "heart with arrow"
        ]
    },
    "1F49D": {
        "name": "heart with ribbon",
        "tags": [
            "heart with ribbon"
        ]
    },
    "1F496": {
        "name": "sparkling heart",
        "tags": [
            "sparkling heart"
        ]
    },
    "1F497": {
        "name": "growing heart",
        "tags": [
            "growing heart"
        ]
    },
    "1F493": {
        "name": "beating heart",
        "tags": [
            "beating heart"
        ]
    },
    "1F49E": {
        "name": "revolving hearts",
        "tags": [
            "revolving hearts"
        ]
    },
    "1F495": {
        "name": "two hearts",
        "tags": [
            "two hearts"
        ]
    },
    "1F49F": {
        "name": "heart decoration",
        "tags": [
            "heart decoration"
        ]
    },
    "1F494": {
        "name": "broken heart",
        "tags": [
            "broken heart"
        ]
    },
    "2764-FE0F-200D-1F525": {
        "name": "heart on fire",
        "tags": [
            "heart on fire"
        ]
    },
    "2764-FE0F-200D-1FA79": {
        "name": "mending heart",
        "tags": [
            "mending heart"
        ]
    },
    "1F9E1": {
        "name": "orange heart",
        "tags": [
            "orange heart"
        ]
    },
    "1F49B": {
        "name": "yellow heart",
        "tags": [
            "yellow heart"
        ]
    },
    "1F49A": {
        "name": "green heart",
        "tags": [
            "green heart"
        ]
    },
    "1F499": {
        "name": "blue heart",
        "tags": [
            "blue heart"
        ]
    },
    "1F49C": {
        "name": "purple heart",
        "tags": [
            "purple heart"
        ]
    },
    "1F90E": {
        "name": "brown heart",
        "tags": [
            "brown heart"
        ]
    },
    "1F5A4": {
        "name": "black heart",
        "tags": [
            "black heart"
        ]
    },
    "1F90D": {
        "name": "white heart",
        "tags": [
            "white heart"
        ]
    },
    "1F4AF": {
        "name": "hundred points",
        "tags": [
            "hundred points"
        ]
    },
    "1F4A2": {
        "name": "anger symbol",
        "tags": [
            "anger symbol"
        ]
    },
    "1F4A5": {
        "name": "collision",
        "tags": [
            "collision"
        ]
    },
    "1F4AB": {
        "name": "dizzy",
        "tags": [
            "dizzy"
        ]
    },
    "1F4A6": {
        "name": "sweat droplets",
        "tags": [
            "sweat droplets"
        ]
    },
    "1F4A8": {
        "name": "dashing away",
        "tags": [
            "dashing away"
        ]
    },
    "1F573": {
        "name": "hole",
        "tags": [
            "hole"
        ]
    },
    "1F4A3": {
        "name": "bomb",
        "tags": [
            "bomb"
        ]
    },
    "1F4AC": {
        "name": "speech balloon",
        "tags": [
            "speech balloon"
        ]
    },
    "1F441-FE0F-200D-1F5E8-FE0F": {
        "name": "eye in speech bubble",
        "tags": [
            "eye in speech bubble"
        ]
    },
    "1F5E8": {
        "name": "left speech bubble",
        "tags": [
            "left speech bubble"
        ]
    },
    "1F5EF": {
        "name": "right anger bubble",
        "tags": [
            "right anger bubble"
        ]
    },
    "1F4AD": {
        "name": "thought balloon",
        "tags": [
            "thought balloon"
        ]
    },
    "1F4A4": {
        "name": "zzz",
        "tags": [
            "zzz"
        ]
    },
    "1F44B": {
        "name": "waving hand",
        "tags": [
            "waving hand"
        ]
    },
    "1F91A": {
        "name": "raised back of hand",
        "tags": [
            "raised back of hand"
        ]
    },
    "1F590": {
        "name": "hand with fingers splayed",
        "tags": [
            "hand with fingers splayed"
        ]
    },
    "270B": {
        "name": "raised hand",
        "tags": [
            "raised hand"
        ]
    },
    "1F596": {
        "name": "vulcan salute",
        "tags": [
            "vulcan salute"
        ]
    },
    "1F44C": {
        "name": "OK hand",
        "tags": [
            "OK hand"
        ]
    },
    "1F90C": {
        "name": "pinched fingers",
        "tags": [
            "pinched fingers"
        ]
    },
    "1F90F": {
        "name": "pinching hand",
        "tags": [
            "pinching hand"
        ]
    },
    "270C": {
        "name": "victory hand",
        "tags": [
            "victory hand"
        ]
    },
    "1F91E": {
        "name": "crossed fingers",
        "tags": [
            "crossed fingers"
        ]
    },
    "1F91F": {
        "name": "love-you gesture",
        "tags": [
            "love-you gesture"
        ]
    },
    "1F918": {
        "name": "sign of the horns",
        "tags": [
            "sign of the horns"
        ]
    },
    "1F919": {
        "name": "call me hand",
        "tags": [
            "call me hand"
        ]
    },
    "1F448": {
        "name": "backhand index pointing left",
        "tags": [
            "backhand index pointing left"
        ]
    },
    "1F449": {
        "name": "backhand index pointing right",
        "tags": [
            "backhand index pointing right"
        ]
    },
    "1F446": {
        "name": "backhand index pointing up",
        "tags": [
            "backhand index pointing up"
        ]
    },
    "1F595": {
        "name": "middle finger",
        "tags": [
            "middle finger"
        ]
    },
    "1F447": {
        "name": "backhand index pointing down",
        "tags": [
            "backhand index pointing down"
        ]
    },
    "261D": {
        "name": "index pointing up",
        "tags": [
            "index pointing up"
        ]
    },
    "1F44D": {
        "name": "thumbs up",
        "tags": [
            "thumbs up"
        ]
    },
    "1F44E": {
        "name": "thumbs down",
        "tags": [
            "thumbs down"
        ]
    },
    "270A": {
        "name": "raised fist",
        "tags": [
            "raised fist"
        ]
    },
    "1F44A": {
        "name": "oncoming fist",
        "tags": [
            "oncoming fist"
        ]
    },
    "1F91B": {
        "name": "left-facing fist",
        "tags": [
            "left-facing fist"
        ]
    },
    "1F91C": {
        "name": "right-facing fist",
        "tags": [
            "right-facing fist"
        ]
    },
    "1F44F": {
        "name": "clapping hands",
        "tags": [
            "clapping hands"
        ]
    },
    "1F64C": {
        "name": "raising hands",
        "tags": [
            "raising hands"
        ]
    },
    "1F450": {
        "name": "open hands",
        "tags": [
            "open hands"
        ]
    },
    "1F932": {
        "name": "palms up together",
        "tags": [
            "palms up together"
        ]
    },
    "1F91D": {
        "name": "handshake",
        "tags": [
            "handshake"
        ]
    },
    "1F64F": {
        "name": "folded hands",
        "tags": [
            "folded hands"
        ]
    },
    "270D": {
        "name": "writing hand",
        "tags": [
            "writing hand"
        ]
    },
    "1F485": {
        "name": "nail polish",
        "tags": [
            "nail polish"
        ]
    },
    "1F933": {
        "name": "selfie",
        "tags": [
            "selfie"
        ]
    },
    "1F4AA": {
        "name": "flexed biceps",
        "tags": [
            "flexed biceps"
        ]
    },
    "1F9BE": {
        "name": "mechanical arm",
        "tags": [
            "mechanical arm"
        ]
    },
    "1F9BF": {
        "name": "mechanical leg",
        "tags": [
            "mechanical leg"
        ]
    },
    "1F9B5": {
        "name": "leg",
        "tags": [
            "leg"
        ]
    },
    "1F9B6": {
        "name": "foot",
        "tags": [
            "foot"
        ]
    },
    "1F442": {
        "name": "ear",
        "tags": [
            "ear"
        ]
    },
    "1F9BB": {
        "name": "ear with hearing aid",
        "tags": [
            "ear with hearing aid"
        ]
    },
    "1F443": {
        "name": "nose",
        "tags": [
            "nose"
        ]
    },
    "1F9E0": {
        "name": "brain",
        "tags": [
            "brain"
        ]
    },
    "1FAC0": {
        "name": "anatomical heart",
        "tags": [
            "anatomical heart"
        ]
    },
    "1FAC1": {
        "name": "lungs",
        "tags": [
            "lungs"
        ]
    },
    "1F9B7": {
        "name": "tooth",
        "tags": [
            "tooth"
        ]
    },
    "1F9B4": {
        "name": "bone",
        "tags": [
            "bone"
        ]
    },
    "1F440": {
        "name": "eyes",
        "tags": [
            "eyes"
        ]
    },
    "1F441": {
        "name": "eye",
        "tags": [
            "eye"
        ]
    },
    "1F445": {
        "name": "tongue",
        "tags": [
            "tongue"
        ]
    },
    "1F444": {
        "name": "mouth",
        "tags": [
            "mouth"
        ]
    },
    "1F476": {
        "name": "baby",
        "tags": [
            "baby"
        ]
    },
    "1F9D2": {
        "name": "child",
        "tags": [
            "child"
        ]
    },
    "1F466": {
        "name": "boy",
        "tags": [
            "boy"
        ]
    },
    "1F467": {
        "name": "girl",
        "tags": [
            "girl"
        ]
    },
    "1F9D1": {
        "name": "person",
        "tags": [
            "person"
        ]
    },
    "1F471": {
        "name": "person: blond hair",
        "tags": [
            "person: blond hair"
        ]
    },
    "1F468": {
        "name": "man",
        "tags": [
            "man"
        ]
    },
    "1F9D4": {
        "name": "person: beard",
        "tags": [
            "person: beard"
        ]
    },
    "1F9D4-200D-2642-FE0F": {
        "name": "man: beard",
        "tags": [
            "man: beard"
        ]
    },
    "1F9D4-200D-2640-FE0F": {
        "name": "woman: beard",
        "tags": [
            "woman: beard"
        ]
    },
    "1F468-200D-1F9B0": {
        "name": "man: red hair",
        "tags": [
            "man: red hair"
        ]
    },
    "1F468-200D-1F9B1": {
        "name": "man: curly hair",
        "tags": [
            "man: curly hair"
        ]
    },
    "1F468-200D-1F9B3": {
        "name": "man: white hair",
        "tags": [
            "man: white hair"
        ]
    },
    "1F468-200D-1F9B2": {
        "name": "man: bald",
        "tags": [
            "man: bald"
        ]
    },
    "1F469": {
        "name": "woman",
        "tags": [
            "woman"
        ]
    },
    "1F469-200D-1F9B0": {
        "name": "woman: red hair",
        "tags": [
            "woman: red hair"
        ]
    },
    "1F9D1-200D-1F9B0": {
        "name": "person: red hair",
        "tags": [
            "person: red hair"
        ]
    },
    "1F469-200D-1F9B1": {
        "name": "woman: curly hair",
        "tags": [
            "woman: curly hair"
        ]
    },
    "1F9D1-200D-1F9B1": {
        "name": "person: curly hair",
        "tags": [
            "person: curly hair"
        ]
    },
    "1F469-200D-1F9B3": {
        "name": "woman: white hair",
        "tags": [
            "woman: white hair"
        ]
    },
    "1F9D1-200D-1F9B3": {
        "name": "person: white hair",
        "tags": [
            "person: white hair"
        ]
    },
    "1F469-200D-1F9B2": {
        "name": "woman: bald",
        "tags": [
            "woman: bald"
        ]
    },
    "1F9D1-200D-1F9B2": {
        "name": "person: bald",
        "tags": [
            "person: bald"
        ]
    },
    "1F471-200D-2640-FE0F": {
        "name": "woman: blond hair",
        "tags": [
            "woman: blond hair"
        ]
    },
    "1F471-200D-2642-FE0F": {
        "name": "man: blond hair",
        "tags": [
            "man: blond hair"
        ]
    },
    "1F9D3": {
        "name": "older person",
        "tags": [
            "older person"
        ]
    },
    "1F474": {
        "name": "old man",
        "tags": [
            "old man"
        ]
    },
    "1F475": {
        "name": "old woman",
        "tags": [
            "old woman"
        ]
    },
    "1F64D": {
        "name": "person frowning",
        "tags": [
            "person frowning"
        ]
    },
    "1F64D-200D-2642-FE0F": {
        "name": "man frowning",
        "tags": [
            "man frowning"
        ]
    },
    "1F64D-200D-2640-FE0F": {
        "name": "woman frowning",
        "tags": [
            "woman frowning"
        ]
    },
    "1F64E": {
        "name": "person pouting",
        "tags": [
            "person pouting"
        ]
    },
    "1F64E-200D-2642-FE0F": {
        "name": "man pouting",
        "tags": [
            "man pouting"
        ]
    },
    "1F64E-200D-2640-FE0F": {
        "name": "woman pouting",
        "tags": [
            "woman pouting"
        ]
    },
    "1F645": {
        "name": "person gesturing NO",
        "tags": [
            "person gesturing NO"
        ]
    },
    "1F645-200D-2642-FE0F": {
        "name": "man gesturing NO",
        "tags": [
            "man gesturing NO"
        ]
    },
    "1F645-200D-2640-FE0F": {
        "name": "woman gesturing NO",
        "tags": [
            "woman gesturing NO"
        ]
    },
    "1F646": {
        "name": "person gesturing OK",
        "tags": [
            "person gesturing OK"
        ]
    },
    "1F646-200D-2642-FE0F": {
        "name": "man gesturing OK",
        "tags": [
            "man gesturing OK"
        ]
    },
    "1F646-200D-2640-FE0F": {
        "name": "woman gesturing OK",
        "tags": [
            "woman gesturing OK"
        ]
    },
    "1F481": {
        "name": "person tipping hand",
        "tags": [
            "person tipping hand"
        ]
    },
    "1F481-200D-2642-FE0F": {
        "name": "man tipping hand",
        "tags": [
            "man tipping hand"
        ]
    },
    "1F481-200D-2640-FE0F": {
        "name": "woman tipping hand",
        "tags": [
            "woman tipping hand"
        ]
    },
    "1F64B": {
        "name": "person raising hand",
        "tags": [
            "person raising hand"
        ]
    },
    "1F64B-200D-2642-FE0F": {
        "name": "man raising hand",
        "tags": [
            "man raising hand"
        ]
    },
    "1F64B-200D-2640-FE0F": {
        "name": "woman raising hand",
        "tags": [
            "woman raising hand"
        ]
    },
    "1F9CF": {
        "name": "deaf person",
        "tags": [
            "deaf person"
        ]
    },
    "1F9CF-200D-2642-FE0F": {
        "name": "deaf man",
        "tags": [
            "deaf man"
        ]
    },
    "1F9CF-200D-2640-FE0F": {
        "name": "deaf woman",
        "tags": [
            "deaf woman"
        ]
    },
    "1F647": {
        "name": "person bowing",
        "tags": [
            "person bowing"
        ]
    },
    "1F647-200D-2642-FE0F": {
        "name": "man bowing",
        "tags": [
            "man bowing"
        ]
    },
    "1F647-200D-2640-FE0F": {
        "name": "woman bowing",
        "tags": [
            "woman bowing"
        ]
    },
    "1F926": {
        "name": "person facepalming",
        "tags": [
            "person facepalming"
        ]
    },
    "1F926-200D-2642-FE0F": {
        "name": "man facepalming",
        "tags": [
            "man facepalming"
        ]
    },
    "1F926-200D-2640-FE0F": {
        "name": "woman facepalming",
        "tags": [
            "woman facepalming"
        ]
    },
    "1F937": {
        "name": "person shrugging",
        "tags": [
            "person shrugging"
        ]
    },
    "1F937-200D-2642-FE0F": {
        "name": "man shrugging",
        "tags": [
            "man shrugging"
        ]
    },
    "1F937-200D-2640-FE0F": {
        "name": "woman shrugging",
        "tags": [
            "woman shrugging"
        ]
    },
    "1F9D1-200D-2695-FE0F": {
        "name": "health worker",
        "tags": [
            "health worker"
        ]
    },
    "1F468-200D-2695-FE0F": {
        "name": "man health worker",
        "tags": [
            "man health worker"
        ]
    },
    "1F469-200D-2695-FE0F": {
        "name": "woman health worker",
        "tags": [
            "woman health worker"
        ]
    },
    "1F9D1-200D-1F393": {
        "name": "student",
        "tags": [
            "student"
        ]
    },
    "1F468-200D-1F393": {
        "name": "man student",
        "tags": [
            "man student"
        ]
    },
    "1F469-200D-1F393": {
        "name": "woman student",
        "tags": [
            "woman student"
        ]
    },
    "1F9D1-200D-1F3EB": {
        "name": "teacher",
        "tags": [
            "teacher"
        ]
    },
    "1F468-200D-1F3EB": {
        "name": "man teacher",
        "tags": [
            "man teacher"
        ]
    },
    "1F469-200D-1F3EB": {
        "name": "woman teacher",
        "tags": [
            "woman teacher"
        ]
    },
    "1F9D1-200D-2696-FE0F": {
        "name": "judge",
        "tags": [
            "judge"
        ]
    },
    "1F468-200D-2696-FE0F": {
        "name": "man judge",
        "tags": [
            "man judge"
        ]
    },
    "1F469-200D-2696-FE0F": {
        "name": "woman judge",
        "tags": [
            "woman judge"
        ]
    },
    "1F9D1-200D-1F33E": {
        "name": "farmer",
        "tags": [
            "farmer"
        ]
    },
    "1F468-200D-1F33E": {
        "name": "man farmer",
        "tags": [
            "man farmer"
        ]
    },
    "1F469-200D-1F33E": {
        "name": "woman farmer",
        "tags": [
            "woman farmer"
        ]
    },
    "1F9D1-200D-1F373": {
        "name": "cook",
        "tags": [
            "cook"
        ]
    },
    "1F468-200D-1F373": {
        "name": "man cook",
        "tags": [
            "man cook"
        ]
    },
    "1F469-200D-1F373": {
        "name": "woman cook",
        "tags": [
            "woman cook"
        ]
    },
    "1F9D1-200D-1F527": {
        "name": "mechanic",
        "tags": [
            "mechanic"
        ]
    },
    "1F468-200D-1F527": {
        "name": "man mechanic",
        "tags": [
            "man mechanic"
        ]
    },
    "1F469-200D-1F527": {
        "name": "woman mechanic",
        "tags": [
            "woman mechanic"
        ]
    },
    "1F9D1-200D-1F3ED": {
        "name": "factory worker",
        "tags": [
            "factory worker"
        ]
    },
    "1F468-200D-1F3ED": {
        "name": "man factory worker",
        "tags": [
            "man factory worker"
        ]
    },
    "1F469-200D-1F3ED": {
        "name": "woman factory worker",
        "tags": [
            "woman factory worker"
        ]
    },
    "1F9D1-200D-1F4BC": {
        "name": "office worker",
        "tags": [
            "office worker"
        ]
    },
    "1F468-200D-1F4BC": {
        "name": "man office worker",
        "tags": [
            "man office worker"
        ]
    },
    "1F469-200D-1F4BC": {
        "name": "woman office worker",
        "tags": [
            "woman office worker"
        ]
    },
    "1F9D1-200D-1F52C": {
        "name": "scientist",
        "tags": [
            "scientist"
        ]
    },
    "1F468-200D-1F52C": {
        "name": "man scientist",
        "tags": [
            "man scientist"
        ]
    },
    "1F469-200D-1F52C": {
        "name": "woman scientist",
        "tags": [
            "woman scientist"
        ]
    },
    "1F9D1-200D-1F4BB": {
        "name": "technologist",
        "tags": [
            "technologist"
        ]
    },
    "1F468-200D-1F4BB": {
        "name": "man technologist",
        "tags": [
            "man technologist"
        ]
    },
    "1F469-200D-1F4BB": {
        "name": "woman technologist",
        "tags": [
            "woman technologist"
        ]
    },
    "1F9D1-200D-1F3A4": {
        "name": "singer",
        "tags": [
            "singer"
        ]
    },
    "1F468-200D-1F3A4": {
        "name": "man singer",
        "tags": [
            "man singer"
        ]
    },
    "1F469-200D-1F3A4": {
        "name": "woman singer",
        "tags": [
            "woman singer"
        ]
    },
    "1F9D1-200D-1F3A8": {
        "name": "artist",
        "tags": [
            "artist"
        ]
    },
    "1F468-200D-1F3A8": {
        "name": "man artist",
        "tags": [
            "man artist"
        ]
    },
    "1F469-200D-1F3A8": {
        "name": "woman artist",
        "tags": [
            "woman artist"
        ]
    },
    "1F9D1-200D-2708-FE0F": {
        "name": "pilot",
        "tags": [
            "pilot"
        ]
    },
    "1F468-200D-2708-FE0F": {
        "name": "man pilot",
        "tags": [
            "man pilot"
        ]
    },
    "1F469-200D-2708-FE0F": {
        "name": "woman pilot",
        "tags": [
            "woman pilot"
        ]
    },
    "1F9D1-200D-1F680": {
        "name": "astronaut",
        "tags": [
            "astronaut"
        ]
    },
    "1F468-200D-1F680": {
        "name": "man astronaut",
        "tags": [
            "man astronaut"
        ]
    },
    "1F469-200D-1F680": {
        "name": "woman astronaut",
        "tags": [
            "woman astronaut"
        ]
    },
    "1F9D1-200D-1F692": {
        "name": "firefighter",
        "tags": [
            "firefighter"
        ]
    },
    "1F468-200D-1F692": {
        "name": "man firefighter",
        "tags": [
            "man firefighter"
        ]
    },
    "1F469-200D-1F692": {
        "name": "woman firefighter",
        "tags": [
            "woman firefighter"
        ]
    },
    "1F46E": {
        "name": "police officer",
        "tags": [
            "police officer"
        ]
    },
    "1F46E-200D-2642-FE0F": {
        "name": "man police officer",
        "tags": [
            "man police officer"
        ]
    },
    "1F46E-200D-2640-FE0F": {
        "name": "woman police officer",
        "tags": [
            "woman police officer"
        ]
    },
    "1F575": {
        "name": "detective",
        "tags": [
            "detective"
        ]
    },
    "1F575-FE0F-200D-2642-FE0F": {
        "name": "man detective",
        "tags": [
            "man detective"
        ]
    },
    "1F575-FE0F-200D-2640-FE0F": {
        "name": "woman detective",
        "tags": [
            "woman detective"
        ]
    },
    "1F482": {
        "name": "guard",
        "tags": [
            "guard"
        ]
    },
    "1F482-200D-2642-FE0F": {
        "name": "man guard",
        "tags": [
            "man guard"
        ]
    },
    "1F482-200D-2640-FE0F": {
        "name": "woman guard",
        "tags": [
            "woman guard"
        ]
    },
    "1F977": {
        "name": "ninja",
        "tags": [
            "ninja"
        ]
    },
    "1F477": {
        "name": "construction worker",
        "tags": [
            "construction worker"
        ]
    },
    "1F477-200D-2642-FE0F": {
        "name": "man construction worker",
        "tags": [
            "man construction worker"
        ]
    },
    "1F477-200D-2640-FE0F": {
        "name": "woman construction worker",
        "tags": [
            "woman construction worker"
        ]
    },
    "1F934": {
        "name": "prince",
        "tags": [
            "prince"
        ]
    },
    "1F478": {
        "name": "princess",
        "tags": [
            "princess"
        ]
    },
    "1F473": {
        "name": "person wearing turban",
        "tags": [
            "person wearing turban"
        ]
    },
    "1F473-200D-2642-FE0F": {
        "name": "man wearing turban",
        "tags": [
            "man wearing turban"
        ]
    },
    "1F473-200D-2640-FE0F": {
        "name": "woman wearing turban",
        "tags": [
            "woman wearing turban"
        ]
    },
    "1F472": {
        "name": "person with skullcap",
        "tags": [
            "person with skullcap"
        ]
    },
    "1F9D5": {
        "name": "woman with headscarf",
        "tags": [
            "woman with headscarf"
        ]
    },
    "1F935": {
        "name": "person in tuxedo",
        "tags": [
            "person in tuxedo"
        ]
    },
    "1F935-200D-2642-FE0F": {
        "name": "man in tuxedo",
        "tags": [
            "man in tuxedo"
        ]
    },
    "1F935-200D-2640-FE0F": {
        "name": "woman in tuxedo",
        "tags": [
            "woman in tuxedo"
        ]
    },
    "1F470": {
        "name": "person with veil",
        "tags": [
            "person with veil"
        ]
    },
    "1F470-200D-2642-FE0F": {
        "name": "man with veil",
        "tags": [
            "man with veil"
        ]
    },
    "1F470-200D-2640-FE0F": {
        "name": "woman with veil",
        "tags": [
            "woman with veil"
        ]
    },
    "1F930": {
        "name": "pregnant woman",
        "tags": [
            "pregnant woman"
        ]
    },
    "1F931": {
        "name": "breast-feeding",
        "tags": [
            "breast-feeding"
        ]
    },
    "1F469-200D-1F37C": {
        "name": "woman feeding baby",
        "tags": [
            "woman feeding baby"
        ]
    },
    "1F468-200D-1F37C": {
        "name": "man feeding baby",
        "tags": [
            "man feeding baby"
        ]
    },
    "1F9D1-200D-1F37C": {
        "name": "person feeding baby",
        "tags": [
            "person feeding baby"
        ]
    },
    "1F47C": {
        "name": "baby angel",
        "tags": [
            "baby angel"
        ]
    },
    "1F385": {
        "name": "Santa Claus",
        "tags": [
            "Santa Claus"
        ]
    },
    "1F936": {
        "name": "Mrs. Claus",
        "tags": [
            "Mrs. Claus"
        ]
    },
    "1F9D1-200D-1F384": {
        "name": "mx claus",
        "tags": [
            "mx claus"
        ]
    },
    "1F9B8": {
        "name": "superhero",
        "tags": [
            "superhero"
        ]
    },
    "1F9B8-200D-2642-FE0F": {
        "name": "man superhero",
        "tags": [
            "man superhero"
        ]
    },
    "1F9B8-200D-2640-FE0F": {
        "name": "woman superhero",
        "tags": [
            "woman superhero"
        ]
    },
    "1F9B9": {
        "name": "supervillain",
        "tags": [
            "supervillain"
        ]
    },
    "1F9B9-200D-2642-FE0F": {
        "name": "man supervillain",
        "tags": [
            "man supervillain"
        ]
    },
    "1F9B9-200D-2640-FE0F": {
        "name": "woman supervillain",
        "tags": [
            "woman supervillain"
        ]
    },
    "1F9D9": {
        "name": "mage",
        "tags": [
            "mage"
        ]
    },
    "1F9D9-200D-2642-FE0F": {
        "name": "man mage",
        "tags": [
            "man mage"
        ]
    },
    "1F9D9-200D-2640-FE0F": {
        "name": "woman mage",
        "tags": [
            "woman mage"
        ]
    },
    "1F9DA": {
        "name": "fairy",
        "tags": [
            "fairy"
        ]
    },
    "1F9DA-200D-2642-FE0F": {
        "name": "man fairy",
        "tags": [
            "man fairy"
        ]
    },
    "1F9DA-200D-2640-FE0F": {
        "name": "woman fairy",
        "tags": [
            "woman fairy"
        ]
    },
    "1F9DB": {
        "name": "vampire",
        "tags": [
            "vampire"
        ]
    },
    "1F9DB-200D-2642-FE0F": {
        "name": "man vampire",
        "tags": [
            "man vampire"
        ]
    },
    "1F9DB-200D-2640-FE0F": {
        "name": "woman vampire",
        "tags": [
            "woman vampire"
        ]
    },
    "1F9DC": {
        "name": "merperson",
        "tags": [
            "merperson"
        ]
    },
    "1F9DC-200D-2642-FE0F": {
        "name": "merman",
        "tags": [
            "merman"
        ]
    },
    "1F9DC-200D-2640-FE0F": {
        "name": "mermaid",
        "tags": [
            "mermaid"
        ]
    },
    "1F9DD": {
        "name": "elf",
        "tags": [
            "elf"
        ]
    },
    "1F9DD-200D-2642-FE0F": {
        "name": "man elf",
        "tags": [
            "man elf"
        ]
    },
    "1F9DD-200D-2640-FE0F": {
        "name": "woman elf",
        "tags": [
            "woman elf"
        ]
    },
    "1F9DE": {
        "name": "genie",
        "tags": [
            "genie"
        ]
    },
    "1F9DE-200D-2642-FE0F": {
        "name": "man genie",
        "tags": [
            "man genie"
        ]
    },
    "1F9DE-200D-2640-FE0F": {
        "name": "woman genie",
        "tags": [
            "woman genie"
        ]
    },
    "1F9DF": {
        "name": "zombie",
        "tags": [
            "zombie"
        ]
    },
    "1F9DF-200D-2642-FE0F": {
        "name": "man zombie",
        "tags": [
            "man zombie"
        ]
    },
    "1F9DF-200D-2640-FE0F": {
        "name": "woman zombie",
        "tags": [
            "woman zombie"
        ]
    },
    "1F486": {
        "name": "person getting massage",
        "tags": [
            "person getting massage"
        ]
    },
    "1F486-200D-2642-FE0F": {
        "name": "man getting massage",
        "tags": [
            "man getting massage"
        ]
    },
    "1F486-200D-2640-FE0F": {
        "name": "woman getting massage",
        "tags": [
            "woman getting massage"
        ]
    },
    "1F487": {
        "name": "person getting haircut",
        "tags": [
            "person getting haircut"
        ]
    },
    "1F487-200D-2642-FE0F": {
        "name": "man getting haircut",
        "tags": [
            "man getting haircut"
        ]
    },
    "1F487-200D-2640-FE0F": {
        "name": "woman getting haircut",
        "tags": [
            "woman getting haircut"
        ]
    },
    "1F6B6": {
        "name": "person walking",
        "tags": [
            "person walking"
        ]
    },
    "1F6B6-200D-2642-FE0F": {
        "name": "man walking",
        "tags": [
            "man walking"
        ]
    },
    "1F6B6-200D-2640-FE0F": {
        "name": "woman walking",
        "tags": [
            "woman walking"
        ]
    },
    "1F9CD": {
        "name": "person standing",
        "tags": [
            "person standing"
        ]
    },
    "1F9CD-200D-2642-FE0F": {
        "name": "man standing",
        "tags": [
            "man standing"
        ]
    },
    "1F9CD-200D-2640-FE0F": {
        "name": "woman standing",
        "tags": [
            "woman standing"
        ]
    },
    "1F9CE": {
        "name": "person kneeling",
        "tags": [
            "person kneeling"
        ]
    },
    "1F9CE-200D-2642-FE0F": {
        "name": "man kneeling",
        "tags": [
            "man kneeling"
        ]
    },
    "1F9CE-200D-2640-FE0F": {
        "name": "woman kneeling",
        "tags": [
            "woman kneeling"
        ]
    },
    "1F9D1-200D-1F9AF": {
        "name": "person with white cane",
        "tags": [
            "person with white cane"
        ]
    },
    "1F468-200D-1F9AF": {
        "name": "man with white cane",
        "tags": [
            "man with white cane"
        ]
    },
    "1F469-200D-1F9AF": {
        "name": "woman with white cane",
        "tags": [
            "woman with white cane"
        ]
    },
    "1F9D1-200D-1F9BC": {
        "name": "person in motorized wheelchair",
        "tags": [
            "person in motorized wheelchair"
        ]
    },
    "1F468-200D-1F9BC": {
        "name": "man in motorized wheelchair",
        "tags": [
            "man in motorized wheelchair"
        ]
    },
    "1F469-200D-1F9BC": {
        "name": "woman in motorized wheelchair",
        "tags": [
            "woman in motorized wheelchair"
        ]
    },
    "1F9D1-200D-1F9BD": {
        "name": "person in manual wheelchair",
        "tags": [
            "person in manual wheelchair"
        ]
    },
    "1F468-200D-1F9BD": {
        "name": "man in manual wheelchair",
        "tags": [
            "man in manual wheelchair"
        ]
    },
    "1F469-200D-1F9BD": {
        "name": "woman in manual wheelchair",
        "tags": [
            "woman in manual wheelchair"
        ]
    },
    "1F3C3": {
        "name": "person running",
        "tags": [
            "person running"
        ]
    },
    "1F3C3-200D-2642-FE0F": {
        "name": "man running",
        "tags": [
            "man running"
        ]
    },
    "1F3C3-200D-2640-FE0F": {
        "name": "woman running",
        "tags": [
            "woman running"
        ]
    },
    "1F483": {
        "name": "woman dancing",
        "tags": [
            "woman dancing"
        ]
    },
    "1F57A": {
        "name": "man dancing",
        "tags": [
            "man dancing"
        ]
    },
    "1F574": {
        "name": "person in suit levitating",
        "tags": [
            "person in suit levitating"
        ]
    },
    "1F46F": {
        "name": "people with bunny ears",
        "tags": [
            "people with bunny ears"
        ]
    },
    "1F46F-200D-2642-FE0F": {
        "name": "men with bunny ears",
        "tags": [
            "men with bunny ears"
        ]
    },
    "1F46F-200D-2640-FE0F": {
        "name": "women with bunny ears",
        "tags": [
            "women with bunny ears"
        ]
    },
    "1F9D6": {
        "name": "person in steamy room",
        "tags": [
            "person in steamy room"
        ]
    },
    "1F9D6-200D-2642-FE0F": {
        "name": "man in steamy room",
        "tags": [
            "man in steamy room"
        ]
    },
    "1F9D6-200D-2640-FE0F": {
        "name": "woman in steamy room",
        "tags": [
            "woman in steamy room"
        ]
    },
    "1F9D7": {
        "name": "person climbing",
        "tags": [
            "person climbing"
        ]
    },
    "1F9D7-200D-2642-FE0F": {
        "name": "man climbing",
        "tags": [
            "man climbing"
        ]
    },
    "1F9D7-200D-2640-FE0F": {
        "name": "woman climbing",
        "tags": [
            "woman climbing"
        ]
    },
    "1F93A": {
        "name": "person fencing",
        "tags": [
            "person fencing"
        ]
    },
    "1F3C7": {
        "name": "horse racing",
        "tags": [
            "horse racing"
        ]
    },
    "26F7": {
        "name": "skier",
        "tags": [
            "skier"
        ]
    },
    "1F3C2": {
        "name": "snowboarder",
        "tags": [
            "snowboarder"
        ]
    },
    "1F3CC": {
        "name": "person golfing",
        "tags": [
            "person golfing"
        ]
    },
    "1F3CC-FE0F-200D-2642-FE0F": {
        "name": "man golfing",
        "tags": [
            "man golfing"
        ]
    },
    "1F3CC-FE0F-200D-2640-FE0F": {
        "name": "woman golfing",
        "tags": [
            "woman golfing"
        ]
    },
    "1F3C4": {
        "name": "person surfing",
        "tags": [
            "person surfing"
        ]
    },
    "1F3C4-200D-2642-FE0F": {
        "name": "man surfing",
        "tags": [
            "man surfing"
        ]
    },
    "1F3C4-200D-2640-FE0F": {
        "name": "woman surfing",
        "tags": [
            "woman surfing"
        ]
    },
    "1F6A3": {
        "name": "person rowing boat",
        "tags": [
            "person rowing boat"
        ]
    },
    "1F6A3-200D-2642-FE0F": {
        "name": "man rowing boat",
        "tags": [
            "man rowing boat"
        ]
    },
    "1F6A3-200D-2640-FE0F": {
        "name": "woman rowing boat",
        "tags": [
            "woman rowing boat"
        ]
    },
    "1F3CA": {
        "name": "person swimming",
        "tags": [
            "person swimming"
        ]
    },
    "1F3CA-200D-2642-FE0F": {
        "name": "man swimming",
        "tags": [
            "man swimming"
        ]
    },
    "1F3CA-200D-2640-FE0F": {
        "name": "woman swimming",
        "tags": [
            "woman swimming"
        ]
    },
    "26F9": {
        "name": "person bouncing ball",
        "tags": [
            "person bouncing ball"
        ]
    },
    "26F9-FE0F-200D-2642-FE0F": {
        "name": "man bouncing ball",
        "tags": [
            "man bouncing ball"
        ]
    },
    "26F9-FE0F-200D-2640-FE0F": {
        "name": "woman bouncing ball",
        "tags": [
            "woman bouncing ball"
        ]
    },
    "1F3CB": {
        "name": "person lifting weights",
        "tags": [
            "person lifting weights"
        ]
    },
    "1F3CB-FE0F-200D-2642-FE0F": {
        "name": "man lifting weights",
        "tags": [
            "man lifting weights"
        ]
    },
    "1F3CB-FE0F-200D-2640-FE0F": {
        "name": "woman lifting weights",
        "tags": [
            "woman lifting weights"
        ]
    },
    "1F6B4": {
        "name": "person biking",
        "tags": [
            "person biking"
        ]
    },
    "1F6B4-200D-2642-FE0F": {
        "name": "man biking",
        "tags": [
            "man biking"
        ]
    },
    "1F6B4-200D-2640-FE0F": {
        "name": "woman biking",
        "tags": [
            "woman biking"
        ]
    },
    "1F6B5": {
        "name": "person mountain biking",
        "tags": [
            "person mountain biking"
        ]
    },
    "1F6B5-200D-2642-FE0F": {
        "name": "man mountain biking",
        "tags": [
            "man mountain biking"
        ]
    },
    "1F6B5-200D-2640-FE0F": {
        "name": "woman mountain biking",
        "tags": [
            "woman mountain biking"
        ]
    },
    "1F938": {
        "name": "person cartwheeling",
        "tags": [
            "person cartwheeling"
        ]
    },
    "1F938-200D-2642-FE0F": {
        "name": "man cartwheeling",
        "tags": [
            "man cartwheeling"
        ]
    },
    "1F938-200D-2640-FE0F": {
        "name": "woman cartwheeling",
        "tags": [
            "woman cartwheeling"
        ]
    },
    "1F93C": {
        "name": "people wrestling",
        "tags": [
            "people wrestling"
        ]
    },
    "1F93C-200D-2642-FE0F": {
        "name": "men wrestling",
        "tags": [
            "men wrestling"
        ]
    },
    "1F93C-200D-2640-FE0F": {
        "name": "women wrestling",
        "tags": [
            "women wrestling"
        ]
    },
    "1F93D": {
        "name": "person playing water polo",
        "tags": [
            "person playing water polo"
        ]
    },
    "1F93D-200D-2642-FE0F": {
        "name": "man playing water polo",
        "tags": [
            "man playing water polo"
        ]
    },
    "1F93D-200D-2640-FE0F": {
        "name": "woman playing water polo",
        "tags": [
            "woman playing water polo"
        ]
    },
    "1F93E": {
        "name": "person playing handball",
        "tags": [
            "person playing handball"
        ]
    },
    "1F93E-200D-2642-FE0F": {
        "name": "man playing handball",
        "tags": [
            "man playing handball"
        ]
    },
    "1F93E-200D-2640-FE0F": {
        "name": "woman playing handball",
        "tags": [
            "woman playing handball"
        ]
    },
    "1F939": {
        "name": "person juggling",
        "tags": [
            "person juggling"
        ]
    },
    "1F939-200D-2642-FE0F": {
        "name": "man juggling",
        "tags": [
            "man juggling"
        ]
    },
    "1F939-200D-2640-FE0F": {
        "name": "woman juggling",
        "tags": [
            "woman juggling"
        ]
    },
    "1F9D8": {
        "name": "person in lotus position",
        "tags": [
            "person in lotus position"
        ]
    },
    "1F9D8-200D-2642-FE0F": {
        "name": "man in lotus position",
        "tags": [
            "man in lotus position"
        ]
    },
    "1F9D8-200D-2640-FE0F": {
        "name": "woman in lotus position",
        "tags": [
            "woman in lotus position"
        ]
    },
    "1F6C0": {
        "name": "person taking bath",
        "tags": [
            "person taking bath"
        ]
    },
    "1F6CC": {
        "name": "person in bed",
        "tags": [
            "person in bed"
        ]
    },
    "1F9D1-200D-1F91D-200D-1F9D1": {
        "name": "people holding hands",
        "tags": [
            "people holding hands"
        ]
    },
    "1F46D": {
        "name": "women holding hands",
        "tags": [
            "women holding hands"
        ]
    },
    "1F46B": {
        "name": "woman and man holding hands",
        "tags": [
            "woman and man holding hands"
        ]
    },
    "1F46C": {
        "name": "men holding hands",
        "tags": [
            "men holding hands"
        ]
    },
    "1F48F": {
        "name": "kiss",
        "tags": [
            "kiss"
        ]
    },
    "1F469-200D-2764-FE0F-200D-1F48B-200D-1F468": {
        "name": "kiss: woman, man",
        "tags": [
            "kiss: woman, man"
        ]
    },
    "1F468-200D-2764-FE0F-200D-1F48B-200D-1F468": {
        "name": "kiss: man, man",
        "tags": [
            "kiss: man, man"
        ]
    },
    "1F469-200D-2764-FE0F-200D-1F48B-200D-1F469": {
        "name": "kiss: woman, woman",
        "tags": [
            "kiss: woman, woman"
        ]
    },
    "1F491": {
        "name": "couple with heart",
        "tags": [
            "couple with heart"
        ]
    },
    "1F469-200D-2764-FE0F-200D-1F468": {
        "name": "couple with heart: woman, man",
        "tags": [
            "couple with heart: woman, man"
        ]
    },
    "1F468-200D-2764-FE0F-200D-1F468": {
        "name": "couple with heart: man, man",
        "tags": [
            "couple with heart: man, man"
        ]
    },
    "1F469-200D-2764-FE0F-200D-1F469": {
        "name": "couple with heart: woman, woman",
        "tags": [
            "couple with heart: woman, woman"
        ]
    },
    "1F46A": {
        "name": "family",
        "tags": [
            "family"
        ]
    },
    "1F468-200D-1F469-200D-1F466": {
        "name": "family: man, woman, boy",
        "tags": [
            "family: man, woman, boy"
        ]
    },
    "1F468-200D-1F469-200D-1F467": {
        "name": "family: man, woman, girl",
        "tags": [
            "family: man, woman, girl"
        ]
    },
    "1F468-200D-1F469-200D-1F467-200D-1F466": {
        "name": "family: man, woman, girl, boy",
        "tags": [
            "family: man, woman, girl, boy"
        ]
    },
    "1F468-200D-1F469-200D-1F466-200D-1F466": {
        "name": "family: man, woman, boy, boy",
        "tags": [
            "family: man, woman, boy, boy"
        ]
    },
    "1F468-200D-1F469-200D-1F467-200D-1F467": {
        "name": "family: man, woman, girl, girl",
        "tags": [
            "family: man, woman, girl, girl"
        ]
    },
    "1F468-200D-1F468-200D-1F466": {
        "name": "family: man, man, boy",
        "tags": [
            "family: man, man, boy"
        ]
    },
    "1F468-200D-1F468-200D-1F467": {
        "name": "family: man, man, girl",
        "tags": [
            "family: man, man, girl"
        ]
    },
    "1F468-200D-1F468-200D-1F467-200D-1F466": {
        "name": "family: man, man, girl, boy",
        "tags": [
            "family: man, man, girl, boy"
        ]
    },
    "1F468-200D-1F468-200D-1F466-200D-1F466": {
        "name": "family: man, man, boy, boy",
        "tags": [
            "family: man, man, boy, boy"
        ]
    },
    "1F468-200D-1F468-200D-1F467-200D-1F467": {
        "name": "family: man, man, girl, girl",
        "tags": [
            "family: man, man, girl, girl"
        ]
    },
    "1F469-200D-1F469-200D-1F466": {
        "name": "family: woman, woman, boy",
        "tags": [
            "family: woman, woman, boy"
        ]
    },
    "1F469-200D-1F469-200D-1F467": {
        "name": "family: woman, woman, girl",
        "tags": [
            "family: woman, woman, girl"
        ]
    },
    "1F469-200D-1F469-200D-1F467-200D-1F466": {
        "name": "family: woman, woman, girl, boy",
        "tags": [
            "family: woman, woman, girl, boy"
        ]
    },
    "1F469-200D-1F469-200D-1F466-200D-1F466": {
        "name": "family: woman, woman, boy, boy",
        "tags": [
            "family: woman, woman, boy, boy"
        ]
    },
    "1F469-200D-1F469-200D-1F467-200D-1F467": {
        "name": "family: woman, woman, girl, girl",
        "tags": [
            "family: woman, woman, girl, girl"
        ]
    },
    "1F468-200D-1F466": {
        "name": "family: man, boy",
        "tags": [
            "family: man, boy"
        ]
    },
    "1F468-200D-1F466-200D-1F466": {
        "name": "family: man, boy, boy",
        "tags": [
            "family: man, boy, boy"
        ]
    },
    "1F468-200D-1F467": {
        "name": "family: man, girl",
        "tags": [
            "family: man, girl"
        ]
    },
    "1F468-200D-1F467-200D-1F466": {
        "name": "family: man, girl, boy",
        "tags": [
            "family: man, girl, boy"
        ]
    },
    "1F468-200D-1F467-200D-1F467": {
        "name": "family: man, girl, girl",
        "tags": [
            "family: man, girl, girl"
        ]
    },
    "1F469-200D-1F466": {
        "name": "family: woman, boy",
        "tags": [
            "family: woman, boy"
        ]
    },
    "1F469-200D-1F466-200D-1F466": {
        "name": "family: woman, boy, boy",
        "tags": [
            "family: woman, boy, boy"
        ]
    },
    "1F469-200D-1F467": {
        "name": "family: woman, girl",
        "tags": [
            "family: woman, girl"
        ]
    },
    "1F469-200D-1F467-200D-1F466": {
        "name": "family: woman, girl, boy",
        "tags": [
            "family: woman, girl, boy"
        ]
    },
    "1F469-200D-1F467-200D-1F467": {
        "name": "family: woman, girl, girl",
        "tags": [
            "family: woman, girl, girl"
        ]
    },
    "1F5E3": {
        "name": "speaking head",
        "tags": [
            "speaking head"
        ]
    },
    "1F464": {
        "name": "bust in silhouette",
        "tags": [
            "bust in silhouette"
        ]
    },
    "1F465": {
        "name": "busts in silhouette",
        "tags": [
            "busts in silhouette"
        ]
    },
    "1FAC2": {
        "name": "people hugging",
        "tags": [
            "people hugging"
        ]
    },
    "1F463": {
        "name": "footprints",
        "tags": [
            "footprints"
        ]
    },
    "1F3FB": {
        "name": "light skin tone",
        "tags": [
            "light skin tone"
        ]
    },
    "1F3FC": {
        "name": "medium-light skin tone",
        "tags": [
            "medium-light skin tone"
        ]
    },
    "1F3FD": {
        "name": "medium skin tone",
        "tags": [
            "medium skin tone"
        ]
    },
    "1F3FE": {
        "name": "medium-dark skin tone",
        "tags": [
            "medium-dark skin tone"
        ]
    },
    "1F3FF": {
        "name": "dark skin tone",
        "tags": [
            "dark skin tone"
        ]
    },
    "1F9B0": {
        "name": "red hair",
        "tags": [
            "red hair"
        ]
    },
    "1F9B1": {
        "name": "curly hair",
        "tags": [
            "curly hair"
        ]
    },
    "1F9B3": {
        "name": "white hair",
        "tags": [
            "white hair"
        ]
    },
    "1F9B2": {
        "name": "bald",
        "tags": [
            "bald"
        ]
    },
    "1F435": {
        "name": "monkey face",
        "tags": [
            "monkey face"
        ]
    },
    "1F412": {
        "name": "monkey",
        "tags": [
            "monkey"
        ]
    },
    "1F98D": {
        "name": "gorilla",
        "tags": [
            "gorilla"
        ]
    },
    "1F9A7": {
        "name": "orangutan",
        "tags": [
            "orangutan"
        ]
    },
    "1F436": {
        "name": "dog face",
        "tags": [
            "dog face"
        ]
    },
    "1F415": {
        "name": "dog",
        "tags": [
            "dog"
        ]
    },
    "1F9AE": {
        "name": "guide dog",
        "tags": [
            "guide dog"
        ]
    },
    "1F415-200D-1F9BA": {
        "name": "service dog",
        "tags": [
            "service dog"
        ]
    },
    "1F429": {
        "name": "poodle",
        "tags": [
            "poodle"
        ]
    },
    "1F43A": {
        "name": "wolf",
        "tags": [
            "wolf"
        ]
    },
    "1F98A": {
        "name": "fox",
        "tags": [
            "fox"
        ]
    },
    "1F99D": {
        "name": "raccoon",
        "tags": [
            "raccoon"
        ]
    },
    "1F431": {
        "name": "cat face",
        "tags": [
            "cat face"
        ]
    },
    "1F408": {
        "name": "cat",
        "tags": [
            "cat"
        ]
    },
    "1F408-200D-2B1B": {
        "name": "black cat",
        "tags": [
            "black cat"
        ]
    },
    "1F981": {
        "name": "lion",
        "tags": [
            "lion"
        ]
    },
    "1F42F": {
        "name": "tiger face",
        "tags": [
            "tiger face"
        ]
    },
    "1F405": {
        "name": "tiger",
        "tags": [
            "tiger"
        ]
    },
    "1F406": {
        "name": "leopard",
        "tags": [
            "leopard"
        ]
    },
    "1F434": {
        "name": "horse face",
        "tags": [
            "horse face"
        ]
    },
    "1F40E": {
        "name": "horse",
        "tags": [
            "horse"
        ]
    },
    "1F984": {
        "name": "unicorn",
        "tags": [
            "unicorn"
        ]
    },
    "1F993": {
        "name": "zebra",
        "tags": [
            "zebra"
        ]
    },
    "1F98C": {
        "name": "deer",
        "tags": [
            "deer"
        ]
    },
    "1F9AC": {
        "name": "bison",
        "tags": [
            "bison"
        ]
    },
    "1F42E": {
        "name": "cow face",
        "tags": [
            "cow face"
        ]
    },
    "1F402": {
        "name": "ox",
        "tags": [
            "ox"
        ]
    },
    "1F403": {
        "name": "water buffalo",
        "tags": [
            "water buffalo"
        ]
    },
    "1F404": {
        "name": "cow",
        "tags": [
            "cow"
        ]
    },
    "1F437": {
        "name": "pig face",
        "tags": [
            "pig face"
        ]
    },
    "1F416": {
        "name": "pig",
        "tags": [
            "pig"
        ]
    },
    "1F417": {
        "name": "boar",
        "tags": [
            "boar"
        ]
    },
    "1F43D": {
        "name": "pig nose",
        "tags": [
            "pig nose"
        ]
    },
    "1F40F": {
        "name": "ram",
        "tags": [
            "ram"
        ]
    },
    "1F411": {
        "name": "ewe",
        "tags": [
            "ewe"
        ]
    },
    "1F410": {
        "name": "goat",
        "tags": [
            "goat"
        ]
    },
    "1F42A": {
        "name": "camel",
        "tags": [
            "camel"
        ]
    },
    "1F42B": {
        "name": "two-hump camel",
        "tags": [
            "two-hump camel"
        ]
    },
    "1F999": {
        "name": "llama",
        "tags": [
            "llama"
        ]
    },
    "1F992": {
        "name": "giraffe",
        "tags": [
            "giraffe"
        ]
    },
    "1F418": {
        "name": "elephant",
        "tags": [
            "elephant"
        ]
    },
    "1F9A3": {
        "name": "mammoth",
        "tags": [
            "mammoth"
        ]
    },
    "1F98F": {
        "name": "rhinoceros",
        "tags": [
            "rhinoceros"
        ]
    },
    "1F99B": {
        "name": "hippopotamus",
        "tags": [
            "hippopotamus"
        ]
    },
    "1F42D": {
        "name": "mouse face",
        "tags": [
            "mouse face"
        ]
    },
    "1F401": {
        "name": "mouse",
        "tags": [
            "mouse"
        ]
    },
    "1F400": {
        "name": "rat",
        "tags": [
            "rat"
        ]
    },
    "1F439": {
        "name": "hamster",
        "tags": [
            "hamster"
        ]
    },
    "1F430": {
        "name": "rabbit face",
        "tags": [
            "rabbit face"
        ]
    },
    "1F407": {
        "name": "rabbit",
        "tags": [
            "rabbit"
        ]
    },
    "1F43F": {
        "name": "chipmunk",
        "tags": [
            "chipmunk"
        ]
    },
    "1F9AB": {
        "name": "beaver",
        "tags": [
            "beaver"
        ]
    },
    "1F994": {
        "name": "hedgehog",
        "tags": [
            "hedgehog"
        ]
    },
    "1F987": {
        "name": "bat",
        "tags": [
            "bat"
        ]
    },
    "1F43B": {
        "name": "bear",
        "tags": [
            "bear"
        ]
    },
    "1F43B-200D-2744-FE0F": {
        "name": "polar bear",
        "tags": [
            "polar bear"
        ]
    },
    "1F428": {
        "name": "koala",
        "tags": [
            "koala"
        ]
    },
    "1F43C": {
        "name": "panda",
        "tags": [
            "panda"
        ]
    },
    "1F9A5": {
        "name": "sloth",
        "tags": [
            "sloth"
        ]
    },
    "1F9A6": {
        "name": "otter",
        "tags": [
            "otter"
        ]
    },
    "1F9A8": {
        "name": "skunk",
        "tags": [
            "skunk"
        ]
    },
    "1F998": {
        "name": "kangaroo",
        "tags": [
            "kangaroo"
        ]
    },
    "1F9A1": {
        "name": "badger",
        "tags": [
            "badger"
        ]
    },
    "1F43E": {
        "name": "paw prints",
        "tags": [
            "paw prints"
        ]
    },
    "1F983": {
        "name": "turkey",
        "tags": [
            "turkey"
        ]
    },
    "1F414": {
        "name": "chicken",
        "tags": [
            "chicken"
        ]
    },
    "1F413": {
        "name": "rooster",
        "tags": [
            "rooster"
        ]
    },
    "1F423": {
        "name": "hatching chick",
        "tags": [
            "hatching chick"
        ]
    },
    "1F424": {
        "name": "baby chick",
        "tags": [
            "baby chick"
        ]
    },
    "1F425": {
        "name": "front-facing baby chick",
        "tags": [
            "front-facing baby chick"
        ]
    },
    "1F426": {
        "name": "bird",
        "tags": [
            "bird"
        ]
    },
    "1F427": {
        "name": "penguin",
        "tags": [
            "penguin"
        ]
    },
    "1F54A": {
        "name": "dove",
        "tags": [
            "dove"
        ]
    },
    "1F985": {
        "name": "eagle",
        "tags": [
            "eagle"
        ]
    },
    "1F986": {
        "name": "duck",
        "tags": [
            "duck"
        ]
    },
    "1F9A2": {
        "name": "swan",
        "tags": [
            "swan"
        ]
    },
    "1F989": {
        "name": "owl",
        "tags": [
            "owl"
        ]
    },
    "1F9A4": {
        "name": "dodo",
        "tags": [
            "dodo"
        ]
    },
    "1FAB6": {
        "name": "feather",
        "tags": [
            "feather"
        ]
    },
    "1F9A9": {
        "name": "flamingo",
        "tags": [
            "flamingo"
        ]
    },
    "1F99A": {
        "name": "peacock",
        "tags": [
            "peacock"
        ]
    },
    "1F99C": {
        "name": "parrot",
        "tags": [
            "parrot"
        ]
    },
    "1F438": {
        "name": "frog",
        "tags": [
            "frog"
        ]
    },
    "1F40A": {
        "name": "crocodile",
        "tags": [
            "crocodile"
        ]
    },
    "1F422": {
        "name": "turtle",
        "tags": [
            "turtle"
        ]
    },
    "1F98E": {
        "name": "lizard",
        "tags": [
            "lizard"
        ]
    },
    "1F40D": {
        "name": "snake",
        "tags": [
            "snake"
        ]
    },
    "1F432": {
        "name": "dragon face",
        "tags": [
            "dragon face"
        ]
    },
    "1F409": {
        "name": "dragon",
        "tags": [
            "dragon"
        ]
    },
    "1F995": {
        "name": "sauropod",
        "tags": [
            "sauropod"
        ]
    },
    "1F996": {
        "name": "T-Rex",
        "tags": [
            "T-Rex"
        ]
    },
    "1F433": {
        "name": "spouting whale",
        "tags": [
            "spouting whale"
        ]
    },
    "1F40B": {
        "name": "whale",
        "tags": [
            "whale"
        ]
    },
    "1F42C": {
        "name": "dolphin",
        "tags": [
            "dolphin"
        ]
    },
    "1F9AD": {
        "name": "seal",
        "tags": [
            "seal"
        ]
    },
    "1F41F": {
        "name": "fish",
        "tags": [
            "fish"
        ]
    },
    "1F420": {
        "name": "tropical fish",
        "tags": [
            "tropical fish"
        ]
    },
    "1F421": {
        "name": "blowfish",
        "tags": [
            "blowfish"
        ]
    },
    "1F988": {
        "name": "shark",
        "tags": [
            "shark"
        ]
    },
    "1F419": {
        "name": "octopus",
        "tags": [
            "octopus"
        ]
    },
    "1F41A": {
        "name": "spiral shell",
        "tags": [
            "spiral shell"
        ]
    },
    "1F40C": {
        "name": "snail",
        "tags": [
            "snail"
        ]
    },
    "1F98B": {
        "name": "butterfly",
        "tags": [
            "butterfly"
        ]
    },
    "1F41B": {
        "name": "bug",
        "tags": [
            "bug"
        ]
    },
    "1F41C": {
        "name": "ant",
        "tags": [
            "ant"
        ]
    },
    "1F41D": {
        "name": "honeybee",
        "tags": [
            "honeybee"
        ]
    },
    "1FAB2": {
        "name": "beetle",
        "tags": [
            "beetle"
        ]
    },
    "1F41E": {
        "name": "lady beetle",
        "tags": [
            "lady beetle"
        ]
    },
    "1F997": {
        "name": "cricket",
        "tags": [
            "cricket"
        ]
    },
    "1FAB3": {
        "name": "cockroach",
        "tags": [
            "cockroach"
        ]
    },
    "1F577": {
        "name": "spider",
        "tags": [
            "spider"
        ]
    },
    "1F578": {
        "name": "spider web",
        "tags": [
            "spider web"
        ]
    },
    "1F982": {
        "name": "scorpion",
        "tags": [
            "scorpion"
        ]
    },
    "1F99F": {
        "name": "mosquito",
        "tags": [
            "mosquito"
        ]
    },
    "1FAB0": {
        "name": "fly",
        "tags": [
            "fly"
        ]
    },
    "1FAB1": {
        "name": "worm",
        "tags": [
            "worm"
        ]
    },
    "1F9A0": {
        "name": "microbe",
        "tags": [
            "microbe"
        ]
    },
    "1F490": {
        "name": "bouquet",
        "tags": [
            "bouquet"
        ]
    },
    "1F338": {
        "name": "cherry blossom",
        "tags": [
            "cherry blossom"
        ]
    },
    "1F4AE": {
        "name": "white flower",
        "tags": [
            "white flower"
        ]
    },
    "1F3F5": {
        "name": "rosette",
        "tags": [
            "rosette"
        ]
    },
    "1F339": {
        "name": "rose",
        "tags": [
            "rose"
        ]
    },
    "1F940": {
        "name": "wilted flower",
        "tags": [
            "wilted flower"
        ]
    },
    "1F33A": {
        "name": "hibiscus",
        "tags": [
            "hibiscus"
        ]
    },
    "1F33B": {
        "name": "sunflower",
        "tags": [
            "sunflower"
        ]
    },
    "1F33C": {
        "name": "blossom",
        "tags": [
            "blossom"
        ]
    },
    "1F337": {
        "name": "tulip",
        "tags": [
            "tulip"
        ]
    },
    "1F331": {
        "name": "seedling",
        "tags": [
            "seedling"
        ]
    },
    "1FAB4": {
        "name": "potted plant",
        "tags": [
            "potted plant"
        ]
    },
    "1F332": {
        "name": "evergreen tree",
        "tags": [
            "evergreen tree"
        ]
    },
    "1F333": {
        "name": "deciduous tree",
        "tags": [
            "deciduous tree"
        ]
    },
    "1F334": {
        "name": "palm tree",
        "tags": [
            "palm tree"
        ]
    },
    "1F335": {
        "name": "cactus",
        "tags": [
            "cactus"
        ]
    },
    "1F33E": {
        "name": "sheaf of rice",
        "tags": [
            "sheaf of rice"
        ]
    },
    "1F33F": {
        "name": "herb",
        "tags": [
            "herb"
        ]
    },
    "1F340": {
        "name": "four leaf clover",
        "tags": [
            "four leaf clover"
        ]
    },
    "1F341": {
        "name": "maple leaf",
        "tags": [
            "maple leaf"
        ]
    },
    "1F342": {
        "name": "fallen leaf",
        "tags": [
            "fallen leaf"
        ]
    },
    "1F343": {
        "name": "leaf fluttering in wind",
        "tags": [
            "leaf fluttering in wind"
        ]
    },
    "1F347": {
        "name": "grapes",
        "tags": [
            "grapes"
        ]
    },
    "1F348": {
        "name": "melon",
        "tags": [
            "melon"
        ]
    },
    "1F349": {
        "name": "watermelon",
        "tags": [
            "watermelon"
        ]
    },
    "1F34A": {
        "name": "tangerine",
        "tags": [
            "tangerine"
        ]
    },
    "1F34B": {
        "name": "lemon",
        "tags": [
            "lemon"
        ]
    },
    "1F34C": {
        "name": "banana",
        "tags": [
            "banana"
        ]
    },
    "1F34D": {
        "name": "pineapple",
        "tags": [
            "pineapple"
        ]
    },
    "1F96D": {
        "name": "mango",
        "tags": [
            "mango"
        ]
    },
    "1F34E": {
        "name": "red apple",
        "tags": [
            "red apple"
        ]
    },
    "1F34F": {
        "name": "green apple",
        "tags": [
            "green apple"
        ]
    },
    "1F350": {
        "name": "pear",
        "tags": [
            "pear"
        ]
    },
    "1F351": {
        "name": "peach",
        "tags": [
            "peach"
        ]
    },
    "1F352": {
        "name": "cherries",
        "tags": [
            "cherries"
        ]
    },
    "1F353": {
        "name": "strawberry",
        "tags": [
            "strawberry"
        ]
    },
    "1FAD0": {
        "name": "blueberries",
        "tags": [
            "blueberries"
        ]
    },
    "1F95D": {
        "name": "kiwi fruit",
        "tags": [
            "kiwi fruit"
        ]
    },
    "1F345": {
        "name": "tomato",
        "tags": [
            "tomato"
        ]
    },
    "1FAD2": {
        "name": "olive",
        "tags": [
            "olive"
        ]
    },
    "1F965": {
        "name": "coconut",
        "tags": [
            "coconut"
        ]
    },
    "1F951": {
        "name": "avocado",
        "tags": [
            "avocado"
        ]
    },
    "1F346": {
        "name": "eggplant",
        "tags": [
            "eggplant"
        ]
    },
    "1F954": {
        "name": "potato",
        "tags": [
            "potato"
        ]
    },
    "1F955": {
        "name": "carrot",
        "tags": [
            "carrot"
        ]
    },
    "1F33D": {
        "name": "ear of corn",
        "tags": [
            "ear of corn"
        ]
    },
    "1F336": {
        "name": "hot pepper",
        "tags": [
            "hot pepper"
        ]
    },
    "1FAD1": {
        "name": "bell pepper",
        "tags": [
            "bell pepper"
        ]
    },
    "1F952": {
        "name": "cucumber",
        "tags": [
            "cucumber"
        ]
    },
    "1F96C": {
        "name": "leafy green",
        "tags": [
            "leafy green"
        ]
    },
    "1F966": {
        "name": "broccoli",
        "tags": [
            "broccoli"
        ]
    },
    "1F9C4": {
        "name": "garlic",
        "tags": [
            "garlic"
        ]
    },
    "1F9C5": {
        "name": "onion",
        "tags": [
            "onion"
        ]
    },
    "1F344": {
        "name": "mushroom",
        "tags": [
            "mushroom"
        ]
    },
    "1F95C": {
        "name": "peanuts",
        "tags": [
            "peanuts"
        ]
    },
    "1F330": {
        "name": "chestnut",
        "tags": [
            "chestnut"
        ]
    },
    "1F35E": {
        "name": "bread",
        "tags": [
            "bread"
        ]
    },
    "1F950": {
        "name": "croissant",
        "tags": [
            "croissant"
        ]
    },
    "1F956": {
        "name": "baguette bread",
        "tags": [
            "baguette bread"
        ]
    },
    "1FAD3": {
        "name": "flatbread",
        "tags": [
            "flatbread"
        ]
    },
    "1F968": {
        "name": "pretzel",
        "tags": [
            "pretzel"
        ]
    },
    "1F96F": {
        "name": "bagel",
        "tags": [
            "bagel"
        ]
    },
    "1F95E": {
        "name": "pancakes",
        "tags": [
            "pancakes"
        ]
    },
    "1F9C7": {
        "name": "waffle",
        "tags": [
            "waffle"
        ]
    },
    "1F9C0": {
        "name": "cheese wedge",
        "tags": [
            "cheese wedge"
        ]
    },
    "1F356": {
        "name": "meat on bone",
        "tags": [
            "meat on bone"
        ]
    },
    "1F357": {
        "name": "poultry leg",
        "tags": [
            "poultry leg"
        ]
    },
    "1F969": {
        "name": "cut of meat",
        "tags": [
            "cut of meat"
        ]
    },
    "1F953": {
        "name": "bacon",
        "tags": [
            "bacon"
        ]
    },
    "1F354": {
        "name": "hamburger",
        "tags": [
            "hamburger"
        ]
    },
    "1F35F": {
        "name": "french fries",
        "tags": [
            "french fries"
        ]
    },
    "1F355": {
        "name": "pizza",
        "tags": [
            "pizza"
        ]
    },
    "1F32D": {
        "name": "hot dog",
        "tags": [
            "hot dog"
        ]
    },
    "1F96A": {
        "name": "sandwich",
        "tags": [
            "sandwich"
        ]
    },
    "1F32E": {
        "name": "taco",
        "tags": [
            "taco"
        ]
    },
    "1F32F": {
        "name": "burrito",
        "tags": [
            "burrito"
        ]
    },
    "1FAD4": {
        "name": "tamale",
        "tags": [
            "tamale"
        ]
    },
    "1F959": {
        "name": "stuffed flatbread",
        "tags": [
            "stuffed flatbread"
        ]
    },
    "1F9C6": {
        "name": "falafel",
        "tags": [
            "falafel"
        ]
    },
    "1F95A": {
        "name": "egg",
        "tags": [
            "egg"
        ]
    },
    "1F373": {
        "name": "cooking",
        "tags": [
            "cooking"
        ]
    },
    "1F958": {
        "name": "shallow pan of food",
        "tags": [
            "shallow pan of food"
        ]
    },
    "1F372": {
        "name": "pot of food",
        "tags": [
            "pot of food"
        ]
    },
    "1FAD5": {
        "name": "fondue",
        "tags": [
            "fondue"
        ]
    },
    "1F963": {
        "name": "bowl with spoon",
        "tags": [
            "bowl with spoon"
        ]
    },
    "1F957": {
        "name": "green salad",
        "tags": [
            "green salad"
        ]
    },
    "1F37F": {
        "name": "popcorn",
        "tags": [
            "popcorn"
        ]
    },
    "1F9C8": {
        "name": "butter",
        "tags": [
            "butter"
        ]
    },
    "1F9C2": {
        "name": "salt",
        "tags": [
            "salt"
        ]
    },
    "1F96B": {
        "name": "canned food",
        "tags": [
            "canned food"
        ]
    },
    "1F371": {
        "name": "bento box",
        "tags": [
            "bento box"
        ]
    },
    "1F358": {
        "name": "rice cracker",
        "tags": [
            "rice cracker"
        ]
    },
    "1F359": {
        "name": "rice ball",
        "tags": [
            "rice ball"
        ]
    },
    "1F35A": {
        "name": "cooked rice",
        "tags": [
            "cooked rice"
        ]
    },
    "1F35B": {
        "name": "curry rice",
        "tags": [
            "curry rice"
        ]
    },
    "1F35C": {
        "name": "steaming bowl",
        "tags": [
            "steaming bowl"
        ]
    },
    "1F35D": {
        "name": "spaghetti",
        "tags": [
            "spaghetti"
        ]
    },
    "1F360": {
        "name": "roasted sweet potato",
        "tags": [
            "roasted sweet potato"
        ]
    },
    "1F362": {
        "name": "oden",
        "tags": [
            "oden"
        ]
    },
    "1F363": {
        "name": "sushi",
        "tags": [
            "sushi"
        ]
    },
    "1F364": {
        "name": "fried shrimp",
        "tags": [
            "fried shrimp"
        ]
    },
    "1F365": {
        "name": "fish cake with swirl",
        "tags": [
            "fish cake with swirl"
        ]
    },
    "1F96E": {
        "name": "moon cake",
        "tags": [
            "moon cake"
        ]
    },
    "1F361": {
        "name": "dango",
        "tags": [
            "dango"
        ]
    },
    "1F95F": {
        "name": "dumpling",
        "tags": [
            "dumpling"
        ]
    },
    "1F960": {
        "name": "fortune cookie",
        "tags": [
            "fortune cookie"
        ]
    },
    "1F961": {
        "name": "takeout box",
        "tags": [
            "takeout box"
        ]
    },
    "1F980": {
        "name": "crab",
        "tags": [
            "crab"
        ]
    },
    "1F99E": {
        "name": "lobster",
        "tags": [
            "lobster"
        ]
    },
    "1F990": {
        "name": "shrimp",
        "tags": [
            "shrimp"
        ]
    },
    "1F991": {
        "name": "squid",
        "tags": [
            "squid"
        ]
    },
    "1F9AA": {
        "name": "oyster",
        "tags": [
            "oyster"
        ]
    },
    "1F366": {
        "name": "soft ice cream",
        "tags": [
            "soft ice cream"
        ]
    },
    "1F367": {
        "name": "shaved ice",
        "tags": [
            "shaved ice"
        ]
    },
    "1F368": {
        "name": "ice cream",
        "tags": [
            "ice cream"
        ]
    },
    "1F369": {
        "name": "doughnut",
        "tags": [
            "doughnut"
        ]
    },
    "1F36A": {
        "name": "cookie",
        "tags": [
            "cookie"
        ]
    },
    "1F382": {
        "name": "birthday cake",
        "tags": [
            "birthday cake"
        ]
    },
    "1F370": {
        "name": "shortcake",
        "tags": [
            "shortcake"
        ]
    },
    "1F9C1": {
        "name": "cupcake",
        "tags": [
            "cupcake"
        ]
    },
    "1F967": {
        "name": "pie",
        "tags": [
            "pie"
        ]
    },
    "1F36B": {
        "name": "chocolate bar",
        "tags": [
            "chocolate bar"
        ]
    },
    "1F36C": {
        "name": "candy",
        "tags": [
            "candy"
        ]
    },
    "1F36D": {
        "name": "lollipop",
        "tags": [
            "lollipop"
        ]
    },
    "1F36E": {
        "name": "custard",
        "tags": [
            "custard"
        ]
    },
    "1F36F": {
        "name": "honey pot",
        "tags": [
            "honey pot"
        ]
    },
    "1F37C": {
        "name": "baby bottle",
        "tags": [
            "baby bottle"
        ]
    },
    "1F95B": {
        "name": "glass of milk",
        "tags": [
            "glass of milk"
        ]
    },
    "1FAD6": {
        "name": "teapot",
        "tags": [
            "teapot"
        ]
    },
    "1F375": {
        "name": "teacup without handle",
        "tags": [
            "teacup without handle"
        ]
    },
    "1F376": {
        "name": "sake",
        "tags": [
            "sake"
        ]
    },
    "1F37E": {
        "name": "bottle with popping cork",
        "tags": [
            "bottle with popping cork"
        ]
    },
    "1F377": {
        "name": "wine glass",
        "tags": [
            "wine glass"
        ]
    },
    "1F378": {
        "name": "cocktail glass",
        "tags": [
            "cocktail glass"
        ]
    },
    "1F379": {
        "name": "tropical drink",
        "tags": [
            "tropical drink"
        ]
    },
    "1F37A": {
        "name": "beer mug",
        "tags": [
            "beer mug"
        ]
    },
    "1F37B": {
        "name": "clinking beer mugs",
        "tags": [
            "clinking beer mugs"
        ]
    },
    "1F942": {
        "name": "clinking glasses",
        "tags": [
            "clinking glasses"
        ]
    },
    "1F943": {
        "name": "tumbler glass",
        "tags": [
            "tumbler glass"
        ]
    },
    "1F964": {
        "name": "cup with straw",
        "tags": [
            "cup with straw"
        ]
    },
    "1F9CB": {
        "name": "bubble tea",
        "tags": [
            "bubble tea"
        ]
    },
    "1F9C3": {
        "name": "beverage box",
        "tags": [
            "beverage box"
        ]
    },
    "1F9C9": {
        "name": "mate",
        "tags": [
            "mate"
        ]
    },
    "1F9CA": {
        "name": "ice",
        "tags": [
            "ice"
        ]
    },
    "1F962": {
        "name": "chopsticks",
        "tags": [
            "chopsticks"
        ]
    },
    "1F37D": {
        "name": "fork and knife with plate",
        "tags": [
            "fork and knife with plate"
        ]
    },
    "1F374": {
        "name": "fork and knife",
        "tags": [
            "fork and knife"
        ]
    },
    "1F944": {
        "name": "spoon",
        "tags": [
            "spoon"
        ]
    },
    "1F52A": {
        "name": "kitchen knife",
        "tags": [
            "kitchen knife"
        ]
    },
    "1F3FA": {
        "name": "amphora",
        "tags": [
            "amphora"
        ]
    },
    "1F30D": {
        "name": "globe showing Europe-Africa",
        "tags": [
            "globe showing Europe-Africa"
        ]
    },
    "1F30E": {
        "name": "globe showing Americas",
        "tags": [
            "globe showing Americas"
        ]
    },
    "1F30F": {
        "name": "globe showing Asia-Australia",
        "tags": [
            "globe showing Asia-Australia"
        ]
    },
    "1F310": {
        "name": "globe with meridians",
        "tags": [
            "globe with meridians"
        ]
    },
    "1F5FA": {
        "name": "world map",
        "tags": [
            "world map"
        ]
    },
    "1F5FE": {
        "name": "map of Japan",
        "tags": [
            "map of Japan"
        ]
    },
    "1F9ED": {
        "name": "compass",
        "tags": [
            "compass"
        ]
    },
    "1F3D4": {
        "name": "snow-capped mountain",
        "tags": [
            "snow-capped mountain"
        ]
    },
    "26F0": {
        "name": "mountain",
        "tags": [
            "mountain"
        ]
    },
    "1F30B": {
        "name": "volcano",
        "tags": [
            "volcano"
        ]
    },
    "1F5FB": {
        "name": "mount fuji",
        "tags": [
            "mount fuji"
        ]
    },
    "1F3D5": {
        "name": "camping",
        "tags": [
            "camping"
        ]
    },
    "1F3D6": {
        "name": "beach with umbrella",
        "tags": [
            "beach with umbrella"
        ]
    },
    "1F3DC": {
        "name": "desert",
        "tags": [
            "desert"
        ]
    },
    "1F3DD": {
        "name": "desert island",
        "tags": [
            "desert island"
        ]
    },
    "1F3DE": {
        "name": "national park",
        "tags": [
            "national park"
        ]
    },
    "1F3DF": {
        "name": "stadium",
        "tags": [
            "stadium"
        ]
    },
    "1F3DB": {
        "name": "classical building",
        "tags": [
            "classical building"
        ]
    },
    "1F3D7": {
        "name": "building construction",
        "tags": [
            "building construction"
        ]
    },
    "1F9F1": {
        "name": "brick",
        "tags": [
            "brick"
        ]
    },
    "1FAA8": {
        "name": "rock",
        "tags": [
            "rock"
        ]
    },
    "1FAB5": {
        "name": "wood",
        "tags": [
            "wood"
        ]
    },
    "1F6D6": {
        "name": "hut",
        "tags": [
            "hut"
        ]
    },
    "1F3D8": {
        "name": "houses",
        "tags": [
            "houses"
        ]
    },
    "1F3DA": {
        "name": "derelict house",
        "tags": [
            "derelict house"
        ]
    },
    "1F3E0": {
        "name": "house",
        "tags": [
            "house"
        ]
    },
    "1F3E1": {
        "name": "house with garden",
        "tags": [
            "house with garden"
        ]
    },
    "1F3E2": {
        "name": "office building",
        "tags": [
            "office building"
        ]
    },
    "1F3E3": {
        "name": "Japanese post office",
        "tags": [
            "Japanese post office"
        ]
    },
    "1F3E4": {
        "name": "post office",
        "tags": [
            "post office"
        ]
    },
    "1F3E5": {
        "name": "hospital",
        "tags": [
            "hospital"
        ]
    },
    "1F3E6": {
        "name": "bank",
        "tags": [
            "bank"
        ]
    },
    "1F3E8": {
        "name": "hotel",
        "tags": [
            "hotel"
        ]
    },
    "1F3E9": {
        "name": "love hotel",
        "tags": [
            "love hotel"
        ]
    },
    "1F3EA": {
        "name": "convenience store",
        "tags": [
            "convenience store"
        ]
    },
    "1F3EB": {
        "name": "school",
        "tags": [
            "school"
        ]
    },
    "1F3EC": {
        "name": "department store",
        "tags": [
            "department store"
        ]
    },
    "1F3ED": {
        "name": "factory",
        "tags": [
            "factory"
        ]
    },
    "1F3EF": {
        "name": "Japanese castle",
        "tags": [
            "Japanese castle"
        ]
    },
    "1F3F0": {
        "name": "castle",
        "tags": [
            "castle"
        ]
    },
    "1F492": {
        "name": "wedding",
        "tags": [
            "wedding"
        ]
    },
    "1F5FC": {
        "name": "Tokyo tower",
        "tags": [
            "Tokyo tower"
        ]
    },
    "1F5FD": {
        "name": "Statue of Liberty",
        "tags": [
            "Statue of Liberty"
        ]
    },
    "26EA": {
        "name": "church",
        "tags": [
            "church"
        ]
    },
    "1F54C": {
        "name": "mosque",
        "tags": [
            "mosque"
        ]
    },
    "1F6D5": {
        "name": "hindu temple",
        "tags": [
            "hindu temple"
        ]
    },
    "1F54D": {
        "name": "synagogue",
        "tags": [
            "synagogue"
        ]
    },
    "26E9": {
        "name": "shinto shrine",
        "tags": [
            "shinto shrine"
        ]
    },
    "1F54B": {
        "name": "kaaba",
        "tags": [
            "kaaba"
        ]
    },
    "26F2": {
        "name": "fountain",
        "tags": [
            "fountain"
        ]
    },
    "26FA": {
        "name": "tent",
        "tags": [
            "tent"
        ]
    },
    "1F301": {
        "name": "foggy",
        "tags": [
            "foggy"
        ]
    },
    "1F303": {
        "name": "night with stars",
        "tags": [
            "night with stars"
        ]
    },
    "1F3D9": {
        "name": "cityscape",
        "tags": [
            "cityscape"
        ]
    },
    "1F304": {
        "name": "sunrise over mountains",
        "tags": [
            "sunrise over mountains"
        ]
    },
    "1F305": {
        "name": "sunrise",
        "tags": [
            "sunrise"
        ]
    },
    "1F306": {
        "name": "cityscape at dusk",
        "tags": [
            "cityscape at dusk"
        ]
    },
    "1F307": {
        "name": "sunset",
        "tags": [
            "sunset"
        ]
    },
    "1F309": {
        "name": "bridge at night",
        "tags": [
            "bridge at night"
        ]
    },
    "1F3A0": {
        "name": "carousel horse",
        "tags": [
            "carousel horse"
        ]
    },
    "1F3A1": {
        "name": "ferris wheel",
        "tags": [
            "ferris wheel"
        ]
    },
    "1F3A2": {
        "name": "roller coaster",
        "tags": [
            "roller coaster"
        ]
    },
    "1F488": {
        "name": "barber pole",
        "tags": [
            "barber pole"
        ]
    },
    "1F3AA": {
        "name": "circus tent",
        "tags": [
            "circus tent"
        ]
    },
    "1F682": {
        "name": "locomotive",
        "tags": [
            "locomotive"
        ]
    },
    "1F683": {
        "name": "railway car",
        "tags": [
            "railway car"
        ]
    },
    "1F684": {
        "name": "high-speed train",
        "tags": [
            "high-speed train"
        ]
    },
    "1F685": {
        "name": "bullet train",
        "tags": [
            "bullet train"
        ]
    },
    "1F686": {
        "name": "train",
        "tags": [
            "train"
        ]
    },
    "1F687": {
        "name": "metro",
        "tags": [
            "metro"
        ]
    },
    "1F688": {
        "name": "light rail",
        "tags": [
            "light rail"
        ]
    },
    "1F689": {
        "name": "station",
        "tags": [
            "station"
        ]
    },
    "1F68A": {
        "name": "tram",
        "tags": [
            "tram"
        ]
    },
    "1F69D": {
        "name": "monorail",
        "tags": [
            "monorail"
        ]
    },
    "1F69E": {
        "name": "mountain railway",
        "tags": [
            "mountain railway"
        ]
    },
    "1F68B": {
        "name": "tram car",
        "tags": [
            "tram car"
        ]
    },
    "1F68C": {
        "name": "bus",
        "tags": [
            "bus"
        ]
    },
    "1F68D": {
        "name": "oncoming bus",
        "tags": [
            "oncoming bus"
        ]
    },
    "1F68E": {
        "name": "trolleybus",
        "tags": [
            "trolleybus"
        ]
    },
    "1F690": {
        "name": "minibus",
        "tags": [
            "minibus"
        ]
    },
    "1F691": {
        "name": "ambulance",
        "tags": [
            "ambulance"
        ]
    },
    "1F692": {
        "name": "fire engine",
        "tags": [
            "fire engine"
        ]
    },
    "1F693": {
        "name": "police car",
        "tags": [
            "police car"
        ]
    },
    "1F694": {
        "name": "oncoming police car",
        "tags": [
            "oncoming police car"
        ]
    },
    "1F695": {
        "name": "taxi",
        "tags": [
            "taxi"
        ]
    },
    "1F696": {
        "name": "oncoming taxi",
        "tags": [
            "oncoming taxi"
        ]
    },
    "1F697": {
        "name": "automobile",
        "tags": [
            "automobile"
        ]
    },
    "1F698": {
        "name": "oncoming automobile",
        "tags": [
            "oncoming automobile"
        ]
    },
    "1F699": {
        "name": "sport utility vehicle",
        "tags": [
            "sport utility vehicle"
        ]
    },
    "1F6FB": {
        "name": "pickup truck",
        "tags": [
            "pickup truck"
        ]
    },
    "1F69A": {
        "name": "delivery truck",
        "tags": [
            "delivery truck"
        ]
    },
    "1F69B": {
        "name": "articulated lorry",
        "tags": [
            "articulated lorry"
        ]
    },
    "1F69C": {
        "name": "tractor",
        "tags": [
            "tractor"
        ]
    },
    "1F3CE": {
        "name": "racing car",
        "tags": [
            "racing car"
        ]
    },
    "1F3CD": {
        "name": "motorcycle",
        "tags": [
            "motorcycle"
        ]
    },
    "1F6F5": {
        "name": "motor scooter",
        "tags": [
            "motor scooter"
        ]
    },
    "1F9BD": {
        "name": "manual wheelchair",
        "tags": [
            "manual wheelchair"
        ]
    },
    "1F9BC": {
        "name": "motorized wheelchair",
        "tags": [
            "motorized wheelchair"
        ]
    },
    "1F6FA": {
        "name": "auto rickshaw",
        "tags": [
            "auto rickshaw"
        ]
    },
    "1F6B2": {
        "name": "bicycle",
        "tags": [
            "bicycle"
        ]
    },
    "1F6F4": {
        "name": "kick scooter",
        "tags": [
            "kick scooter"
        ]
    },
    "1F6F9": {
        "name": "skateboard",
        "tags": [
            "skateboard"
        ]
    },
    "1F6FC": {
        "name": "roller skate",
        "tags": [
            "roller skate"
        ]
    },
    "1F68F": {
        "name": "bus stop",
        "tags": [
            "bus stop"
        ]
    },
    "1F6E3": {
        "name": "motorway",
        "tags": [
            "motorway"
        ]
    },
    "1F6E4": {
        "name": "railway track",
        "tags": [
            "railway track"
        ]
    },
    "1F6E2": {
        "name": "oil drum",
        "tags": [
            "oil drum"
        ]
    },
    "26FD": {
        "name": "fuel pump",
        "tags": [
            "fuel pump"
        ]
    },
    "1F6A8": {
        "name": "police car light",
        "tags": [
            "police car light"
        ]
    },
    "1F6A5": {
        "name": "horizontal traffic light",
        "tags": [
            "horizontal traffic light"
        ]
    },
    "1F6A6": {
        "name": "vertical traffic light",
        "tags": [
            "vertical traffic light"
        ]
    },
    "1F6D1": {
        "name": "stop sign",
        "tags": [
            "stop sign"
        ]
    },
    "1F6A7": {
        "name": "construction",
        "tags": [
            "construction"
        ]
    },
    "26F5": {
        "name": "sailboat",
        "tags": [
            "sailboat"
        ]
    },
    "1F6F6": {
        "name": "canoe",
        "tags": [
            "canoe"
        ]
    },
    "1F6A4": {
        "name": "speedboat",
        "tags": [
            "speedboat"
        ]
    },
    "1F6F3": {
        "name": "passenger ship",
        "tags": [
            "passenger ship"
        ]
    },
    "26F4": {
        "name": "ferry",
        "tags": [
            "ferry"
        ]
    },
    "1F6E5": {
        "name": "motor boat",
        "tags": [
            "motor boat"
        ]
    },
    "1F6A2": {
        "name": "ship",
        "tags": [
            "ship"
        ]
    },
    "1F6E9": {
        "name": "small airplane",
        "tags": [
            "small airplane"
        ]
    },
    "1F6EB": {
        "name": "airplane departure",
        "tags": [
            "airplane departure"
        ]
    },
    "1F6EC": {
        "name": "airplane arrival",
        "tags": [
            "airplane arrival"
        ]
    },
    "1FA82": {
        "name": "parachute",
        "tags": [
            "parachute"
        ]
    },
    "1F4BA": {
        "name": "seat",
        "tags": [
            "seat"
        ]
    },
    "1F681": {
        "name": "helicopter",
        "tags": [
            "helicopter"
        ]
    },
    "1F69F": {
        "name": "suspension railway",
        "tags": [
            "suspension railway"
        ]
    },
    "1F6A0": {
        "name": "mountain cableway",
        "tags": [
            "mountain cableway"
        ]
    },
    "1F6A1": {
        "name": "aerial tramway",
        "tags": [
            "aerial tramway"
        ]
    },
    "1F6F0": {
        "name": "satellite",
        "tags": [
            "satellite"
        ]
    },
    "1F680": {
        "name": "rocket",
        "tags": [
            "rocket"
        ]
    },
    "1F6F8": {
        "name": "flying saucer",
        "tags": [
            "flying saucer"
        ]
    },
    "1F6CE": {
        "name": "bellhop bell",
        "tags": [
            "bellhop bell"
        ]
    },
    "1F9F3": {
        "name": "luggage",
        "tags": [
            "luggage"
        ]
    },
    "231B": {
        "name": "hourglass done",
        "tags": [
            "hourglass done"
        ]
    },
    "23F3": {
        "name": "hourglass not done",
        "tags": [
            "hourglass not done"
        ]
    },
    "231A": {
        "name": "watch",
        "tags": [
            "watch"
        ]
    },
    "23F0": {
        "name": "alarm clock",
        "tags": [
            "alarm clock"
        ]
    },
    "23F1": {
        "name": "stopwatch",
        "tags": [
            "stopwatch"
        ]
    },
    "23F2": {
        "name": "timer clock",
        "tags": [
            "timer clock"
        ]
    },
    "1F570": {
        "name": "mantelpiece clock",
        "tags": [
            "mantelpiece clock"
        ]
    },
    "1F55B": {
        "name": "twelve o’clock",
        "tags": [
            "twelve o’clock"
        ]
    },
    "1F567": {
        "name": "twelve-thirty",
        "tags": [
            "twelve-thirty"
        ]
    },
    "1F550": {
        "name": "one o’clock",
        "tags": [
            "one o’clock"
        ]
    },
    "1F55C": {
        "name": "one-thirty",
        "tags": [
            "one-thirty"
        ]
    },
    "1F551": {
        "name": "two o’clock",
        "tags": [
            "two o’clock"
        ]
    },
    "1F55D": {
        "name": "two-thirty",
        "tags": [
            "two-thirty"
        ]
    },
    "1F552": {
        "name": "three o’clock",
        "tags": [
            "three o’clock"
        ]
    },
    "1F55E": {
        "name": "three-thirty",
        "tags": [
            "three-thirty"
        ]
    },
    "1F553": {
        "name": "four o’clock",
        "tags": [
            "four o’clock"
        ]
    },
    "1F55F": {
        "name": "four-thirty",
        "tags": [
            "four-thirty"
        ]
    },
    "1F554": {
        "name": "five o’clock",
        "tags": [
            "five o’clock"
        ]
    },
    "1F560": {
        "name": "five-thirty",
        "tags": [
            "five-thirty"
        ]
    },
    "1F555": {
        "name": "six o’clock",
        "tags": [
            "six o’clock"
        ]
    },
    "1F561": {
        "name": "six-thirty",
        "tags": [
            "six-thirty"
        ]
    },
    "1F556": {
        "name": "seven o’clock",
        "tags": [
            "seven o’clock"
        ]
    },
    "1F562": {
        "name": "seven-thirty",
        "tags": [
            "seven-thirty"
        ]
    },
    "1F557": {
        "name": "eight o’clock",
        "tags": [
            "eight o’clock"
        ]
    },
    "1F563": {
        "name": "eight-thirty",
        "tags": [
            "eight-thirty"
        ]
    },
    "1F558": {
        "name": "nine o’clock",
        "tags": [
            "nine o’clock"
        ]
    },
    "1F564": {
        "name": "nine-thirty",
        "tags": [
            "nine-thirty"
        ]
    },
    "1F559": {
        "name": "ten o’clock",
        "tags": [
            "ten o’clock"
        ]
    },
    "1F565": {
        "name": "ten-thirty",
        "tags": [
            "ten-thirty"
        ]
    },
    "1F55A": {
        "name": "eleven o’clock",
        "tags": [
            "eleven o’clock"
        ]
    },
    "1F566": {
        "name": "eleven-thirty",
        "tags": [
            "eleven-thirty"
        ]
    },
    "1F311": {
        "name": "new moon",
        "tags": [
            "new moon"
        ]
    },
    "1F312": {
        "name": "waxing crescent moon",
        "tags": [
            "waxing crescent moon"
        ]
    },
    "1F313": {
        "name": "first quarter moon",
        "tags": [
            "first quarter moon"
        ]
    },
    "1F314": {
        "name": "waxing gibbous moon",
        "tags": [
            "waxing gibbous moon"
        ]
    },
    "1F315": {
        "name": "full moon",
        "tags": [
            "full moon"
        ]
    },
    "1F316": {
        "name": "waning gibbous moon",
        "tags": [
            "waning gibbous moon"
        ]
    },
    "1F317": {
        "name": "last quarter moon",
        "tags": [
            "last quarter moon"
        ]
    },
    "1F318": {
        "name": "waning crescent moon",
        "tags": [
            "waning crescent moon"
        ]
    },
    "1F319": {
        "name": "crescent moon",
        "tags": [
            "crescent moon"
        ]
    },
    "1F31A": {
        "name": "new moon face",
        "tags": [
            "new moon face"
        ]
    },
    "1F31B": {
        "name": "first quarter moon face",
        "tags": [
            "first quarter moon face"
        ]
    },
    "1F31C": {
        "name": "last quarter moon face",
        "tags": [
            "last quarter moon face"
        ]
    },
    "1F321": {
        "name": "thermometer",
        "tags": [
            "thermometer"
        ]
    },
    "1F31D": {
        "name": "full moon face",
        "tags": [
            "full moon face"
        ]
    },
    "1F31E": {
        "name": "sun with face",
        "tags": [
            "sun with face"
        ]
    },
    "1FA90": {
        "name": "ringed planet",
        "tags": [
            "ringed planet"
        ]
    },
    "2B50": {
        "name": "star",
        "tags": [
            "star"
        ]
    },
    "1F31F": {
        "name": "glowing star",
        "tags": [
            "glowing star"
        ]
    },
    "1F320": {
        "name": "shooting star",
        "tags": [
            "shooting star"
        ]
    },
    "1F30C": {
        "name": "milky way",
        "tags": [
            "milky way"
        ]
    },
    "26C5": {
        "name": "sun behind cloud",
        "tags": [
            "sun behind cloud"
        ]
    },
    "26C8": {
        "name": "cloud with lightning and rain",
        "tags": [
            "cloud with lightning and rain"
        ]
    },
    "1F324": {
        "name": "sun behind small cloud",
        "tags": [
            "sun behind small cloud"
        ]
    },
    "1F325": {
        "name": "sun behind large cloud",
        "tags": [
            "sun behind large cloud"
        ]
    },
    "1F326": {
        "name": "sun behind rain cloud",
        "tags": [
            "sun behind rain cloud"
        ]
    },
    "1F327": {
        "name": "cloud with rain",
        "tags": [
            "cloud with rain"
        ]
    },
    "1F328": {
        "name": "cloud with snow",
        "tags": [
            "cloud with snow"
        ]
    },
    "1F329": {
        "name": "cloud with lightning",
        "tags": [
            "cloud with lightning"
        ]
    },
    "1F32A": {
        "name": "tornado",
        "tags": [
            "tornado"
        ]
    },
    "1F32B": {
        "name": "fog",
        "tags": [
            "fog"
        ]
    },
    "1F32C": {
        "name": "wind face",
        "tags": [
            "wind face"
        ]
    },
    "1F300": {
        "name": "cyclone",
        "tags": [
            "cyclone"
        ]
    },
    "1F308": {
        "name": "rainbow",
        "tags": [
            "rainbow"
        ]
    },
    "1F302": {
        "name": "closed umbrella",
        "tags": [
            "closed umbrella"
        ]
    },
    "26F1": {
        "name": "umbrella on ground",
        "tags": [
            "umbrella on ground"
        ]
    },
    "26A1": {
        "name": "high voltage",
        "tags": [
            "high voltage"
        ]
    },
    "26C4": {
        "name": "snowman without snow",
        "tags": [
            "snowman without snow"
        ]
    },
    "1F525": {
        "name": "fire",
        "tags": [
            "fire"
        ]
    },
    "1F4A7": {
        "name": "droplet",
        "tags": [
            "droplet"
        ]
    },
    "1F30A": {
        "name": "water wave",
        "tags": [
            "water wave"
        ]
    },
    "1F383": {
        "name": "jack-o-lantern",
        "tags": [
            "jack-o-lantern"
        ]
    },
    "1F384": {
        "name": "Christmas tree",
        "tags": [
            "Christmas tree"
        ]
    },
    "1F386": {
        "name": "fireworks",
        "tags": [
            "fireworks"
        ]
    },
    "1F387": {
        "name": "sparkler",
        "tags": [
            "sparkler"
        ]
    },
    "1F9E8": {
        "name": "firecracker",
        "tags": [
            "firecracker"
        ]
    },
    "1F388": {
        "name": "balloon",
        "tags": [
            "balloon"
        ]
    },
    "1F389": {
        "name": "party popper",
        "tags": [
            "party popper"
        ]
    },
    "1F38A": {
        "name": "confetti ball",
        "tags": [
            "confetti ball"
        ]
    },
    "1F38B": {
        "name": "tanabata tree",
        "tags": [
            "tanabata tree"
        ]
    },
    "1F38D": {
        "name": "pine decoration",
        "tags": [
            "pine decoration"
        ]
    },
    "1F38E": {
        "name": "Japanese dolls",
        "tags": [
            "Japanese dolls"
        ]
    },
    "1F38F": {
        "name": "carp streamer",
        "tags": [
            "carp streamer"
        ]
    },
    "1F390": {
        "name": "wind chime",
        "tags": [
            "wind chime"
        ]
    },
    "1F391": {
        "name": "moon viewing ceremony",
        "tags": [
            "moon viewing ceremony"
        ]
    },
    "1F9E7": {
        "name": "red envelope",
        "tags": [
            "red envelope"
        ]
    },
    "1F380": {
        "name": "ribbon",
        "tags": [
            "ribbon"
        ]
    },
    "1F381": {
        "name": "wrapped gift",
        "tags": [
            "wrapped gift"
        ]
    },
    "1F397": {
        "name": "reminder ribbon",
        "tags": [
            "reminder ribbon"
        ]
    },
    "1F39F": {
        "name": "admission tickets",
        "tags": [
            "admission tickets"
        ]
    },
    "1F3AB": {
        "name": "ticket",
        "tags": [
            "ticket"
        ]
    },
    "1F396": {
        "name": "military medal",
        "tags": [
            "military medal"
        ]
    },
    "1F3C6": {
        "name": "trophy",
        "tags": [
            "trophy"
        ]
    },
    "1F3C5": {
        "name": "sports medal",
        "tags": [
            "sports medal"
        ]
    },
    "1F947": {
        "name": "1st place medal",
        "tags": [
            "1st place medal"
        ]
    },
    "1F948": {
        "name": "2nd place medal",
        "tags": [
            "2nd place medal"
        ]
    },
    "1F949": {
        "name": "3rd place medal",
        "tags": [
            "3rd place medal"
        ]
    },
    "26BD": {
        "name": "soccer ball",
        "tags": [
            "soccer ball"
        ]
    },
    "26BE": {
        "name": "baseball",
        "tags": [
            "baseball"
        ]
    },
    "1F94E": {
        "name": "softball",
        "tags": [
            "softball"
        ]
    },
    "1F3C0": {
        "name": "basketball",
        "tags": [
            "basketball"
        ]
    },
    "1F3D0": {
        "name": "volleyball",
        "tags": [
            "volleyball"
        ]
    },
    "1F3C8": {
        "name": "american football",
        "tags": [
            "american football"
        ]
    },
    "1F3C9": {
        "name": "rugby football",
        "tags": [
            "rugby football"
        ]
    },
    "1F3BE": {
        "name": "tennis",
        "tags": [
            "tennis"
        ]
    },
    "1F94F": {
        "name": "flying disc",
        "tags": [
            "flying disc"
        ]
    },
    "1F3B3": {
        "name": "bowling",
        "tags": [
            "bowling"
        ]
    },
    "1F3CF": {
        "name": "cricket game",
        "tags": [
            "cricket game"
        ]
    },
    "1F3D1": {
        "name": "field hockey",
        "tags": [
            "field hockey"
        ]
    },
    "1F3D2": {
        "name": "ice hockey",
        "tags": [
            "ice hockey"
        ]
    },
    "1F94D": {
        "name": "lacrosse",
        "tags": [
            "lacrosse"
        ]
    },
    "1F3D3": {
        "name": "ping pong",
        "tags": [
            "ping pong"
        ]
    },
    "1F3F8": {
        "name": "badminton",
        "tags": [
            "badminton"
        ]
    },
    "1F94A": {
        "name": "boxing glove",
        "tags": [
            "boxing glove"
        ]
    },
    "1F94B": {
        "name": "martial arts uniform",
        "tags": [
            "martial arts uniform"
        ]
    },
    "1F945": {
        "name": "goal net",
        "tags": [
            "goal net"
        ]
    },
    "26F3": {
        "name": "flag in hole",
        "tags": [
            "flag in hole"
        ]
    },
    "26F8": {
        "name": "ice skate",
        "tags": [
            "ice skate"
        ]
    },
    "1F3A3": {
        "name": "fishing pole",
        "tags": [
            "fishing pole"
        ]
    },
    "1F93F": {
        "name": "diving mask",
        "tags": [
            "diving mask"
        ]
    },
    "1F3BD": {
        "name": "running shirt",
        "tags": [
            "running shirt"
        ]
    },
    "1F3BF": {
        "name": "skis",
        "tags": [
            "skis"
        ]
    },
    "1F6F7": {
        "name": "sled",
        "tags": [
            "sled"
        ]
    },
    "1F94C": {
        "name": "curling stone",
        "tags": [
            "curling stone"
        ]
    },
    "1F3AF": {
        "name": "bullseye",
        "tags": [
            "bullseye"
        ]
    },
    "1FA80": {
        "name": "yo-yo",
        "tags": [
            "yo-yo"
        ]
    },
    "1FA81": {
        "name": "kite",
        "tags": [
            "kite"
        ]
    },
    "1F3B1": {
        "name": "pool 8 ball",
        "tags": [
            "pool 8 ball"
        ]
    },
    "1F52E": {
        "name": "crystal ball",
        "tags": [
            "crystal ball"
        ]
    },
    "1FA84": {
        "name": "magic wand",
        "tags": [
            "magic wand"
        ]
    },
    "1F9FF": {
        "name": "nazar amulet",
        "tags": [
            "nazar amulet"
        ]
    },
    "1F3AE": {
        "name": "video game",
        "tags": [
            "video game"
        ]
    },
    "1F579": {
        "name": "joystick",
        "tags": [
            "joystick"
        ]
    },
    "1F3B0": {
        "name": "slot machine",
        "tags": [
            "slot machine"
        ]
    },
    "1F3B2": {
        "name": "game die",
        "tags": [
            "game die"
        ]
    },
    "1F9E9": {
        "name": "puzzle piece",
        "tags": [
            "puzzle piece"
        ]
    },
    "1F9F8": {
        "name": "teddy bear",
        "tags": [
            "teddy bear"
        ]
    },
    "1FA85": {
        "name": "piñata",
        "tags": [
            "piñata"
        ]
    },
    "1FA86": {
        "name": "nesting dolls",
        "tags": [
            "nesting dolls"
        ]
    },
    "265F": {
        "name": "chess pawn",
        "tags": [
            "chess pawn"
        ]
    },
    "1F0CF": {
        "name": "joker",
        "tags": [
            "joker"
        ]
    },
    "1F004": {
        "name": "mahjong red dragon",
        "tags": [
            "mahjong red dragon"
        ]
    },
    "1F3B4": {
        "name": "flower playing cards",
        "tags": [
            "flower playing cards"
        ]
    },
    "1F3AD": {
        "name": "performing arts",
        "tags": [
            "performing arts"
        ]
    },
    "1F5BC": {
        "name": "framed picture",
        "tags": [
            "framed picture"
        ]
    },
    "1F3A8": {
        "name": "artist palette",
        "tags": [
            "artist palette"
        ]
    },
    "1F9F5": {
        "name": "thread",
        "tags": [
            "thread"
        ]
    },
    "1FAA1": {
        "name": "sewing needle",
        "tags": [
            "sewing needle"
        ]
    },
    "1F9F6": {
        "name": "yarn",
        "tags": [
            "yarn"
        ]
    },
    "1FAA2": {
        "name": "knot",
        "tags": [
            "knot"
        ]
    },
    "1F453": {
        "name": "glasses",
        "tags": [
            "glasses"
        ]
    },
    "1F576": {
        "name": "sunglasses",
        "tags": [
            "sunglasses"
        ]
    },
    "1F97D": {
        "name": "goggles",
        "tags": [
            "goggles"
        ]
    },
    "1F97C": {
        "name": "lab coat",
        "tags": [
            "lab coat"
        ]
    },
    "1F9BA": {
        "name": "safety vest",
        "tags": [
            "safety vest"
        ]
    },
    "1F454": {
        "name": "necktie",
        "tags": [
            "necktie"
        ]
    },
    "1F455": {
        "name": "t-shirt",
        "tags": [
            "t-shirt"
        ]
    },
    "1F456": {
        "name": "jeans",
        "tags": [
            "jeans"
        ]
    },
    "1F9E3": {
        "name": "scarf",
        "tags": [
            "scarf"
        ]
    },
    "1F9E4": {
        "name": "gloves",
        "tags": [
            "gloves"
        ]
    },
    "1F9E5": {
        "name": "coat",
        "tags": [
            "coat"
        ]
    },
    "1F9E6": {
        "name": "socks",
        "tags": [
            "socks"
        ]
    },
    "1F457": {
        "name": "dress",
        "tags": [
            "dress"
        ]
    },
    "1F458": {
        "name": "kimono",
        "tags": [
            "kimono"
        ]
    },
    "1F97B": {
        "name": "sari",
        "tags": [
            "sari"
        ]
    },
    "1FA71": {
        "name": "one-piece swimsuit",
        "tags": [
            "one-piece swimsuit"
        ]
    },
    "1FA72": {
        "name": "briefs",
        "tags": [
            "briefs"
        ]
    },
    "1FA73": {
        "name": "shorts",
        "tags": [
            "shorts"
        ]
    },
    "1F459": {
        "name": "bikini",
        "tags": [
            "bikini"
        ]
    },
    "1F45A": {
        "name": "woman’s clothes",
        "tags": [
            "woman’s clothes"
        ]
    },
    "1F45B": {
        "name": "purse",
        "tags": [
            "purse"
        ]
    },
    "1F45C": {
        "name": "handbag",
        "tags": [
            "handbag"
        ]
    },
    "1F45D": {
        "name": "clutch bag",
        "tags": [
            "clutch bag"
        ]
    },
    "1F6CD": {
        "name": "shopping bags",
        "tags": [
            "shopping bags"
        ]
    },
    "1F392": {
        "name": "backpack",
        "tags": [
            "backpack"
        ]
    },
    "1FA74": {
        "name": "thong sandal",
        "tags": [
            "thong sandal"
        ]
    },
    "1F45E": {
        "name": "man’s shoe",
        "tags": [
            "man’s shoe"
        ]
    },
    "1F45F": {
        "name": "running shoe",
        "tags": [
            "running shoe"
        ]
    },
    "1F97E": {
        "name": "hiking boot",
        "tags": [
            "hiking boot"
        ]
    },
    "1F97F": {
        "name": "flat shoe",
        "tags": [
            "flat shoe"
        ]
    },
    "1F460": {
        "name": "high-heeled shoe",
        "tags": [
            "high-heeled shoe"
        ]
    },
    "1F461": {
        "name": "woman’s sandal",
        "tags": [
            "woman’s sandal"
        ]
    },
    "1FA70": {
        "name": "ballet shoes",
        "tags": [
            "ballet shoes"
        ]
    },
    "1F462": {
        "name": "woman’s boot",
        "tags": [
            "woman’s boot"
        ]
    },
    "1F451": {
        "name": "crown",
        "tags": [
            "crown"
        ]
    },
    "1F452": {
        "name": "woman’s hat",
        "tags": [
            "woman’s hat"
        ]
    },
    "1F3A9": {
        "name": "top hat",
        "tags": [
            "top hat"
        ]
    },
    "1F393": {
        "name": "graduation cap",
        "tags": [
            "graduation cap"
        ]
    },
    "1F9E2": {
        "name": "billed cap",
        "tags": [
            "billed cap"
        ]
    },
    "1FA96": {
        "name": "military helmet",
        "tags": [
            "military helmet"
        ]
    },
    "26D1": {
        "name": "rescue worker’s helmet",
        "tags": [
            "rescue worker’s helmet"
        ]
    },
    "1F4FF": {
        "name": "prayer beads",
        "tags": [
            "prayer beads"
        ]
    },
    "1F484": {
        "name": "lipstick",
        "tags": [
            "lipstick"
        ]
    },
    "1F48D": {
        "name": "ring",
        "tags": [
            "ring"
        ]
    },
    "1F48E": {
        "name": "gem stone",
        "tags": [
            "gem stone"
        ]
    },
    "1F507": {
        "name": "muted speaker",
        "tags": [
            "muted speaker"
        ]
    },
    "1F508": {
        "name": "speaker low volume",
        "tags": [
            "speaker low volume"
        ]
    },
    "1F509": {
        "name": "speaker medium volume",
        "tags": [
            "speaker medium volume"
        ]
    },
    "1F50A": {
        "name": "speaker high volume",
        "tags": [
            "speaker high volume"
        ]
    },
    "1F4E2": {
        "name": "loudspeaker",
        "tags": [
            "loudspeaker"
        ]
    },
    "1F4E3": {
        "name": "megaphone",
        "tags": [
            "megaphone"
        ]
    },
    "1F4EF": {
        "name": "postal horn",
        "tags": [
            "postal horn"
        ]
    },
    "1F514": {
        "name": "bell",
        "tags": [
            "bell"
        ]
    },
    "1F515": {
        "name": "bell with slash",
        "tags": [
            "bell with slash"
        ]
    },
    "1F3BC": {
        "name": "musical score",
        "tags": [
            "musical score"
        ]
    },
    "1F3B5": {
        "name": "musical note",
        "tags": [
            "musical note"
        ]
    },
    "1F3B6": {
        "name": "musical notes",
        "tags": [
            "musical notes"
        ]
    },
    "1F399": {
        "name": "studio microphone",
        "tags": [
            "studio microphone"
        ]
    },
    "1F39A": {
        "name": "level slider",
        "tags": [
            "level slider"
        ]
    },
    "1F39B": {
        "name": "control knobs",
        "tags": [
            "control knobs"
        ]
    },
    "1F3A4": {
        "name": "microphone",
        "tags": [
            "microphone"
        ]
    },
    "1F3A7": {
        "name": "headphone",
        "tags": [
            "headphone"
        ]
    },
    "1F4FB": {
        "name": "radio",
        "tags": [
            "radio"
        ]
    },
    "1F3B7": {
        "name": "saxophone",
        "tags": [
            "saxophone"
        ]
    },
    "1FA97": {
        "name": "accordion",
        "tags": [
            "accordion"
        ]
    },
    "1F3B8": {
        "name": "guitar",
        "tags": [
            "guitar"
        ]
    },
    "1F3B9": {
        "name": "musical keyboard",
        "tags": [
            "musical keyboard"
        ]
    },
    "1F3BA": {
        "name": "trumpet",
        "tags": [
            "trumpet"
        ]
    },
    "1F3BB": {
        "name": "violin",
        "tags": [
            "violin"
        ]
    },
    "1FA95": {
        "name": "banjo",
        "tags": [
            "banjo"
        ]
    },
    "1F941": {
        "name": "drum",
        "tags": [
            "drum"
        ]
    },
    "1FA98": {
        "name": "long drum",
        "tags": [
            "long drum"
        ]
    },
    "1F4F1": {
        "name": "mobile phone",
        "tags": [
            "mobile phone"
        ]
    },
    "1F4F2": {
        "name": "mobile phone with arrow",
        "tags": [
            "mobile phone with arrow"
        ]
    },
    "260E": {
        "name": "telephone",
        "tags": [
            "telephone"
        ]
    },
    "1F4DE": {
        "name": "telephone receiver",
        "tags": [
            "telephone receiver"
        ]
    },
    "1F4DF": {
        "name": "pager",
        "tags": [
            "pager"
        ]
    },
    "1F4E0": {
        "name": "fax machine",
        "tags": [
            "fax machine"
        ]
    },
    "1F50B": {
        "name": "battery",
        "tags": [
            "battery"
        ]
    },
    "1F50C": {
        "name": "electric plug",
        "tags": [
            "electric plug"
        ]
    },
    "1F4BB": {
        "name": "laptop",
        "tags": [
            "laptop"
        ]
    },
    "1F5A5": {
        "name": "desktop computer",
        "tags": [
            "desktop computer"
        ]
    },
    "1F5A8": {
        "name": "printer",
        "tags": [
            "printer"
        ]
    },
    "1F5B1": {
        "name": "computer mouse",
        "tags": [
            "computer mouse"
        ]
    },
    "1F5B2": {
        "name": "trackball",
        "tags": [
            "trackball"
        ]
    },
    "1F4BD": {
        "name": "computer disk",
        "tags": [
            "computer disk"
        ]
    },
    "1F4BE": {
        "name": "floppy disk",
        "tags": [
            "floppy disk"
        ]
    },
    "1F4BF": {
        "name": "optical disk",
        "tags": [
            "optical disk"
        ]
    },
    "1F4C0": {
        "name": "dvd",
        "tags": [
            "dvd"
        ]
    },
    "1F9EE": {
        "name": "abacus",
        "tags": [
            "abacus"
        ]
    },
    "1F3A5": {
        "name": "movie camera",
        "tags": [
            "movie camera"
        ]
    },
    "1F39E": {
        "name": "film frames",
        "tags": [
            "film frames"
        ]
    },
    "1F4FD": {
        "name": "film projector",
        "tags": [
            "film projector"
        ]
    },
    "1F3AC": {
        "name": "clapper board",
        "tags": [
            "clapper board"
        ]
    },
    "1F4FA": {
        "name": "television",
        "tags": [
            "television"
        ]
    },
    "1F4F7": {
        "name": "camera",
        "tags": [
            "camera"
        ]
    },
    "1F4F8": {
        "name": "camera with flash",
        "tags": [
            "camera with flash"
        ]
    },
    "1F4F9": {
        "name": "video camera",
        "tags": [
            "video camera"
        ]
    },
    "1F4FC": {
        "name": "videocassette",
        "tags": [
            "videocassette"
        ]
    },
    "1F50D": {
        "name": "magnifying glass tilted left",
        "tags": [
            "magnifying glass tilted left"
        ]
    },
    "1F50E": {
        "name": "magnifying glass tilted right",
        "tags": [
            "magnifying glass tilted right"
        ]
    },
    "1F56F": {
        "name": "candle",
        "tags": [
            "candle"
        ]
    },
    "1F4A1": {
        "name": "light bulb",
        "tags": [
            "light bulb"
        ]
    },
    "1F526": {
        "name": "flashlight",
        "tags": [
            "flashlight"
        ]
    },
    "1F3EE": {
        "name": "red paper lantern",
        "tags": [
            "red paper lantern"
        ]
    },
    "1FA94": {
        "name": "diya lamp",
        "tags": [
            "diya lamp"
        ]
    },
    "1F4D4": {
        "name": "notebook with decorative cover",
        "tags": [
            "notebook with decorative cover"
        ]
    },
    "1F4D5": {
        "name": "closed book",
        "tags": [
            "closed book"
        ]
    },
    "1F4D6": {
        "name": "open book",
        "tags": [
            "open book"
        ]
    },
    "1F4D7": {
        "name": "green book",
        "tags": [
            "green book"
        ]
    },
    "1F4D8": {
        "name": "blue book",
        "tags": [
            "blue book"
        ]
    },
    "1F4D9": {
        "name": "orange book",
        "tags": [
            "orange book"
        ]
    },
    "1F4DA": {
        "name": "books",
        "tags": [
            "books"
        ]
    },
    "1F4D3": {
        "name": "notebook",
        "tags": [
            "notebook"
        ]
    },
    "1F4D2": {
        "name": "ledger",
        "tags": [
            "ledger"
        ]
    },
    "1F4C3": {
        "name": "page with curl",
        "tags": [
            "page with curl"
        ]
    },
    "1F4DC": {
        "name": "scroll",
        "tags": [
            "scroll"
        ]
    },
    "1F4C4": {
        "name": "page facing up",
        "tags": [
            "page facing up"
        ]
    },
    "1F4F0": {
        "name": "newspaper",
        "tags": [
            "newspaper"
        ]
    },
    "1F5DE": {
        "name": "rolled-up newspaper",
        "tags": [
            "rolled-up newspaper"
        ]
    },
    "1F4D1": {
        "name": "bookmark tabs",
        "tags": [
            "bookmark tabs"
        ]
    },
    "1F516": {
        "name": "bookmark",
        "tags": [
            "bookmark"
        ]
    },
    "1F3F7": {
        "name": "label",
        "tags": [
            "label"
        ]
    },
    "1F4B0": {
        "name": "money bag",
        "tags": [
            "money bag"
        ]
    },
    "1FA99": {
        "name": "coin",
        "tags": [
            "coin"
        ]
    },
    "1F4B4": {
        "name": "yen banknote",
        "tags": [
            "yen banknote"
        ]
    },
    "1F4B5": {
        "name": "dollar banknote",
        "tags": [
            "dollar banknote"
        ]
    },
    "1F4B6": {
        "name": "euro banknote",
        "tags": [
            "euro banknote"
        ]
    },
    "1F4B7": {
        "name": "pound banknote",
        "tags": [
            "pound banknote"
        ]
    },
    "1F4B8": {
        "name": "money with wings",
        "tags": [
            "money with wings"
        ]
    },
    "1F4B3": {
        "name": "credit card",
        "tags": [
            "credit card"
        ]
    },
    "1F9FE": {
        "name": "receipt",
        "tags": [
            "receipt"
        ]
    },
    "1F4B9": {
        "name": "chart increasing with yen",
        "tags": [
            "chart increasing with yen"
        ]
    },
    "1F4E7": {
        "name": "e-mail",
        "tags": [
            "e-mail"
        ]
    },
    "1F4E8": {
        "name": "incoming envelope",
        "tags": [
            "incoming envelope"
        ]
    },
    "1F4E9": {
        "name": "envelope with arrow",
        "tags": [
            "envelope with arrow"
        ]
    },
    "1F4E4": {
        "name": "outbox tray",
        "tags": [
            "outbox tray"
        ]
    },
    "1F4E5": {
        "name": "inbox tray",
        "tags": [
            "inbox tray"
        ]
    },
    "1F4E6": {
        "name": "package",
        "tags": [
            "package"
        ]
    },
    "1F4EB": {
        "name": "closed mailbox with raised flag",
        "tags": [
            "closed mailbox with raised flag"
        ]
    },
    "1F4EA": {
        "name": "closed mailbox with lowered flag",
        "tags": [
            "closed mailbox with lowered flag"
        ]
    },
    "1F4EC": {
        "name": "open mailbox with raised flag",
        "tags": [
            "open mailbox with raised flag"
        ]
    },
    "1F4ED": {
        "name": "open mailbox with lowered flag",
        "tags": [
            "open mailbox with lowered flag"
        ]
    },
    "1F4EE": {
        "name": "postbox",
        "tags": [
            "postbox"
        ]
    },
    "1F5F3": {
        "name": "ballot box with ballot",
        "tags": [
            "ballot box with ballot"
        ]
    },
    "270F": {
        "name": "pencil",
        "tags": [
            "pencil"
        ]
    },
    "1F58B": {
        "name": "fountain pen",
        "tags": [
            "fountain pen"
        ]
    },
    "1F58A": {
        "name": "pen",
        "tags": [
            "pen"
        ]
    },
    "1F58C": {
        "name": "paintbrush",
        "tags": [
            "paintbrush"
        ]
    },
    "1F58D": {
        "name": "crayon",
        "tags": [
            "crayon"
        ]
    },
    "1F4DD": {
        "name": "memo",
        "tags": [
            "memo"
        ]
    },
    "1F4BC": {
        "name": "briefcase",
        "tags": [
            "briefcase"
        ]
    },
    "1F4C1": {
        "name": "file folder",
        "tags": [
            "file folder"
        ]
    },
    "1F4C2": {
        "name": "open file folder",
        "tags": [
            "open file folder"
        ]
    },
    "1F5C2": {
        "name": "card index dividers",
        "tags": [
            "card index dividers"
        ]
    },
    "1F4C5": {
        "name": "calendar",
        "tags": [
            "calendar"
        ]
    },
    "1F4C6": {
        "name": "tear-off calendar",
        "tags": [
            "tear-off calendar"
        ]
    },
    "1F5D2": {
        "name": "spiral notepad",
        "tags": [
            "spiral notepad"
        ]
    },
    "1F5D3": {
        "name": "spiral calendar",
        "tags": [
            "spiral calendar"
        ]
    },
    "1F4C7": {
        "name": "card index",
        "tags": [
            "card index"
        ]
    },
    "1F4C8": {
        "name": "chart increasing",
        "tags": [
            "chart increasing"
        ]
    },
    "1F4C9": {
        "name": "chart decreasing",
        "tags": [
            "chart decreasing"
        ]
    },
    "1F4CA": {
        "name": "bar chart",
        "tags": [
            "bar chart"
        ]
    },
    "1F4CB": {
        "name": "clipboard",
        "tags": [
            "clipboard"
        ]
    },
    "1F4CC": {
        "name": "pushpin",
        "tags": [
            "pushpin"
        ]
    },
    "1F4CD": {
        "name": "round pushpin",
        "tags": [
            "round pushpin"
        ]
    },
    "1F4CE": {
        "name": "paperclip",
        "tags": [
            "paperclip"
        ]
    },
    "1F587": {
        "name": "linked paperclips",
        "tags": [
            "linked paperclips"
        ]
    },
    "1F4CF": {
        "name": "straight ruler",
        "tags": [
            "straight ruler"
        ]
    },
    "1F4D0": {
        "name": "triangular ruler",
        "tags": [
            "triangular ruler"
        ]
    },
    "1F5C3": {
        "name": "card file box",
        "tags": [
            "card file box"
        ]
    },
    "1F5C4": {
        "name": "file cabinet",
        "tags": [
            "file cabinet"
        ]
    },
    "1F5D1": {
        "name": "wastebasket",
        "tags": [
            "wastebasket"
        ]
    },
    "1F512": {
        "name": "locked",
        "tags": [
            "locked"
        ]
    },
    "1F513": {
        "name": "unlocked",
        "tags": [
            "unlocked"
        ]
    },
    "1F50F": {
        "name": "locked with pen",
        "tags": [
            "locked with pen"
        ]
    },
    "1F510": {
        "name": "locked with key",
        "tags": [
            "locked with key"
        ]
    },
    "1F511": {
        "name": "key",
        "tags": [
            "key"
        ]
    },
    "1F5DD": {
        "name": "old key",
        "tags": [
            "old key"
        ]
    },
    "1F528": {
        "name": "hammer",
        "tags": [
            "hammer"
        ]
    },
    "1FA93": {
        "name": "axe",
        "tags": [
            "axe"
        ]
    },
    "26CF": {
        "name": "pick",
        "tags": [
            "pick"
        ]
    },
    "1F6E0": {
        "name": "hammer and wrench",
        "tags": [
            "hammer and wrench"
        ]
    },
    "1F5E1": {
        "name": "dagger",
        "tags": [
            "dagger"
        ]
    },
    "1F52B": {
        "name": "water pistol",
        "tags": [
            "water pistol"
        ]
    },
    "1FA83": {
        "name": "boomerang",
        "tags": [
            "boomerang"
        ]
    },
    "1F3F9": {
        "name": "bow and arrow",
        "tags": [
            "bow and arrow"
        ]
    },
    "1F6E1": {
        "name": "shield",
        "tags": [
            "shield"
        ]
    },
    "1FA9A": {
        "name": "carpentry saw",
        "tags": [
            "carpentry saw"
        ]
    },
    "1F527": {
        "name": "wrench",
        "tags": [
            "wrench"
        ]
    },
    "1FA9B": {
        "name": "screwdriver",
        "tags": [
            "screwdriver"
        ]
    },
    "1F529": {
        "name": "nut and bolt",
        "tags": [
            "nut and bolt"
        ]
    },
    "1F5DC": {
        "name": "clamp",
        "tags": [
            "clamp"
        ]
    },
    "1F9AF": {
        "name": "white cane",
        "tags": [
            "white cane"
        ]
    },
    "1F517": {
        "name": "link",
        "tags": [
            "link"
        ]
    },
    "26D3": {
        "name": "chains",
        "tags": [
            "chains"
        ]
    },
    "1FA9D": {
        "name": "hook",
        "tags": [
            "hook"
        ]
    },
    "1F9F0": {
        "name": "toolbox",
        "tags": [
            "toolbox"
        ]
    },
    "1F9F2": {
        "name": "magnet",
        "tags": [
            "magnet"
        ]
    },
    "1FA9C": {
        "name": "ladder",
        "tags": [
            "ladder"
        ]
    },
    "1F9EA": {
        "name": "test tube",
        "tags": [
            "test tube"
        ]
    },
    "1F9EB": {
        "name": "petri dish",
        "tags": [
            "petri dish"
        ]
    },
    "1F9EC": {
        "name": "dna",
        "tags": [
            "dna"
        ]
    },
    "1F52C": {
        "name": "microscope",
        "tags": [
            "microscope"
        ]
    },
    "1F52D": {
        "name": "telescope",
        "tags": [
            "telescope"
        ]
    },
    "1F4E1": {
        "name": "satellite antenna",
        "tags": [
            "satellite antenna"
        ]
    },
    "1F489": {
        "name": "syringe",
        "tags": [
            "syringe"
        ]
    },
    "1FA78": {
        "name": "drop of blood",
        "tags": [
            "drop of blood"
        ]
    },
    "1F48A": {
        "name": "pill",
        "tags": [
            "pill"
        ]
    },
    "1FA79": {
        "name": "adhesive bandage",
        "tags": [
            "adhesive bandage"
        ]
    },
    "1FA7A": {
        "name": "stethoscope",
        "tags": [
            "stethoscope"
        ]
    },
    "1F6AA": {
        "name": "door",
        "tags": [
            "door"
        ]
    },
    "1F6D7": {
        "name": "elevator",
        "tags": [
            "elevator"
        ]
    },
    "1FA9E": {
        "name": "mirror",
        "tags": [
            "mirror"
        ]
    },
    "1FA9F": {
        "name": "window",
        "tags": [
            "window"
        ]
    },
    "1F6CF": {
        "name": "bed",
        "tags": [
            "bed"
        ]
    },
    "1F6CB": {
        "name": "couch and lamp",
        "tags": [
            "couch and lamp"
        ]
    },
    "1FA91": {
        "name": "chair",
        "tags": [
            "chair"
        ]
    },
    "1F6BD": {
        "name": "toilet",
        "tags": [
            "toilet"
        ]
    },
    "1FAA0": {
        "name": "plunger",
        "tags": [
            "plunger"
        ]
    },
    "1F6BF": {
        "name": "shower",
        "tags": [
            "shower"
        ]
    },
    "1F6C1": {
        "name": "bathtub",
        "tags": [
            "bathtub"
        ]
    },
    "1FAA4": {
        "name": "mouse trap",
        "tags": [
            "mouse trap"
        ]
    },
    "1FA92": {
        "name": "razor",
        "tags": [
            "razor"
        ]
    },
    "1F9F4": {
        "name": "lotion bottle",
        "tags": [
            "lotion bottle"
        ]
    },
    "1F9F7": {
        "name": "safety pin",
        "tags": [
            "safety pin"
        ]
    },
    "1F9F9": {
        "name": "broom",
        "tags": [
            "broom"
        ]
    },
    "1F9FA": {
        "name": "basket",
        "tags": [
            "basket"
        ]
    },
    "1F9FB": {
        "name": "roll of paper",
        "tags": [
            "roll of paper"
        ]
    },
    "1FAA3": {
        "name": "bucket",
        "tags": [
            "bucket"
        ]
    },
    "1F9FC": {
        "name": "soap",
        "tags": [
            "soap"
        ]
    },
    "1FAA5": {
        "name": "toothbrush",
        "tags": [
            "toothbrush"
        ]
    },
    "1F9FD": {
        "name": "sponge",
        "tags": [
            "sponge"
        ]
    },
    "1F9EF": {
        "name": "fire extinguisher",
        "tags": [
            "fire extinguisher"
        ]
    },
    "1F6D2": {
        "name": "shopping cart",
        "tags": [
            "shopping cart"
        ]
    },
    "1F6AC": {
        "name": "cigarette",
        "tags": [
            "cigarette"
        ]
    },
    "26B0": {
        "name": "coffin",
        "tags": [
            "coffin"
        ]
    },
    "1FAA6": {
        "name": "headstone",
        "tags": [
            "headstone"
        ]
    },
    "26B1": {
        "name": "funeral urn",
        "tags": [
            "funeral urn"
        ]
    },
    "1F5FF": {
        "name": "moai",
        "tags": [
            "moai"
        ]
    },
    "1FAA7": {
        "name": "placard",
        "tags": [
            "placard"
        ]
    },
    "1F3E7": {
        "name": "ATM sign",
        "tags": [
            "ATM sign"
        ]
    },
    "1F6AE": {
        "name": "litter in bin sign",
        "tags": [
            "litter in bin sign"
        ]
    },
    "1F6B0": {
        "name": "potable water",
        "tags": [
            "potable water"
        ]
    },
    "267F": {
        "name": "wheelchair symbol",
        "tags": [
            "wheelchair symbol"
        ]
    },
    "1F6B9": {
        "name": "men’s room",
        "tags": [
            "men’s room"
        ]
    },
    "1F6BA": {
        "name": "women’s room",
        "tags": [
            "women’s room"
        ]
    },
    "1F6BB": {
        "name": "restroom",
        "tags": [
            "restroom"
        ]
    },
    "1F6BC": {
        "name": "baby symbol",
        "tags": [
            "baby symbol"
        ]
    },
    "1F6BE": {
        "name": "water closet",
        "tags": [
            "water closet"
        ]
    },
    "1F6C2": {
        "name": "passport control",
        "tags": [
            "passport control"
        ]
    },
    "1F6C3": {
        "name": "customs",
        "tags": [
            "customs"
        ]
    },
    "1F6C4": {
        "name": "baggage claim",
        "tags": [
            "baggage claim"
        ]
    },
    "1F6C5": {
        "name": "left luggage",
        "tags": [
            "left luggage"
        ]
    },
    "26A0": {
        "name": "warning",
        "tags": [
            "warning"
        ]
    },
    "1F6B8": {
        "name": "children crossing",
        "tags": [
            "children crossing"
        ]
    },
    "26D4": {
        "name": "no entry",
        "tags": [
            "no entry"
        ]
    },
    "1F6AB": {
        "name": "prohibited",
        "tags": [
            "prohibited"
        ]
    },
    "1F6B3": {
        "name": "no bicycles",
        "tags": [
            "no bicycles"
        ]
    },
    "1F6AD": {
        "name": "no smoking",
        "tags": [
            "no smoking"
        ]
    },
    "1F6AF": {
        "name": "no littering",
        "tags": [
            "no littering"
        ]
    },
    "1F6B1": {
        "name": "non-potable water",
        "tags": [
            "non-potable water"
        ]
    },
    "1F6B7": {
        "name": "no pedestrians",
        "tags": [
            "no pedestrians"
        ]
    },
    "1F4F5": {
        "name": "no mobile phones",
        "tags": [
            "no mobile phones"
        ]
    },
    "1F51E": {
        "name": "no one under eighteen",
        "tags": [
            "no one under eighteen"
        ]
    },
    "2B06": {
        "name": "up arrow",
        "tags": [
            "up arrow"
        ]
    },
    "27A1": {
        "name": "right arrow",
        "tags": [
            "right arrow"
        ]
    },
    "2B07": {
        "name": "down arrow",
        "tags": [
            "down arrow"
        ]
    },
    "2B05": {
        "name": "left arrow",
        "tags": [
            "left arrow"
        ]
    },
    "21A9": {
        "name": "right arrow curving left",
        "tags": [
            "right arrow curving left"
        ]
    },
    "21AA": {
        "name": "left arrow curving right",
        "tags": [
            "left arrow curving right"
        ]
    },
    "1F503": {
        "name": "clockwise vertical arrows",
        "tags": [
            "clockwise vertical arrows"
        ]
    },
    "1F504": {
        "name": "counterclockwise arrows button",
        "tags": [
            "counterclockwise arrows button"
        ]
    },
    "1F519": {
        "name": "BACK arrow",
        "tags": [
            "BACK arrow"
        ]
    },
    "1F51A": {
        "name": "END arrow",
        "tags": [
            "END arrow"
        ]
    },
    "1F51B": {
        "name": "ON! arrow",
        "tags": [
            "ON! arrow"
        ]
    },
    "1F51C": {
        "name": "SOON arrow",
        "tags": [
            "SOON arrow"
        ]
    },
    "1F51D": {
        "name": "TOP arrow",
        "tags": [
            "TOP arrow"
        ]
    },
    "1F6D0": {
        "name": "place of worship",
        "tags": [
            "place of worship"
        ]
    },
    "269B": {
        "name": "atom symbol",
        "tags": [
            "atom symbol"
        ]
    },
    "1F549": {
        "name": "om",
        "tags": [
            "om"
        ]
    },
    "262F": {
        "name": "yin yang",
        "tags": [
            "yin yang"
        ]
    },
    "271D": {
        "name": "latin cross",
        "tags": [
            "latin cross"
        ]
    },
    "262A": {
        "name": "star and crescent",
        "tags": [
            "star and crescent"
        ]
    },
    "262E": {
        "name": "peace symbol",
        "tags": [
            "peace symbol"
        ]
    },
    "1F54E": {
        "name": "menorah",
        "tags": [
            "menorah"
        ]
    },
    "1F52F": {
        "name": "dotted six-pointed star",
        "tags": [
            "dotted six-pointed star"
        ]
    },
    "264A": {
        "name": "Gemini",
        "tags": [
            "Gemini"
        ]
    },
    "264B": {
        "name": "Cancer",
        "tags": [
            "Cancer"
        ]
    },
    "264C": {
        "name": "Leo",
        "tags": [
            "Leo"
        ]
    },
    "264D": {
        "name": "Virgo",
        "tags": [
            "Virgo"
        ]
    },
    "264E": {
        "name": "Libra",
        "tags": [
            "Libra"
        ]
    },
    "264F": {
        "name": "Scorpio",
        "tags": [
            "Scorpio"
        ]
    },
    "26CE": {
        "name": "Ophiuchus",
        "tags": [
            "Ophiuchus"
        ]
    },
    "1F500": {
        "name": "shuffle tracks button",
        "tags": [
            "shuffle tracks button"
        ]
    },
    "1F501": {
        "name": "repeat button",
        "tags": [
            "repeat button"
        ]
    },
    "1F502": {
        "name": "repeat single button",
        "tags": [
            "repeat single button"
        ]
    },
    "25B6": {
        "name": "play button",
        "tags": [
            "play button"
        ]
    },
    "23E9": {
        "name": "fast-forward button",
        "tags": [
            "fast-forward button"
        ]
    },
    "23ED": {
        "name": "next track button",
        "tags": [
            "next track button"
        ]
    },
    "23EF": {
        "name": "play or pause button",
        "tags": [
            "play or pause button"
        ]
    },
    "25C0": {
        "name": "reverse button",
        "tags": [
            "reverse button"
        ]
    },
    "23EA": {
        "name": "fast reverse button",
        "tags": [
            "fast reverse button"
        ]
    },
    "23EE": {
        "name": "last track button",
        "tags": [
            "last track button"
        ]
    },
    "1F53C": {
        "name": "upwards button",
        "tags": [
            "upwards button"
        ]
    },
    "23EB": {
        "name": "fast up button",
        "tags": [
            "fast up button"
        ]
    },
    "1F53D": {
        "name": "downwards button",
        "tags": [
            "downwards button"
        ]
    },
    "23EC": {
        "name": "fast down button",
        "tags": [
            "fast down button"
        ]
    },
    "23F8": {
        "name": "pause button",
        "tags": [
            "pause button"
        ]
    },
    "23F9": {
        "name": "stop button",
        "tags": [
            "stop button"
        ]
    },
    "23FA": {
        "name": "record button",
        "tags": [
            "record button"
        ]
    },
    "23CF": {
        "name": "eject button",
        "tags": [
            "eject button"
        ]
    },
    "1F3A6": {
        "name": "cinema",
        "tags": [
            "cinema"
        ]
    },
    "1F505": {
        "name": "dim button",
        "tags": [
            "dim button"
        ]
    },
    "1F506": {
        "name": "bright button",
        "tags": [
            "bright button"
        ]
    },
    "1F4F6": {
        "name": "antenna bars",
        "tags": [
            "antenna bars"
        ]
    },
    "1F4F3": {
        "name": "vibration mode",
        "tags": [
            "vibration mode"
        ]
    },
    "1F4F4": {
        "name": "mobile phone off",
        "tags": [
            "mobile phone off"
        ]
    },
    "26A7": {
        "name": "transgender symbol",
        "tags": [
            "transgender symbol"
        ]
    },
    "267E": {
        "name": "infinity",
        "tags": [
            "infinity"
        ]
    },
    "203C": {
        "name": "double exclamation mark",
        "tags": [
            "double exclamation mark"
        ]
    },
    "1F4B1": {
        "name": "currency exchange",
        "tags": [
            "currency exchange"
        ]
    },
    "1F4B2": {
        "name": "heavy dollar sign",
        "tags": [
            "heavy dollar sign"
        ]
    },
    "267B": {
        "name": "recycling symbol",
        "tags": [
            "recycling symbol"
        ]
    },
    "269C": {
        "name": "fleur-de-lis",
        "tags": [
            "fleur-de-lis"
        ]
    },
    "1F531": {
        "name": "trident emblem",
        "tags": [
            "trident emblem"
        ]
    },
    "1F4DB": {
        "name": "name badge",
        "tags": [
            "name badge"
        ]
    },
    "1F530": {
        "name": "Japanese symbol for beginner",
        "tags": [
            "Japanese symbol for beginner"
        ]
    },
    "2B55": {
        "name": "hollow red circle",
        "tags": [
            "hollow red circle"
        ]
    },
    "274C": {
        "name": "cross mark",
        "tags": [
            "cross mark"
        ]
    },
    "274E": {
        "name": "cross mark button",
        "tags": [
            "cross mark button"
        ]
    },
    "27B0": {
        "name": "curly loop",
        "tags": [
            "curly loop"
        ]
    },
    "27BF": {
        "name": "double curly loop",
        "tags": [
            "double curly loop"
        ]
    },
    "303D": {
        "name": "part alternation mark",
        "tags": [
            "part alternation mark"
        ]
    },
    "00A9": {
        "name": "copyright",
        "tags": [
            "copyright"
        ]
    },
    "00AE": {
        "name": "registered",
        "tags": [
            "registered"
        ]
    },
    "0023-FE0F-20E3": {
        "name": "keycap: #",
        "tags": [
            "keycap: #"
        ]
    },
    "002A-FE0F-20E3": {
        "name": "keycap: *",
        "tags": [
            "keycap: *"
        ]
    },
    "0030-FE0F-20E3": {
        "name": "keycap: 0",
        "tags": [
            "keycap: 0"
        ]
    },
    "0031-FE0F-20E3": {
        "name": "keycap: 1",
        "tags": [
            "keycap: 1"
        ]
    },
    "0032-FE0F-20E3": {
        "name": "keycap: 2",
        "tags": [
            "keycap: 2"
        ]
    },
    "0033-FE0F-20E3": {
        "name": "keycap: 3",
        "tags": [
            "keycap: 3"
        ]
    },
    "0034-FE0F-20E3": {
        "name": "keycap: 4",
        "tags": [
            "keycap: 4"
        ]
    },
    "0035-FE0F-20E3": {
        "name": "keycap: 5",
        "tags": [
            "keycap: 5"
        ]
    },
    "0036-FE0F-20E3": {
        "name": "keycap: 6",
        "tags": [
            "keycap: 6"
        ]
    },
    "0037-FE0F-20E3": {
        "name": "keycap: 7",
        "tags": [
            "keycap: 7"
        ]
    },
    "0038-FE0F-20E3": {
        "name": "keycap: 8",
        "tags": [
            "keycap: 8"
        ]
    },
    "0039-FE0F-20E3": {
        "name": "keycap: 9",
        "tags": [
            "keycap: 9"
        ]
    },
    "1F51F": {
        "name": "keycap: 10",
        "tags": [
            "keycap: 10"
        ]
    },
    "1F520": {
        "name": "input latin uppercase",
        "tags": [
            "input latin uppercase"
        ]
    },
    "1F521": {
        "name": "input latin lowercase",
        "tags": [
            "input latin lowercase"
        ]
    },
    "1F522": {
        "name": "input numbers",
        "tags": [
            "input numbers"
        ]
    },
    "1F523": {
        "name": "input symbols",
        "tags": [
            "input symbols"
        ]
    },
    "1F524": {
        "name": "input latin letters",
        "tags": [
            "input latin letters"
        ]
    },
    "1F170": {
        "name": "A button (blood type)",
        "tags": [
            "A button (blood type)"
        ]
    },
    "1F18E": {
        "name": "AB button (blood type)",
        "tags": [
            "AB button (blood type)"
        ]
    },
    "1F171": {
        "name": "B button (blood type)",
        "tags": [
            "B button (blood type)"
        ]
    },
    "1F191": {
        "name": "CL button",
        "tags": [
            "CL button"
        ]
    },
    "1F192": {
        "name": "COOL button",
        "tags": [
            "COOL button"
        ]
    },
    "1F193": {
        "name": "FREE button",
        "tags": [
            "FREE button"
        ]
    },
    "1F194": {
        "name": "ID button",
        "tags": [
            "ID button"
        ]
    },
    "24C2": {
        "name": "circled M",
        "tags": [
            "circled M"
        ]
    },
    "1F195": {
        "name": "NEW button",
        "tags": [
            "NEW button"
        ]
    },
    "1F196": {
        "name": "NG button",
        "tags": [
            "NG button"
        ]
    },
    "1F17E": {
        "name": "O button (blood type)",
        "tags": [
            "O button (blood type)"
        ]
    },
    "1F197": {
        "name": "OK button",
        "tags": [
            "OK button"
        ]
    },
    "1F17F": {
        "name": "P button",
        "tags": [
            "P button"
        ]
    },
    "1F198": {
        "name": "SOS button",
        "tags": [
            "SOS button"
        ]
    },
    "1F199": {
        "name": "UP! button",
        "tags": [
            "UP! button"
        ]
    },
    "1F19A": {
        "name": "VS button",
        "tags": [
            "VS button"
        ]
    },
    "1F201": {
        "name": "Japanese “here” button",
        "tags": [
            "Japanese “here” button"
        ]
    },
    "1F202": {
        "name": "Japanese “service charge” button",
        "tags": [
            "Japanese “service charge” button"
        ]
    },
    "1F237": {
        "name": "Japanese “monthly amount” button",
        "tags": [
            "Japanese “monthly amount” button"
        ]
    },
    "1F236": {
        "name": "Japanese “not free of charge” button",
        "tags": [
            "Japanese “not free of charge” button"
        ]
    },
    "1F22F": {
        "name": "Japanese “reserved” button",
        "tags": [
            "Japanese “reserved” button"
        ]
    },
    "1F250": {
        "name": "Japanese “bargain” button",
        "tags": [
            "Japanese “bargain” button"
        ]
    },
    "1F239": {
        "name": "Japanese “discount” button",
        "tags": [
            "Japanese “discount” button"
        ]
    },
    "1F21A": {
        "name": "Japanese “free of charge” button",
        "tags": [
            "Japanese “free of charge” button"
        ]
    },
    "1F232": {
        "name": "Japanese “prohibited” button",
        "tags": [
            "Japanese “prohibited” button"
        ]
    },
    "1F251": {
        "name": "Japanese “acceptable” button",
        "tags": [
            "Japanese “acceptable” button"
        ]
    },
    "1F238": {
        "name": "Japanese “application” button",
        "tags": [
            "Japanese “application” button"
        ]
    },
    "1F234": {
        "name": "Japanese “passing grade” button",
        "tags": [
            "Japanese “passing grade” button"
        ]
    },
    "1F233": {
        "name": "Japanese “vacancy” button",
        "tags": [
            "Japanese “vacancy” button"
        ]
    },
    "1F23A": {
        "name": "Japanese “open for business” button",
        "tags": [
            "Japanese “open for business” button"
        ]
    },
    "1F235": {
        "name": "Japanese “no vacancy” button",
        "tags": [
            "Japanese “no vacancy” button"
        ]
    },
    "1F534": {
        "name": "red circle",
        "tags": [
            "red circle"
        ]
    },
    "1F7E0": {
        "name": "orange circle",
        "tags": [
            "orange circle"
        ]
    },
    "1F7E1": {
        "name": "yellow circle",
        "tags": [
            "yellow circle"
        ]
    },
    "1F7E2": {
        "name": "green circle",
        "tags": [
            "green circle"
        ]
    },
    "1F535": {
        "name": "blue circle",
        "tags": [
            "blue circle"
        ]
    },
    "1F7E3": {
        "name": "purple circle",
        "tags": [
            "purple circle"
        ]
    },
    "1F7E4": {
        "name": "brown circle",
        "tags": [
            "brown circle"
        ]
    },
    "26AB": {
        "name": "black circle",
        "tags": [
            "black circle"
        ]
    },
    "26AA": {
        "name": "white circle",
        "tags": [
            "white circle"
        ]
    },
    "1F7E5": {
        "name": "red square",
        "tags": [
            "red square"
        ]
    },
    "1F7E7": {
        "name": "orange square",
        "tags": [
            "orange square"
        ]
    },
    "1F7E8": {
        "name": "yellow square",
        "tags": [
            "yellow square"
        ]
    },
    "1F7E9": {
        "name": "green square",
        "tags": [
            "green square"
        ]
    },
    "1F7E6": {
        "name": "blue square",
        "tags": [
            "blue square"
        ]
    },
    "1F7EA": {
        "name": "purple square",
        "tags": [
            "purple square"
        ]
    },
    "1F7EB": {
        "name": "brown square",
        "tags": [
            "brown square"
        ]
    },
    "2B1B": {
        "name": "black large square",
        "tags": [
            "black large square"
        ]
    },
    "2B1C": {
        "name": "white large square",
        "tags": [
            "white large square"
        ]
    },
    "25FC": {
        "name": "black medium square",
        "tags": [
            "black medium square"
        ]
    },
    "25FB": {
        "name": "white medium square",
        "tags": [
            "white medium square"
        ]
    },
    "25FE": {
        "name": "black medium-small square",
        "tags": [
            "black medium-small square"
        ]
    },
    "25FD": {
        "name": "white medium-small square",
        "tags": [
            "white medium-small square"
        ]
    },
    "25AA": {
        "name": "black small square",
        "tags": [
            "black small square"
        ]
    },
    "25AB": {
        "name": "white small square",
        "tags": [
            "white small square"
        ]
    },
    "1F536": {
        "name": "large orange diamond",
        "tags": [
            "large orange diamond"
        ]
    },
    "1F537": {
        "name": "large blue diamond",
        "tags": [
            "large blue diamond"
        ]
    },
    "1F538": {
        "name": "small orange diamond",
        "tags": [
            "small orange diamond"
        ]
    },
    "1F539": {
        "name": "small blue diamond",
        "tags": [
            "small blue diamond"
        ]
    },
    "1F53A": {
        "name": "red triangle pointed up",
        "tags": [
            "red triangle pointed up"
        ]
    },
    "1F53B": {
        "name": "red triangle pointed down",
        "tags": [
            "red triangle pointed down"
        ]
    },
    "1F4A0": {
        "name": "diamond with a dot",
        "tags": [
            "diamond with a dot"
        ]
    },
    "1F518": {
        "name": "radio button",
        "tags": [
            "radio button"
        ]
    },
    "1F533": {
        "name": "white square button",
        "tags": [
            "white square button"
        ]
    },
    "1F532": {
        "name": "black square button",
        "tags": [
            "black square button"
        ]
    },
    "1F3C1": {
        "name": "chequered flag",
        "tags": [
            "chequered flag"
        ]
    },
    "1F6A9": {
        "name": "triangular flag",
        "tags": [
            "triangular flag"
        ]
    },
    "1F38C": {
        "name": "crossed flags",
        "tags": [
            "crossed flags"
        ]
    },
    "1F3F4": {
        "name": "black flag",
        "tags": [
            "black flag"
        ]
    },
    "1F3F3": {
        "name": "white flag",
        "tags": [
            "white flag"
        ]
    },
    "1F3F3-FE0F-200D-1F308": {
        "name": "rainbow flag",
        "tags": [
            "rainbow flag"
        ]
    },
    "1F3F3-FE0F-200D-26A7-FE0F": {
        "name": "transgender flag",
        "tags": [
            "transgender flag"
        ]
    },
    "1F3F4-200D-2620-FE0F": {
        "name": "pirate flag",
        "tags": [
            "pirate flag"
        ]
    },
    "1F1E6-1F1E8": {
        "name": "flag: Ascension Island",
        "tags": [
            "flag: Ascension Island"
        ]
    },
    "1F1E6-1F1E9": {
        "name": "flag: Andorra",
        "tags": [
            "flag: Andorra"
        ]
    },
    "1F1E6-1F1EA": {
        "name": "flag: United Arab Emirates",
        "tags": [
            "flag: United Arab Emirates"
        ]
    },
    "1F1E6-1F1EB": {
        "name": "flag: Afghanistan",
        "tags": [
            "flag: Afghanistan"
        ]
    },
    "1F1E6-1F1EC": {
        "name": "flag: Antigua &amp; Barbuda",
        "tags": [
            "flag: Antigua &amp; Barbuda"
        ]
    },
    "1F1E6-1F1EE": {
        "name": "flag: Anguilla",
        "tags": [
            "flag: Anguilla"
        ]
    },
    "1F1E6-1F1F1": {
        "name": "flag: Albania",
        "tags": [
            "flag: Albania"
        ]
    },
    "1F1E6-1F1F2": {
        "name": "flag: Armenia",
        "tags": [
            "flag: Armenia"
        ]
    },
    "1F1E6-1F1F4": {
        "name": "flag: Angola",
        "tags": [
            "flag: Angola"
        ]
    },
    "1F1E6-1F1F6": {
        "name": "flag: Antarctica",
        "tags": [
            "flag: Antarctica"
        ]
    },
    "1F1E6-1F1F7": {
        "name": "flag: Argentina",
        "tags": [
            "flag: Argentina"
        ]
    },
    "1F1E6-1F1F8": {
        "name": "flag: American Samoa",
        "tags": [
            "flag: American Samoa"
        ]
    },
    "1F1E6-1F1F9": {
        "name": "flag: Austria",
        "tags": [
            "flag: Austria"
        ]
    },
    "1F1E6-1F1FA": {
        "name": "flag: Australia",
        "tags": [
            "flag: Australia"
        ]
    },
    "1F1E6-1F1FC": {
        "name": "flag: Aruba",
        "tags": [
            "flag: Aruba"
        ]
    },
    "1F1E6-1F1FD": {
        "name": "flag: Åland Islands",
        "tags": [
            "flag: Åland Islands"
        ]
    },
    "1F1E6-1F1FF": {
        "name": "flag: Azerbaijan",
        "tags": [
            "flag: Azerbaijan"
        ]
    },
    "1F1E7-1F1E6": {
        "name": "flag: Bosnia &amp; Herzegovina",
        "tags": [
            "flag: Bosnia &amp; Herzegovina"
        ]
    },
    "1F1E7-1F1E7": {
        "name": "flag: Barbados",
        "tags": [
            "flag: Barbados"
        ]
    },
    "1F1E7-1F1E9": {
        "name": "flag: Bangladesh",
        "tags": [
            "flag: Bangladesh"
        ]
    },
    "1F1E7-1F1EA": {
        "name": "flag: Belgium",
        "tags": [
            "flag: Belgium"
        ]
    },
    "1F1E7-1F1EB": {
        "name": "flag: Burkina Faso",
        "tags": [
            "flag: Burkina Faso"
        ]
    },
    "1F1E7-1F1EC": {
        "name": "flag: Bulgaria",
        "tags": [
            "flag: Bulgaria"
        ]
    },
    "1F1E7-1F1ED": {
        "name": "flag: Bahrain",
        "tags": [
            "flag: Bahrain"
        ]
    },
    "1F1E7-1F1EE": {
        "name": "flag: Burundi",
        "tags": [
            "flag: Burundi"
        ]
    },
    "1F1E7-1F1EF": {
        "name": "flag: Benin",
        "tags": [
            "flag: Benin"
        ]
    },
    "1F1E7-1F1F1": {
        "name": "flag: St. Barthélemy",
        "tags": [
            "flag: St. Barthélemy"
        ]
    },
    "1F1E7-1F1F2": {
        "name": "flag: Bermuda",
        "tags": [
            "flag: Bermuda"
        ]
    },
    "1F1E7-1F1F3": {
        "name": "flag: Brunei",
        "tags": [
            "flag: Brunei"
        ]
    },
    "1F1E7-1F1F4": {
        "name": "flag: Bolivia",
        "tags": [
            "flag: Bolivia"
        ]
    },
    "1F1E7-1F1F6": {
        "name": "flag: Caribbean Netherlands",
        "tags": [
            "flag: Caribbean Netherlands"
        ]
    },
    "1F1E7-1F1F7": {
        "name": "flag: Brazil",
        "tags": [
            "flag: Brazil"
        ]
    },
    "1F1E7-1F1F8": {
        "name": "flag: Bahamas",
        "tags": [
            "flag: Bahamas"
        ]
    },
    "1F1E7-1F1F9": {
        "name": "flag: Bhutan",
        "tags": [
            "flag: Bhutan"
        ]
    },
    "1F1E7-1F1FB": {
        "name": "flag: Bouvet Island",
        "tags": [
            "flag: Bouvet Island"
        ]
    },
    "1F1E7-1F1FC": {
        "name": "flag: Botswana",
        "tags": [
            "flag: Botswana"
        ]
    },
    "1F1E7-1F1FE": {
        "name": "flag: Belarus",
        "tags": [
            "flag: Belarus"
        ]
    },
    "1F1E7-1F1FF": {
        "name": "flag: Belize",
        "tags": [
            "flag: Belize"
        ]
    },
    "1F1E8-1F1E6": {
        "name": "flag: Canada",
        "tags": [
            "flag: Canada"
        ]
    },
    "1F1E8-1F1E8": {
        "name": "flag: Cocos (Keeling) Islands",
        "tags": [
            "flag: Cocos (Keeling) Islands"
        ]
    },
    "1F1E8-1F1E9": {
        "name": "flag: Congo - Kinshasa",
        "tags": [
            "flag: Congo - Kinshasa"
        ]
    },
    "1F1E8-1F1EB": {
        "name": "flag: Central African Republic",
        "tags": [
            "flag: Central African Republic"
        ]
    },
    "1F1E8-1F1EC": {
        "name": "flag: Congo - Brazzaville",
        "tags": [
            "flag: Congo - Brazzaville"
        ]
    },
    "1F1E8-1F1ED": {
        "name": "flag: Switzerland",
        "tags": [
            "flag: Switzerland"
        ]
    },
    "1F1E8-1F1EE": {
        "name": "flag: Côte d’Ivoire",
        "tags": [
            "flag: Côte d’Ivoire"
        ]
    },
    "1F1E8-1F1F0": {
        "name": "flag: Cook Islands",
        "tags": [
            "flag: Cook Islands"
        ]
    },
    "1F1E8-1F1F1": {
        "name": "flag: Chile",
        "tags": [
            "flag: Chile"
        ]
    },
    "1F1E8-1F1F2": {
        "name": "flag: Cameroon",
        "tags": [
            "flag: Cameroon"
        ]
    },
    "1F1E8-1F1F3": {
        "name": "flag: China",
        "tags": [
            "flag: China"
        ]
    },
    "1F1E8-1F1F4": {
        "name": "flag: Colombia",
        "tags": [
            "flag: Colombia"
        ]
    },
    "1F1E8-1F1F5": {
        "name": "flag: Clipperton Island",
        "tags": [
            "flag: Clipperton Island"
        ]
    },
    "1F1E8-1F1F7": {
        "name": "flag: Costa Rica",
        "tags": [
            "flag: Costa Rica"
        ]
    },
    "1F1E8-1F1FA": {
        "name": "flag: Cuba",
        "tags": [
            "flag: Cuba"
        ]
    },
    "1F1E8-1F1FB": {
        "name": "flag: Cape Verde",
        "tags": [
            "flag: Cape Verde"
        ]
    },
    "1F1E8-1F1FC": {
        "name": "flag: Curaçao",
        "tags": [
            "flag: Curaçao"
        ]
    },
    "1F1E8-1F1FD": {
        "name": "flag: Christmas Island",
        "tags": [
            "flag: Christmas Island"
        ]
    },
    "1F1E8-1F1FE": {
        "name": "flag: Cyprus",
        "tags": [
            "flag: Cyprus"
        ]
    },
    "1F1E8-1F1FF": {
        "name": "flag: Czechia",
        "tags": [
            "flag: Czechia"
        ]
    },
    "1F1E9-1F1EA": {
        "name": "flag: Germany",
        "tags": [
            "flag: Germany"
        ]
    },
    "1F1E9-1F1EC": {
        "name": "flag: Diego Garcia",
        "tags": [
            "flag: Diego Garcia"
        ]
    },
    "1F1E9-1F1EF": {
        "name": "flag: Djibouti",
        "tags": [
            "flag: Djibouti"
        ]
    },
    "1F1E9-1F1F0": {
        "name": "flag: Denmark",
        "tags": [
            "flag: Denmark"
        ]
    },
    "1F1E9-1F1F2": {
        "name": "flag: Dominica",
        "tags": [
            "flag: Dominica"
        ]
    },
    "1F1E9-1F1F4": {
        "name": "flag: Dominican Republic",
        "tags": [
            "flag: Dominican Republic"
        ]
    },
    "1F1E9-1F1FF": {
        "name": "flag: Algeria",
        "tags": [
            "flag: Algeria"
        ]
    },
    "1F1EA-1F1E6": {
        "name": "flag: Ceuta &amp; Melilla",
        "tags": [
            "flag: Ceuta &amp; Melilla"
        ]
    },
    "1F1EA-1F1E8": {
        "name": "flag: Ecuador",
        "tags": [
            "flag: Ecuador"
        ]
    },
    "1F1EA-1F1EA": {
        "name": "flag: Estonia",
        "tags": [
            "flag: Estonia"
        ]
    },
    "1F1EA-1F1EC": {
        "name": "flag: Egypt",
        "tags": [
            "flag: Egypt"
        ]
    },
    "1F1EA-1F1ED": {
        "name": "flag: Western Sahara",
        "tags": [
            "flag: Western Sahara"
        ]
    },
    "1F1EA-1F1F7": {
        "name": "flag: Eritrea",
        "tags": [
            "flag: Eritrea"
        ]
    },
    "1F1EA-1F1F8": {
        "name": "flag: Spain",
        "tags": [
            "flag: Spain"
        ]
    },
    "1F1EA-1F1F9": {
        "name": "flag: Ethiopia",
        "tags": [
            "flag: Ethiopia"
        ]
    },
    "1F1EA-1F1FA": {
        "name": "flag: European Union",
        "tags": [
            "flag: European Union"
        ]
    },
    "1F1EB-1F1EE": {
        "name": "flag: Finland",
        "tags": [
            "flag: Finland"
        ]
    },
    "1F1EB-1F1EF": {
        "name": "flag: Fiji",
        "tags": [
            "flag: Fiji"
        ]
    },
    "1F1EB-1F1F0": {
        "name": "flag: Falkland Islands",
        "tags": [
            "flag: Falkland Islands"
        ]
    },
    "1F1EB-1F1F2": {
        "name": "flag: Micronesia",
        "tags": [
            "flag: Micronesia"
        ]
    },
    "1F1EB-1F1F4": {
        "name": "flag: Faroe Islands",
        "tags": [
            "flag: Faroe Islands"
        ]
    },
    "1F1EB-1F1F7": {
        "name": "flag: France",
        "tags": [
            "flag: France"
        ]
    },
    "1F1EC-1F1E6": {
        "name": "flag: Gabon",
        "tags": [
            "flag: Gabon"
        ]
    },
    "1F1EC-1F1E7": {
        "name": "flag: United Kingdom",
        "tags": [
            "flag: United Kingdom"
        ]
    },
    "1F1EC-1F1E9": {
        "name": "flag: Grenada",
        "tags": [
            "flag: Grenada"
        ]
    },
    "1F1EC-1F1EA": {
        "name": "flag: Georgia",
        "tags": [
            "flag: Georgia"
        ]
    },
    "1F1EC-1F1EB": {
        "name": "flag: French Guiana",
        "tags": [
            "flag: French Guiana"
        ]
    },
    "1F1EC-1F1EC": {
        "name": "flag: Guernsey",
        "tags": [
            "flag: Guernsey"
        ]
    },
    "1F1EC-1F1ED": {
        "name": "flag: Ghana",
        "tags": [
            "flag: Ghana"
        ]
    },
    "1F1EC-1F1EE": {
        "name": "flag: Gibraltar",
        "tags": [
            "flag: Gibraltar"
        ]
    },
    "1F1EC-1F1F1": {
        "name": "flag: Greenland",
        "tags": [
            "flag: Greenland"
        ]
    },
    "1F1EC-1F1F2": {
        "name": "flag: Gambia",
        "tags": [
            "flag: Gambia"
        ]
    },
    "1F1EC-1F1F3": {
        "name": "flag: Guinea",
        "tags": [
            "flag: Guinea"
        ]
    },
    "1F1EC-1F1F5": {
        "name": "flag: Guadeloupe",
        "tags": [
            "flag: Guadeloupe"
        ]
    },
    "1F1EC-1F1F6": {
        "name": "flag: Equatorial Guinea",
        "tags": [
            "flag: Equatorial Guinea"
        ]
    },
    "1F1EC-1F1F7": {
        "name": "flag: Greece",
        "tags": [
            "flag: Greece"
        ]
    },
    "1F1EC-1F1F8": {
        "name": "flag: South Georgia &amp; South Sandwich Islands",
        "tags": [
            "flag: South Georgia &amp; South Sandwich Islands"
        ]
    },
    "1F1EC-1F1F9": {
        "name": "flag: Guatemala",
        "tags": [
            "flag: Guatemala"
        ]
    },
    "1F1EC-1F1FA": {
        "name": "flag: Guam",
        "tags": [
            "flag: Guam"
        ]
    },
    "1F1EC-1F1FC": {
        "name": "flag: Guinea-Bissau",
        "tags": [
            "flag: Guinea-Bissau"
        ]
    },
    "1F1EC-1F1FE": {
        "name": "flag: Guyana",
        "tags": [
            "flag: Guyana"
        ]
    },
    "1F1ED-1F1F0": {
        "name": "flag: Hong Kong SAR China",
        "tags": [
            "flag: Hong Kong SAR China"
        ]
    },
    "1F1ED-1F1F2": {
        "name": "flag: Heard &amp; McDonald Islands",
        "tags": [
            "flag: Heard &amp; McDonald Islands"
        ]
    },
    "1F1ED-1F1F3": {
        "name": "flag: Honduras",
        "tags": [
            "flag: Honduras"
        ]
    },
    "1F1ED-1F1F7": {
        "name": "flag: Croatia",
        "tags": [
            "flag: Croatia"
        ]
    },
    "1F1ED-1F1F9": {
        "name": "flag: Haiti",
        "tags": [
            "flag: Haiti"
        ]
    },
    "1F1ED-1F1FA": {
        "name": "flag: Hungary",
        "tags": [
            "flag: Hungary"
        ]
    },
    "1F1EE-1F1E8": {
        "name": "flag: Canary Islands",
        "tags": [
            "flag: Canary Islands"
        ]
    },
    "1F1EE-1F1E9": {
        "name": "flag: Indonesia",
        "tags": [
            "flag: Indonesia"
        ]
    },
    "1F1EE-1F1EA": {
        "name": "flag: Ireland",
        "tags": [
            "flag: Ireland"
        ]
    },
    "1F1EE-1F1F1": {
        "name": "flag: Israel",
        "tags": [
            "flag: Israel"
        ]
    },
    "1F1EE-1F1F2": {
        "name": "flag: Isle of Man",
        "tags": [
            "flag: Isle of Man"
        ]
    },
    "1F1EE-1F1F3": {
        "name": "flag: India",
        "tags": [
            "flag: India"
        ]
    },
    "1F1EE-1F1F4": {
        "name": "flag: British Indian Ocean Territory",
        "tags": [
            "flag: British Indian Ocean Territory"
        ]
    },
    "1F1EE-1F1F6": {
        "name": "flag: Iraq",
        "tags": [
            "flag: Iraq"
        ]
    },
    "1F1EE-1F1F7": {
        "name": "flag: Iran",
        "tags": [
            "flag: Iran"
        ]
    },
    "1F1EE-1F1F8": {
        "name": "flag: Iceland",
        "tags": [
            "flag: Iceland"
        ]
    },
    "1F1EE-1F1F9": {
        "name": "flag: Italy",
        "tags": [
            "flag: Italy"
        ]
    },
    "1F1EF-1F1EA": {
        "name": "flag: Jersey",
        "tags": [
            "flag: Jersey"
        ]
    },
    "1F1EF-1F1F2": {
        "name": "flag: Jamaica",
        "tags": [
            "flag: Jamaica"
        ]
    },
    "1F1EF-1F1F4": {
        "name": "flag: Jordan",
        "tags": [
            "flag: Jordan"
        ]
    },
    "1F1EF-1F1F5": {
        "name": "flag: Japan",
        "tags": [
            "flag: Japan"
        ]
    },
    "1F1F0-1F1EA": {
        "name": "flag: Kenya",
        "tags": [
            "flag: Kenya"
        ]
    },
    "1F1F0-1F1EC": {
        "name": "flag: Kyrgyzstan",
        "tags": [
            "flag: Kyrgyzstan"
        ]
    },
    "1F1F0-1F1ED": {
        "name": "flag: Cambodia",
        "tags": [
            "flag: Cambodia"
        ]
    },
    "1F1F0-1F1EE": {
        "name": "flag: Kiribati",
        "tags": [
            "flag: Kiribati"
        ]
    },
    "1F1F0-1F1F2": {
        "name": "flag: Comoros",
        "tags": [
            "flag: Comoros"
        ]
    },
    "1F1F0-1F1F3": {
        "name": "flag: St. Kitts &amp; Nevis",
        "tags": [
            "flag: St. Kitts &amp; Nevis"
        ]
    },
    "1F1F0-1F1F5": {
        "name": "flag: North Korea",
        "tags": [
            "flag: North Korea"
        ]
    },
    "1F1F0-1F1F7": {
        "name": "flag: South Korea",
        "tags": [
            "flag: South Korea"
        ]
    },
    "1F1F0-1F1FC": {
        "name": "flag: Kuwait",
        "tags": [
            "flag: Kuwait"
        ]
    },
    "1F1F0-1F1FE": {
        "name": "flag: Cayman Islands",
        "tags": [
            "flag: Cayman Islands"
        ]
    },
    "1F1F0-1F1FF": {
        "name": "flag: Kazakhstan",
        "tags": [
            "flag: Kazakhstan"
        ]
    },
    "1F1F1-1F1E6": {
        "name": "flag: Laos",
        "tags": [
            "flag: Laos"
        ]
    },
    "1F1F1-1F1E7": {
        "name": "flag: Lebanon",
        "tags": [
            "flag: Lebanon"
        ]
    },
    "1F1F1-1F1E8": {
        "name": "flag: St. Lucia",
        "tags": [
            "flag: St. Lucia"
        ]
    },
    "1F1F1-1F1EE": {
        "name": "flag: Liechtenstein",
        "tags": [
            "flag: Liechtenstein"
        ]
    },
    "1F1F1-1F1F0": {
        "name": "flag: Sri Lanka",
        "tags": [
            "flag: Sri Lanka"
        ]
    },
    "1F1F1-1F1F7": {
        "name": "flag: Liberia",
        "tags": [
            "flag: Liberia"
        ]
    },
    "1F1F1-1F1F8": {
        "name": "flag: Lesotho",
        "tags": [
            "flag: Lesotho"
        ]
    },
    "1F1F1-1F1F9": {
        "name": "flag: Lithuania",
        "tags": [
            "flag: Lithuania"
        ]
    },
    "1F1F1-1F1FA": {
        "name": "flag: Luxembourg",
        "tags": [
            "flag: Luxembourg"
        ]
    },
    "1F1F1-1F1FB": {
        "name": "flag: Latvia",
        "tags": [
            "flag: Latvia"
        ]
    },
    "1F1F1-1F1FE": {
        "name": "flag: Libya",
        "tags": [
            "flag: Libya"
        ]
    },
    "1F1F2-1F1E6": {
        "name": "flag: Morocco",
        "tags": [
            "flag: Morocco"
        ]
    },
    "1F1F2-1F1E8": {
        "name": "flag: Monaco",
        "tags": [
            "flag: Monaco"
        ]
    },
    "1F1F2-1F1E9": {
        "name": "flag: Moldova",
        "tags": [
            "flag: Moldova"
        ]
    },
    "1F1F2-1F1EA": {
        "name": "flag: Montenegro",
        "tags": [
            "flag: Montenegro"
        ]
    },
    "1F1F2-1F1EB": {
        "name": "flag: St. Martin",
        "tags": [
            "flag: St. Martin"
        ]
    },
    "1F1F2-1F1EC": {
        "name": "flag: Madagascar",
        "tags": [
            "flag: Madagascar"
        ]
    },
    "1F1F2-1F1ED": {
        "name": "flag: Marshall Islands",
        "tags": [
            "flag: Marshall Islands"
        ]
    },
    "1F1F2-1F1F0": {
        "name": "flag: North Macedonia",
        "tags": [
            "flag: North Macedonia"
        ]
    },
    "1F1F2-1F1F1": {
        "name": "flag: Mali",
        "tags": [
            "flag: Mali"
        ]
    },
    "1F1F2-1F1F2": {
        "name": "flag: Myanmar (Burma)",
        "tags": [
            "flag: Myanmar (Burma)"
        ]
    },
    "1F1F2-1F1F3": {
        "name": "flag: Mongolia",
        "tags": [
            "flag: Mongolia"
        ]
    },
    "1F1F2-1F1F4": {
        "name": "flag: Macao SAR China",
        "tags": [
            "flag: Macao SAR China"
        ]
    },
    "1F1F2-1F1F5": {
        "name": "flag: Northern Mariana Islands",
        "tags": [
            "flag: Northern Mariana Islands"
        ]
    },
    "1F1F2-1F1F6": {
        "name": "flag: Martinique",
        "tags": [
            "flag: Martinique"
        ]
    },
    "1F1F2-1F1F7": {
        "name": "flag: Mauritania",
        "tags": [
            "flag: Mauritania"
        ]
    },
    "1F1F2-1F1F8": {
        "name": "flag: Montserrat",
        "tags": [
            "flag: Montserrat"
        ]
    },
    "1F1F2-1F1F9": {
        "name": "flag: Malta",
        "tags": [
            "flag: Malta"
        ]
    },
    "1F1F2-1F1FA": {
        "name": "flag: Mauritius",
        "tags": [
            "flag: Mauritius"
        ]
    },
    "1F1F2-1F1FB": {
        "name": "flag: Maldives",
        "tags": [
            "flag: Maldives"
        ]
    },
    "1F1F2-1F1FC": {
        "name": "flag: Malawi",
        "tags": [
            "flag: Malawi"
        ]
    },
    "1F1F2-1F1FD": {
        "name": "flag: Mexico",
        "tags": [
            "flag: Mexico"
        ]
    },
    "1F1F2-1F1FE": {
        "name": "flag: Malaysia",
        "tags": [
            "flag: Malaysia"
        ]
    },
    "1F1F2-1F1FF": {
        "name": "flag: Mozambique",
        "tags": [
            "flag: Mozambique"
        ]
    },
    "1F1F3-1F1E6": {
        "name": "flag: Namibia",
        "tags": [
            "flag: Namibia"
        ]
    },
    "1F1F3-1F1E8": {
        "name": "flag: New Caledonia",
        "tags": [
            "flag: New Caledonia"
        ]
    },
    "1F1F3-1F1EA": {
        "name": "flag: Niger",
        "tags": [
            "flag: Niger"
        ]
    },
    "1F1F3-1F1EB": {
        "name": "flag: Norfolk Island",
        "tags": [
            "flag: Norfolk Island"
        ]
    },
    "1F1F3-1F1EC": {
        "name": "flag: Nigeria",
        "tags": [
            "flag: Nigeria"
        ]
    },
    "1F1F3-1F1EE": {
        "name": "flag: Nicaragua",
        "tags": [
            "flag: Nicaragua"
        ]
    },
    "1F1F3-1F1F1": {
        "name": "flag: Netherlands",
        "tags": [
            "flag: Netherlands"
        ]
    },
    "1F1F3-1F1F4": {
        "name": "flag: Norway",
        "tags": [
            "flag: Norway"
        ]
    },
    "1F1F3-1F1F5": {
        "name": "flag: Nepal",
        "tags": [
            "flag: Nepal"
        ]
    },
    "1F1F3-1F1F7": {
        "name": "flag: Nauru",
        "tags": [
            "flag: Nauru"
        ]
    },
    "1F1F3-1F1FA": {
        "name": "flag: Niue",
        "tags": [
            "flag: Niue"
        ]
    },
    "1F1F3-1F1FF": {
        "name": "flag: New Zealand",
        "tags": [
            "flag: New Zealand"
        ]
    },
    "1F1F4-1F1F2": {
        "name": "flag: Oman",
        "tags": [
            "flag: Oman"
        ]
    },
    "1F1F5-1F1E6": {
        "name": "flag: Panama",
        "tags": [
            "flag: Panama"
        ]
    },
    "1F1F5-1F1EA": {
        "name": "flag: Peru",
        "tags": [
            "flag: Peru"
        ]
    },
    "1F1F5-1F1EB": {
        "name": "flag: French Polynesia",
        "tags": [
            "flag: French Polynesia"
        ]
    },
    "1F1F5-1F1EC": {
        "name": "flag: Papua New Guinea",
        "tags": [
            "flag: Papua New Guinea"
        ]
    },
    "1F1F5-1F1ED": {
        "name": "flag: Philippines",
        "tags": [
            "flag: Philippines"
        ]
    },
    "1F1F5-1F1F0": {
        "name": "flag: Pakistan",
        "tags": [
            "flag: Pakistan"
        ]
    },
    "1F1F5-1F1F1": {
        "name": "flag: Poland",
        "tags": [
            "flag: Poland"
        ]
    },
    "1F1F5-1F1F2": {
        "name": "flag: St. Pierre &amp; Miquelon",
        "tags": [
            "flag: St. Pierre &amp; Miquelon"
        ]
    },
    "1F1F5-1F1F3": {
        "name": "flag: Pitcairn Islands",
        "tags": [
            "flag: Pitcairn Islands"
        ]
    },
    "1F1F5-1F1F7": {
        "name": "flag: Puerto Rico",
        "tags": [
            "flag: Puerto Rico"
        ]
    },
    "1F1F5-1F1F8": {
        "name": "flag: Palestinian Territories",
        "tags": [
            "flag: Palestinian Territories"
        ]
    },
    "1F1F5-1F1F9": {
        "name": "flag: Portugal",
        "tags": [
            "flag: Portugal"
        ]
    },
    "1F1F5-1F1FC": {
        "name": "flag: Palau",
        "tags": [
            "flag: Palau"
        ]
    },
    "1F1F5-1F1FE": {
        "name": "flag: Paraguay",
        "tags": [
            "flag: Paraguay"
        ]
    },
    "1F1F6-1F1E6": {
        "name": "flag: Qatar",
        "tags": [
            "flag: Qatar"
        ]
    },
    "1F1F7-1F1EA": {
        "name": "flag: Réunion",
        "tags": [
            "flag: Réunion"
        ]
    },
    "1F1F7-1F1F4": {
        "name": "flag: Romania",
        "tags": [
            "flag: Romania"
        ]
    },
    "1F1F7-1F1F8": {
        "name": "flag: Serbia",
        "tags": [
            "flag: Serbia"
        ]
    },
    "1F1F7-1F1FA": {
        "name": "flag: Russia",
        "tags": [
            "flag: Russia"
        ]
    },
    "1F1F7-1F1FC": {
        "name": "flag: Rwanda",
        "tags": [
            "flag: Rwanda"
        ]
    },
    "1F1F8-1F1E6": {
        "name": "flag: Saudi Arabia",
        "tags": [
            "flag: Saudi Arabia"
        ]
    },
    "1F1F8-1F1E7": {
        "name": "flag: Solomon Islands",
        "tags": [
            "flag: Solomon Islands"
        ]
    },
    "1F1F8-1F1E8": {
        "name": "flag: Seychelles",
        "tags": [
            "flag: Seychelles"
        ]
    },
    "1F1F8-1F1E9": {
        "name": "flag: Sudan",
        "tags": [
            "flag: Sudan"
        ]
    },
    "1F1F8-1F1EA": {
        "name": "flag: Sweden",
        "tags": [
            "flag: Sweden"
        ]
    },
    "1F1F8-1F1EC": {
        "name": "flag: Singapore",
        "tags": [
            "flag: Singapore"
        ]
    },
    "1F1F8-1F1ED": {
        "name": "flag: St. Helena",
        "tags": [
            "flag: St. Helena"
        ]
    },
    "1F1F8-1F1EE": {
        "name": "flag: Slovenia",
        "tags": [
            "flag: Slovenia"
        ]
    },
    "1F1F8-1F1EF": {
        "name": "flag: Svalbard &amp; Jan Mayen",
        "tags": [
            "flag: Svalbard &amp; Jan Mayen"
        ]
    },
    "1F1F8-1F1F0": {
        "name": "flag: Slovakia",
        "tags": [
            "flag: Slovakia"
        ]
    },
    "1F1F8-1F1F1": {
        "name": "flag: Sierra Leone",
        "tags": [
            "flag: Sierra Leone"
        ]
    },
    "1F1F8-1F1F2": {
        "name": "flag: San Marino",
        "tags": [
            "flag: San Marino"
        ]
    },
    "1F1F8-1F1F3": {
        "name": "flag: Senegal",
        "tags": [
            "flag: Senegal"
        ]
    },
    "1F1F8-1F1F4": {
        "name": "flag: Somalia",
        "tags": [
            "flag: Somalia"
        ]
    },
    "1F1F8-1F1F7": {
        "name": "flag: Suriname",
        "tags": [
            "flag: Suriname"
        ]
    },
    "1F1F8-1F1F8": {
        "name": "flag: South Sudan",
        "tags": [
            "flag: South Sudan"
        ]
    },
    "1F1F8-1F1F9": {
        "name": "flag: São Tomé &amp; Príncipe",
        "tags": [
            "flag: São Tomé &amp; Príncipe"
        ]
    },
    "1F1F8-1F1FB": {
        "name": "flag: El Salvador",
        "tags": [
            "flag: El Salvador"
        ]
    },
    "1F1F8-1F1FD": {
        "name": "flag: Sint Maarten",
        "tags": [
            "flag: Sint Maarten"
        ]
    },
    "1F1F8-1F1FE": {
        "name": "flag: Syria",
        "tags": [
            "flag: Syria"
        ]
    },
    "1F1F8-1F1FF": {
        "name": "flag: Eswatini",
        "tags": [
            "flag: Eswatini"
        ]
    },
    "1F1F9-1F1E6": {
        "name": "flag: Tristan da Cunha",
        "tags": [
            "flag: Tristan da Cunha"
        ]
    },
    "1F1F9-1F1E8": {
        "name": "flag: Turks &amp; Caicos Islands",
        "tags": [
            "flag: Turks &amp; Caicos Islands"
        ]
    },
    "1F1F9-1F1E9": {
        "name": "flag: Chad",
        "tags": [
            "flag: Chad"
        ]
    },
    "1F1F9-1F1EB": {
        "name": "flag: French Southern Territories",
        "tags": [
            "flag: French Southern Territories"
        ]
    },
    "1F1F9-1F1EC": {
        "name": "flag: Togo",
        "tags": [
            "flag: Togo"
        ]
    },
    "1F1F9-1F1ED": {
        "name": "flag: Thailand",
        "tags": [
            "flag: Thailand"
        ]
    },
    "1F1F9-1F1EF": {
        "name": "flag: Tajikistan",
        "tags": [
            "flag: Tajikistan"
        ]
    },
    "1F1F9-1F1F0": {
        "name": "flag: Tokelau",
        "tags": [
            "flag: Tokelau"
        ]
    },
    "1F1F9-1F1F1": {
        "name": "flag: Timor-Leste",
        "tags": [
            "flag: Timor-Leste"
        ]
    },
    "1F1F9-1F1F2": {
        "name": "flag: Turkmenistan",
        "tags": [
            "flag: Turkmenistan"
        ]
    },
    "1F1F9-1F1F3": {
        "name": "flag: Tunisia",
        "tags": [
            "flag: Tunisia"
        ]
    },
    "1F1F9-1F1F4": {
        "name": "flag: Tonga",
        "tags": [
            "flag: Tonga"
        ]
    },
    "1F1F9-1F1F7": {
        "name": "flag: Turkey",
        "tags": [
            "flag: Turkey"
        ]
    },
    "1F1F9-1F1F9": {
        "name": "flag: Trinidad &amp; Tobago",
        "tags": [
            "flag: Trinidad &amp; Tobago"
        ]
    },
    "1F1F9-1F1FB": {
        "name": "flag: Tuvalu",
        "tags": [
            "flag: Tuvalu"
        ]
    },
    "1F1F9-1F1FC": {
        "name": "flag: Taiwan",
        "tags": [
            "flag: Taiwan"
        ]
    },
    "1F1F9-1F1FF": {
        "name": "flag: Tanzania",
        "tags": [
            "flag: Tanzania"
        ]
    },
    "1F1FA-1F1E6": {
        "name": "flag: Ukraine",
        "tags": [
            "flag: Ukraine"
        ]
    },
    "1F1FA-1F1EC": {
        "name": "flag: Uganda",
        "tags": [
            "flag: Uganda"
        ]
    },
    "1F1FA-1F1F2": {
        "name": "flag: U.S. Outlying Islands",
        "tags": [
            "flag: U.S. Outlying Islands"
        ]
    },
    "1F1FA-1F1F3": {
        "name": "flag: United Nations",
        "tags": [
            "flag: United Nations"
        ]
    },
    "1F1FA-1F1F8": {
        "name": "flag: United States",
        "tags": [
            "flag: United States"
        ]
    },
    "1F1FA-1F1FE": {
        "name": "flag: Uruguay",
        "tags": [
            "flag: Uruguay"
        ]
    },
    "1F1FA-1F1FF": {
        "name": "flag: Uzbekistan",
        "tags": [
            "flag: Uzbekistan"
        ]
    },
    "1F1FB-1F1E6": {
        "name": "flag: Vatican City",
        "tags": [
            "flag: Vatican City"
        ]
    },
    "1F1FB-1F1E8": {
        "name": "flag: St. Vincent &amp; Grenadines",
        "tags": [
            "flag: St. Vincent &amp; Grenadines"
        ]
    },
    "1F1FB-1F1EA": {
        "name": "flag: Venezuela",
        "tags": [
            "flag: Venezuela"
        ]
    },
    "1F1FB-1F1EC": {
        "name": "flag: British Virgin Islands",
        "tags": [
            "flag: British Virgin Islands"
        ]
    },
    "1F1FB-1F1EE": {
        "name": "flag: U.S. Virgin Islands",
        "tags": [
            "flag: U.S. Virgin Islands"
        ]
    },
    "1F1FB-1F1F3": {
        "name": "flag: Vietnam",
        "tags": [
            "flag: Vietnam"
        ]
    },
    "1F1FB-1F1FA": {
        "name": "flag: Vanuatu",
        "tags": [
            "flag: Vanuatu"
        ]
    },
    "1F1FC-1F1EB": {
        "name": "flag: Wallis &amp; Futuna",
        "tags": [
            "flag: Wallis &amp; Futuna"
        ]
    },
    "1F1FC-1F1F8": {
        "name": "flag: Samoa",
        "tags": [
            "flag: Samoa"
        ]
    },
    "1F1FD-1F1F0": {
        "name": "flag: Kosovo",
        "tags": [
            "flag: Kosovo"
        ]
    },
    "1F1FE-1F1EA": {
        "name": "flag: Yemen",
        "tags": [
            "flag: Yemen"
        ]
    },
    "1F1FE-1F1F9": {
        "name": "flag: Mayotte",
        "tags": [
            "flag: Mayotte"
        ]
    },
    "1F1FF-1F1E6": {
        "name": "flag: South Africa",
        "tags": [
            "flag: South Africa"
        ]
    },
    "1F1FF-1F1F2": {
        "name": "flag: Zambia",
        "tags": [
            "flag: Zambia"
        ]
    },
    "1F1FF-1F1FC": {
        "name": "flag: Zimbabwe",
        "tags": [
            "flag: Zimbabwe"
        ]
    },
    "1F3F4-E0067-E0062-E0065-E006E-E0067-E007F": {
        "name": "flag: England",
        "tags": [
            "flag: England"
        ]
    },
    "1F3F4-E0067-E0062-E0073-E0063-E0074-E007F": {
        "name": "flag: Scotland",
        "tags": [
            "flag: Scotland"
        ]
    },
    "1F3F4-E0067-E0062-E0077-E006C-E0073-E007F": {
        "name": "flag: Wales",
        "tags": [
            "flag: Wales"
        ]
    },
    "E000": {
        "name": "goldfish",
        "tags": [
            "goldfish"
        ]
    },
    "E001": {
        "name": "donkey",
        "tags": [
            "donkey"
        ]
    },
    "E002": {
        "name": "poppy",
        "tags": [
            "poppy"
        ]
    },
    "E003": {
        "name": "doe",
        "tags": [
            "doe"
        ]
    },
    "E004": {
        "name": "spouting-orca",
        "tags": [
            "spouting-orca"
        ]
    },
    "E005": {
        "name": "orca",
        "tags": [
            "orca"
        ]
    },
    "E006": {
        "name": "narwhal",
        "tags": [
            "narwhal"
        ]
    },
    "E007": {
        "name": "beluga",
        "tags": [
            "beluga"
        ]
    },
    "E008": {
        "name": "porpoise",
        "tags": [
            "porpoise"
        ]
    },
    "E009": {
        "name": "pigeon",
        "tags": [
            "pigeon"
        ]
    },
    "E010": {
        "name": "macaw",
        "tags": [
            "macaw"
        ]
    },
    "E011": {
        "name": "microbe",
        "tags": [
            "microbe"
        ]
    },
    "E040": {
        "name": "Twitter",
        "tags": [
            "Twitter"
        ]
    },
    "E041": {
        "name": "pinterest",
        "tags": [
            "pinterest"
        ]
    },
    "E042": {
        "name": "facebook",
        "tags": [
            "facebook"
        ]
    },
    "E043": {
        "name": "instagram",
        "tags": [
            "instagram"
        ]
    },
    "E044": {
        "name": "youtube",
        "tags": [
            "youtube"
        ]
    },
    "E045": {
        "name": "github",
        "tags": [
            "github"
        ]
    },
    "E046": {
        "name": "linkedin",
        "tags": [
            "linkedin"
        ]
    },
    "E047": {
        "name": "android",
        "tags": [
            "android"
        ]
    },
    "E048": {
        "name": "musicbrainz",
        "tags": [
            "musicbrainz"
        ]
    },
    "E049": {
        "name": "openfoodfact",
        "tags": [
            "openfoodfact"
        ]
    },
    "E04A": {
        "name": "openstreetmap",
        "tags": [
            "openstreetmap"
        ]
    },
    "E04B": {
        "name": "wikidata",
        "tags": [
            "wikidata"
        ]
    },
    "E050": {
        "name": "Firefox",
        "tags": [
            "Firefox"
        ]
    },
    "E051": {
        "name": "Safari",
        "tags": [
            "Safari"
        ]
    },
    "E052": {
        "name": "Opera",
        "tags": [
            "Opera"
        ]
    },
    "E053": {
        "name": "Chromium",
        "tags": [
            "Chromium"
        ]
    },
    "E054": {
        "name": "Chrome",
        "tags": [
            "Chrome"
        ]
    },
    "E055": {
        "name": "Netscape Navigator",
        "tags": [
            "Netscape Navigator"
        ]
    },
    "E056": {
        "name": "Internet Explorer",
        "tags": [
            "Internet Explorer"
        ]
    },
    "E057": {
        "name": "Edge",
        "tags": [
            "Edge"
        ]
    },
    "E058": {
        "name": "iNaturalist",
        "tags": [
            "iNaturalist"
        ]
    },
    "E0FF": {
        "name": "ubuntu",
        "tags": [
            "ubuntu"
        ]
    },
    "F000": {
        "name": "windows",
        "tags": [
            "windows"
        ]
    },
    "F8FF": {
        "name": "apple",
        "tags": [
            "apple"
        ]
    },
    "E2C0": {
        "name": "iceberg",
        "tags": [
            "iceberg"
        ]
    },
    "E2C1": {
        "name": "floating ice",
        "tags": [
            "floating ice"
        ]
    },
    "E2C2": {
        "name": "floating ice broken",
        "tags": [
            "floating ice broken"
        ]
    },
    "E2C3": {
        "name": "polar research station",
        "tags": [
            "polar research station"
        ]
    },
    "E2C4": {
        "name": "ice core sample",
        "tags": [
            "ice core sample"
        ]
    },
    "E2C6": {
        "name": "ice shelf",
        "tags": [
            "ice shelf"
        ]
    },
    "E2C7": {
        "name": "ice shelf melting",
        "tags": [
            "ice shelf melting"
        ]
    },
    "E2C8": {
        "name": "polar explorer",
        "tags": [
            "polar explorer"
        ]
    },
    "E2C9": {
        "name": "polar explorer man",
        "tags": [
            "polar explorer man"
        ]
    },
    "E2CA": {
        "name": "polar explorer woman",
        "tags": [
            "polar explorer woman"
        ]
    },
    "E2CB": {
        "name": "oil spill",
        "tags": [
            "oil spill"
        ]
    },
    "E2CC": {
        "name": "exhaust gases factory",
        "tags": [
            "exhaust gases factory"
        ]
    },
    "E2CD": {
        "name": "solar energy",
        "tags": [
            "solar energy"
        ]
    },
    "E2CE": {
        "name": "meat consumption",
        "tags": [
            "meat consumption"
        ]
    },
    "E2CF": {
        "name": "exhaust gases car",
        "tags": [
            "exhaust gases car"
        ]
    },
    "E2D0": {
        "name": "sea level rise",
        "tags": [
            "sea level rise"
        ]
    },
    "E2D1": {
        "name": "wind energy",
        "tags": [
            "wind energy"
        ]
    },
    "E2D2": {
        "name": "reusable bag",
        "tags": [
            "reusable bag"
        ]
    },
    "E2D3": {
        "name": "radioactive waste",
        "tags": [
            "radioactive waste"
        ]
    },
    "E2D4": {
        "name": "nuclear power plant",
        "tags": [
            "nuclear power plant"
        ]
    },
    "E2D5": {
        "name": "nuclear power plant ruin",
        "tags": [
            "nuclear power plant ruin"
        ]
    },
    "E2D6": {
        "name": "geiger counter",
        "tags": [
            "geiger counter"
        ]
    },
    "E2D7": {
        "name": "nuclear worker man",
        "tags": [
            "nuclear worker man"
        ]
    },
    "E2D8": {
        "name": "nuclear worker woman",
        "tags": [
            "nuclear worker woman"
        ]
    },
    "E2D9": {
        "name": "nuclear protection",
        "tags": [
            "nuclear protection"
        ]
    },
    "E2DA": {
        "name": "atom bomb",
        "tags": [
            "atom bomb"
        ]
    },
    "E080": {
        "name": "assembly point",
        "tags": [
            "assembly point"
        ]
    },
    "E081": {
        "name": "assembly group",
        "tags": [
            "assembly group"
        ]
    },
    "E082": {
        "name": "authority instruction",
        "tags": [
            "authority instruction"
        ]
    },
    "E083": {
        "name": "help others",
        "tags": [
            "help others"
        ]
    },
    "E084": {
        "name": "drop cover hold",
        "tags": [
            "drop cover hold"
        ]
    },
    "E085": {
        "name": "evacuate",
        "tags": [
            "evacuate"
        ]
    },
    "E086": {
        "name": "evacuate vertical",
        "tags": [
            "evacuate vertical"
        ]
    },
    "E087": {
        "name": "evacuate downstairs",
        "tags": [
            "evacuate downstairs"
        ]
    },
    "E088": {
        "name": "evacuate to shelter",
        "tags": [
            "evacuate to shelter"
        ]
    },
    "E089": {
        "name": "structural fire",
        "tags": [
            "structural fire"
        ]
    },
    "E08A": {
        "name": "wild fire",
        "tags": [
            "wild fire"
        ]
    },
    "E08B": {
        "name": "evacuate fire",
        "tags": [
            "evacuate fire"
        ]
    },
    "E08C": {
        "name": "warning tsunami",
        "tags": [
            "warning tsunami"
        ]
    },
    "E08D": {
        "name": "warning volcano",
        "tags": [
            "warning volcano"
        ]
    },
    "E08E": {
        "name": "warning fire",
        "tags": [
            "warning fire"
        ]
    },
    "E08F": {
        "name": "authority",
        "tags": [
            "authority"
        ]
    },
    "E090": {
        "name": "first aid",
        "tags": [
            "first aid"
        ]
    },
    "E091": {
        "name": "flagged point",
        "tags": [
            "flagged point"
        ]
    },
    "E092": {
        "name": "flagged building",
        "tags": [
            "flagged building"
        ]
    },
    "E093": {
        "name": "authority building",
        "tags": [
            "authority building"
        ]
    },
    "E094": {
        "name": "signpost",
        "tags": [
            "signpost"
        ]
    },
    "E095": {
        "name": "mobile info",
        "tags": [
            "mobile info"
        ]
    },
    "E096": {
        "name": "mobile message",
        "tags": [
            "mobile message"
        ]
    },
    "E097": {
        "name": "charge plug",
        "tags": [
            "charge plug"
        ]
    },
    "E098": {
        "name": "shelter",
        "tags": [
            "shelter"
        ]
    },
    "E099": {
        "name": "volcano eruption",
        "tags": [
            "volcano eruption"
        ]
    },
    "E09A": {
        "name": "volcano ashes",
        "tags": [
            "volcano ashes"
        ]
    },
    "E09B": {
        "name": "tsunami",
        "tags": [
            "tsunami"
        ]
    },
    "E09C": {
        "name": "earthquake",
        "tags": [
            "earthquake"
        ]
    },
    "E09D": {
        "name": "landslide",
        "tags": [
            "landslide"
        ]
    },
    "E09E": {
        "name": "avalanche",
        "tags": [
            "avalanche"
        ]
    },
    "E09F": {
        "name": "flood",
        "tags": [
            "flood"
        ]
    },
    "E0A0": {
        "name": "north",
        "tags": [
            "north"
        ]
    },
    "E0A1": {
        "name": "transmission",
        "tags": [
            "transmission"
        ]
    },
    "E0A2": {
        "name": "sos stencil",
        "tags": [
            "sos stencil"
        ]
    },
    "E0A3": {
        "name": "ok stencil",
        "tags": [
            "ok stencil"
        ]
    },
    "E0A4": {
        "name": "no stencil",
        "tags": [
            "no stencil"
        ]
    },
    "E0A5": {
        "name": "warning strip",
        "tags": [
            "warning strip"
        ]
    },
    "E0A6": {
        "name": "warning strip right",
        "tags": [
            "warning strip right"
        ]
    },
    "E0A7": {
        "name": "arrow turn right",
        "tags": [
            "arrow turn right"
        ]
    },
    "E0A8": {
        "name": "emergency exit door",
        "tags": [
            "emergency exit door"
        ]
    },
    "E0A9": {
        "name": "location indicator red",
        "tags": [
            "location indicator red"
        ]
    },
    "E0AA": {
        "name": "electric plug red",
        "tags": [
            "electric plug red"
        ]
    },
    "E0AB": {
        "name": "timer",
        "tags": [
            "timer"
        ]
    },
    "E0AC": {
        "name": "person with medical mask",
        "tags": [
            "person with medical mask"
        ]
    },
    "E0AC-200D-2640-FE0F": {
        "name": "woman with medical mask",
        "tags": [
            "woman with medical mask"
        ]
    },
    "E0AC-200D-2642-FE0F": {
        "name": "man with medical mask",
        "tags": [
            "man with medical mask"
        ]
    },
    "E0AD": {
        "name": "person sneezing into elbow",
        "tags": [
            "person sneezing into elbow"
        ]
    },
    "E0AD-200D-2640-FE0F": {
        "name": "woman sneezing into elbow",
        "tags": [
            "woman sneezing into elbow"
        ]
    },
    "E0AD-200D-2642-FE0F": {
        "name": "man sneezing into elbow",
        "tags": [
            "man sneezing into elbow"
        ]
    },
    "E0AE": {
        "name": "disinfect surface",
        "tags": [
            "disinfect surface"
        ]
    },
    "E0AF": {
        "name": "quarantine",
        "tags": [
            "quarantine"
        ]
    },
    "E0B0": {
        "name": "social distancing",
        "tags": [
            "social distancing"
        ]
    },
    "E0B1": {
        "name": "sanitizer spray",
        "tags": [
            "sanitizer spray"
        ]
    },
    "E0B2": {
        "name": "wash hands",
        "tags": [
            "wash hands"
        ]
    },
    "E0B3": {
        "name": "temperature taking",
        "tags": [
            "temperature taking"
        ]
    },
    "E0B4": {
        "name": "medical gloves",
        "tags": [
            "medical gloves"
        ]
    },
    "1F3F3-FE0F": {
        "name": "white flag",
        "tags": [
            "white flag"
        ]
    },
    "1F3F3-FE0F-200D-1F4CC-200D-2699-FE0F": {
        "name": "nail and gear flag",
        "tags": [
            "nail and gear flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7E5": {
        "name": "red flag",
        "tags": [
            "red flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7E6": {
        "name": "blue flag",
        "tags": [
            "blue flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7E6-200D-1F30C": {
        "name": "united federation of planets flag (star trek)",
        "tags": [
            "united federation of planets flag (star trek)"
        ]
    },
    "1F3F3-FE0F-200D-1F7E7": {
        "name": "orange flag",
        "tags": [
            "orange flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7E8": {
        "name": "yellow flag",
        "tags": [
            "yellow flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7E9": {
        "name": "green flag",
        "tags": [
            "green flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7E9-200D-2B50-200D-1F7E9": {
        "name": "esperanto flag",
        "tags": [
            "esperanto flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7EA": {
        "name": "purple flag",
        "tags": [
            "purple flag"
        ]
    },
    "1F3F3-FE0F-200D-1F7EB": {
        "name": "brown flag",
        "tags": [
            "brown flag"
        ]
    },
    "1F3F4-FE0F-200D-1F170-FE0F": {
        "name": "red and black flag",
        "tags": [
            "red and black flag"
        ]
    },
    "2691-FE0F-200D-1F7E5": {
        "name": "deep red flag",
        "tags": [
            "deep red flag"
        ]
    },
    "2691-FE0F-200D-1F7E6": {
        "name": "deep blue flag",
        "tags": [
            "deep blue flag"
        ]
    },
    "2691-FE0F-200D-1F7E7": {
        "name": "deep orange flag",
        "tags": [
            "deep orange flag"
        ]
    },
    "2691-FE0F-200D-1F7E8": {
        "name": "deep yellow flag",
        "tags": [
            "deep yellow flag"
        ]
    },
    "2691-FE0F-200D-1F7E9": {
        "name": "deep green flag",
        "tags": [
            "deep green flag"
        ]
    },
    "2691-FE0F-200D-1F7E9-200D-2605-FE0F": {
        "name": "browncoat flag",
        "tags": [
            "browncoat flag"
        ]
    },
    "2691-FE0F-200D-1F7EA": {
        "name": "deep purple flag",
        "tags": [
            "deep purple flag"
        ]
    },
    "2691-FE0F-200D-1F7EB": {
        "name": "deep brown flag",
        "tags": [
            "deep brown flag"
        ]
    },
    "E0C0": {
        "name": "half orange fruit",
        "tags": [
            "half orange fruit"
        ]
    },
    "E0C1": {
        "name": "maultasche",
        "tags": [
            "maultasche"
        ]
    },
    "E0C2": {
        "name": "lentils with spaetzle",
        "tags": [
            "lentils with spaetzle"
        ]
    },
    "E0C3": {
        "name": "pretzel",
        "tags": [
            "pretzel"
        ]
    },
    "E0C4": {
        "name": "pomegranate",
        "tags": [
            "pomegranate"
        ]
    },
    "E0C5": {
        "name": "latte macchiato",
        "tags": [
            "latte macchiato"
        ]
    },
    "E0C6": {
        "name": "roasted coffee bean",
        "tags": [
            "roasted coffee bean"
        ]
    },
    "E0C7": {
        "name": "cake",
        "tags": [
            "cake"
        ]
    },
    "E0C8": {
        "name": "champignon brown",
        "tags": [
            "champignon brown"
        ]
    },
    "E0C9": {
        "name": "champignon white",
        "tags": [
            "champignon white"
        ]
    },
    "E0CA": {
        "name": "boule bread",
        "tags": [
            "boule bread"
        ]
    },
    "E340": {
        "name": "gardener man",
        "tags": [
            "gardener man"
        ]
    },
    "E341": {
        "name": "gardener woman",
        "tags": [
            "gardener woman"
        ]
    },
    "E342": {
        "name": "gardening gloves",
        "tags": [
            "gardening gloves"
        ]
    },
    "E343": {
        "name": "lawn mower",
        "tags": [
            "lawn mower"
        ]
    },
    "E344": {
        "name": "wheelbarrow",
        "tags": [
            "wheelbarrow"
        ]
    },
    "E345": {
        "name": "spade",
        "tags": [
            "spade"
        ]
    },
    "E346": {
        "name": "trowel",
        "tags": [
            "trowel"
        ]
    },
    "E347": {
        "name": "axe",
        "tags": [
            "axe"
        ]
    },
    "E348": {
        "name": "saw",
        "tags": [
            "saw"
        ]
    },
    "E300": {
        "name": "female doctor",
        "tags": [
            "female doctor"
        ]
    },
    "E301": {
        "name": "male doctor",
        "tags": [
            "male doctor"
        ]
    },
    "E302": {
        "name": "female nurse",
        "tags": [
            "female nurse"
        ]
    },
    "E303": {
        "name": "male nurse",
        "tags": [
            "male nurse"
        ]
    },
    "E305": {
        "name": "pills",
        "tags": [
            "pills"
        ]
    },
    "E306": {
        "name": "plaster",
        "tags": [
            "plaster"
        ]
    },
    "E307": {
        "name": "medication",
        "tags": [
            "medication"
        ]
    },
    "E308": {
        "name": "ecg waves",
        "tags": [
            "ecg waves"
        ]
    },
    "E309": {
        "name": "first aid bag",
        "tags": [
            "first aid bag"
        ]
    },
    "E30A": {
        "name": "patient file",
        "tags": [
            "patient file"
        ]
    },
    "E30B": {
        "name": "patient clipboard",
        "tags": [
            "patient clipboard"
        ]
    },
    "E30C": {
        "name": "saline drip",
        "tags": [
            "saline drip"
        ]
    },
    "E30D": {
        "name": "blood transfusion",
        "tags": [
            "blood transfusion"
        ]
    },
    "E30E": {
        "name": "swab pliers",
        "tags": [
            "swab pliers"
        ]
    },
    "E30F": {
        "name": "hot-water bottle",
        "tags": [
            "hot-water bottle"
        ]
    },
    "E312": {
        "name": "liver",
        "tags": [
            "liver"
        ]
    },
    "E313": {
        "name": "stomach",
        "tags": [
            "stomach"
        ]
    },
    "E314": {
        "name": "large intestine",
        "tags": [
            "large intestine"
        ]
    },
    "E315": {
        "name": "intestine",
        "tags": [
            "intestine"
        ]
    },
    "E316": {
        "name": "kidney",
        "tags": [
            "kidney"
        ]
    },
    "E318": {
        "name": "forceps",
        "tags": [
            "forceps"
        ]
    },
    "E319": {
        "name": "brain",
        "tags": [
            "brain"
        ]
    },
    "E31A": {
        "name": "bed linen",
        "tags": [
            "bed linen"
        ]
    },
    "E31B": {
        "name": "bandage change",
        "tags": [
            "bandage change"
        ]
    },
    "E31C": {
        "name": "eye pain",
        "tags": [
            "eye pain"
        ]
    },
    "E31D": {
        "name": "headache",
        "tags": [
            "headache"
        ]
    },
    "E31E": {
        "name": "earache",
        "tags": [
            "earache"
        ]
    },
    "E31F": {
        "name": "fracture leg",
        "tags": [
            "fracture leg"
        ]
    },
    "E320": {
        "name": "knee pain",
        "tags": [
            "knee pain"
        ]
    },
    "E321": {
        "name": "backache",
        "tags": [
            "backache"
        ]
    },
    "E322": {
        "name": "joint pain",
        "tags": [
            "joint pain"
        ]
    },
    "E324": {
        "name": "clinical thermometer",
        "tags": [
            "clinical thermometer"
        ]
    },
    "E325": {
        "name": "bandage scissors",
        "tags": [
            "bandage scissors"
        ]
    },
    "E326": {
        "name": "crutches",
        "tags": [
            "crutches"
        ]
    },
    "E327": {
        "name": "wheel chair",
        "tags": [
            "wheel chair"
        ]
    },
    "E328": {
        "name": "stretcher",
        "tags": [
            "stretcher"
        ]
    },
    "E329": {
        "name": "ct scan",
        "tags": [
            "ct scan"
        ]
    },
    "E32B": {
        "name": "scales",
        "tags": [
            "scales"
        ]
    },
    "E100": {
        "name": "tap",
        "tags": [
            "tap"
        ]
    },
    "E101": {
        "name": "double tap",
        "tags": [
            "double tap"
        ]
    },
    "E102": {
        "name": "three finger operation",
        "tags": [
            "three finger operation"
        ]
    },
    "E103": {
        "name": "move",
        "tags": [
            "move"
        ]
    },
    "E104": {
        "name": "scroll",
        "tags": [
            "scroll"
        ]
    },
    "E105": {
        "name": "swipe",
        "tags": [
            "swipe"
        ]
    },
    "E106": {
        "name": "scroll horizontal",
        "tags": [
            "scroll horizontal"
        ]
    },
    "E107": {
        "name": "page move",
        "tags": [
            "page move"
        ]
    },
    "E108": {
        "name": "swipe left",
        "tags": [
            "swipe left"
        ]
    },
    "E109": {
        "name": "swipe up",
        "tags": [
            "swipe up"
        ]
    },
    "E10A": {
        "name": "swipe right",
        "tags": [
            "swipe right"
        ]
    },
    "E10B": {
        "name": "swipe down",
        "tags": [
            "swipe down"
        ]
    },
    "E10C": {
        "name": "finger pushing button",
        "tags": [
            "finger pushing button"
        ]
    },
    "E10D": {
        "name": "exit",
        "tags": [
            "exit"
        ]
    },
    "E140": {
        "name": "first aid kit",
        "tags": [
            "first aid kit"
        ]
    },
    "E141": {
        "name": "armchair",
        "tags": [
            "armchair"
        ]
    },
    "E142": {
        "name": "picture",
        "tags": [
            "picture"
        ]
    },
    "E143": {
        "name": "lighter",
        "tags": [
            "lighter"
        ]
    },
    "E144": {
        "name": "outlet",
        "tags": [
            "outlet"
        ]
    },
    "E146": {
        "name": "spätzlepresse",
        "tags": [
            "spätzlepresse"
        ]
    },
    "E147": {
        "name": "european name badge",
        "tags": [
            "european name badge"
        ]
    },
    "E148": {
        "name": "kehrwoche",
        "tags": [
            "kehrwoche"
        ]
    },
    "E149": {
        "name": "tardis",
        "tags": [
            "tardis"
        ]
    },
    "E150": {
        "name": "espresso machine",
        "tags": [
            "espresso machine"
        ]
    },
    "E151": {
        "name": "french press",
        "tags": [
            "french press"
        ]
    },
    "E152": {
        "name": "moka pot",
        "tags": [
            "moka pot"
        ]
    },
    "E153": {
        "name": "milk jug",
        "tags": [
            "milk jug"
        ]
    },
    "E154": {
        "name": "electric coffee percolator",
        "tags": [
            "electric coffee percolator"
        ]
    },
    "E155": {
        "name": "drip coffee maker",
        "tags": [
            "drip coffee maker"
        ]
    },
    "E156": {
        "name": "coffee grinder",
        "tags": [
            "coffee grinder"
        ]
    },
    "E157": {
        "name": "horse jumping hurdle",
        "tags": [
            "horse jumping hurdle"
        ]
    },
    "E181": {
        "name": "drunk person",
        "tags": [
            "drunk person"
        ]
    },
    "E182": {
        "name": "person with dog",
        "tags": [
            "person with dog"
        ]
    },
    "E183": {
        "name": "trump",
        "tags": [
            "trump"
        ]
    },
    "E184": {
        "name": "horse riding",
        "tags": [
            "horse riding"
        ]
    },
    "E185": {
        "name": "barista",
        "tags": [
            "barista"
        ]
    },
    "E186": {
        "name": "man barista",
        "tags": [
            "man barista"
        ]
    },
    "E187": {
        "name": "woman barista",
        "tags": [
            "woman barista"
        ]
    },
    "E188": {
        "name": "Greta Thunberg",
        "tags": [
            "Greta Thunberg"
        ]
    },
    "E280": {
        "name": "exhausted face",
        "tags": [
            "exhausted face"
        ]
    },
    "E281": {
        "name": "incredulous face",
        "tags": [
            "incredulous face"
        ]
    },
    "E282": {
        "name": "dejected face",
        "tags": [
            "dejected face"
        ]
    },
    "E283": {
        "name": "annoyed face with tongue",
        "tags": [
            "annoyed face with tongue"
        ]
    },
    "1FBC6-200D-1F457": {
        "name": "stick figure with dress and arms raised",
        "tags": [
            "stick figure with dress and arms raised"
        ]
    },
    "1FBC7-200D-1F457": {
        "name": "stick figure with dress leaning left",
        "tags": [
            "stick figure with dress leaning left"
        ]
    },
    "1FBC8-200D-1F457": {
        "name": "stick figure with dress leaning right",
        "tags": [
            "stick figure with dress leaning right"
        ]
    },
    "2B21-FE0F-200D-1F308": {
        "name": "rainbow hexagon",
        "tags": [
            "rainbow hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7E5": {
        "name": "red hexagon",
        "tags": [
            "red hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7E6": {
        "name": "blue hexagon",
        "tags": [
            "blue hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7E7": {
        "name": "orange hexagon",
        "tags": [
            "orange hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7E8": {
        "name": "yellow hexagon",
        "tags": [
            "yellow hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7E9": {
        "name": "green hexagon",
        "tags": [
            "green hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7EA": {
        "name": "purple hexagon",
        "tags": [
            "purple hexagon"
        ]
    },
    "2B21-FE0F-200D-1F7EB": {
        "name": "brown hexagon",
        "tags": [
            "brown hexagon"
        ]
    },
    "E380": {
        "name": "no handshaking",
        "tags": [
            "no handshaking"
        ]
    },
    "E381": {
        "name": "web syndication",
        "tags": [
            "web syndication"
        ]
    },
    "E1C0": {
        "name": "wireframes",
        "tags": [
            "wireframes"
        ]
    },
    "E1C1": {
        "name": "code editor",
        "tags": [
            "code editor"
        ]
    },
    "E1C2": {
        "name": "autonomous car",
        "tags": [
            "autonomous car"
        ]
    },
    "E1C3": {
        "name": "switch",
        "tags": [
            "switch"
        ]
    },
    "E1C4": {
        "name": "surveillance",
        "tags": [
            "surveillance"
        ]
    },
    "E1C6": {
        "name": "augmented reality",
        "tags": [
            "augmented reality"
        ]
    },
    "E1C7": {
        "name": "led",
        "tags": [
            "led"
        ]
    },
    "E1C8": {
        "name": "motor",
        "tags": [
            "motor"
        ]
    },
    "E1C9": {
        "name": "raspberry pi",
        "tags": [
            "raspberry pi"
        ]
    },
    "E1CA": {
        "name": "virtual reality",
        "tags": [
            "virtual reality"
        ]
    },
    "E1CB": {
        "name": "cable",
        "tags": [
            "cable"
        ]
    },
    "E1CC": {
        "name": "tablet",
        "tags": [
            "tablet"
        ]
    },
    "E1CD": {
        "name": "gps",
        "tags": [
            "gps"
        ]
    },
    "E1CE": {
        "name": "smartwatch",
        "tags": [
            "smartwatch"
        ]
    },
    "E1CF": {
        "name": "washing machine",
        "tags": [
            "washing machine"
        ]
    },
    "E1D0": {
        "name": "ibeacon",
        "tags": [
            "ibeacon"
        ]
    },
    "E1D1": {
        "name": "keyboard",
        "tags": [
            "keyboard"
        ]
    },
    "E1D2": {
        "name": "drone",
        "tags": [
            "drone"
        ]
    },
    "E1D3": {
        "name": "arduino",
        "tags": [
            "arduino"
        ]
    },
    "E1D4": {
        "name": "wire",
        "tags": [
            "wire"
        ]
    },
    "E1D5": {
        "name": "potentiometer",
        "tags": [
            "potentiometer"
        ]
    },
    "E1D6": {
        "name": "solar cell",
        "tags": [
            "solar cell"
        ]
    },
    "E1D7": {
        "name": "circuit",
        "tags": [
            "circuit"
        ]
    },
    "E200": {
        "name": "cafeteria",
        "tags": [
            "cafeteria"
        ]
    },
    "E201": {
        "name": "emergency exit",
        "tags": [
            "emergency exit"
        ]
    },
    "E202": {
        "name": "stairway",
        "tags": [
            "stairway"
        ]
    },
    "E203": {
        "name": "town",
        "tags": [
            "town"
        ]
    },
    "E204": {
        "name": "elevator",
        "tags": [
            "elevator"
        ]
    },
    "E205": {
        "name": "eiffel tower",
        "tags": [
            "eiffel tower"
        ]
    },
    "E206": {
        "name": "parking garage",
        "tags": [
            "parking garage"
        ]
    },
    "E207": {
        "name": "schwäbisch gmünd forum gold und silber",
        "tags": [
            "schwäbisch gmünd forum gold und silber"
        ]
    },
    "E208": {
        "name": "schwäbisch gmünd fünfknopfturm",
        "tags": [
            "schwäbisch gmünd fünfknopfturm"
        ]
    },
    "E209": {
        "name": "schwäbisch gmünd ratshaus",
        "tags": [
            "schwäbisch gmünd ratshaus"
        ]
    },
    "E20A": {
        "name": "stuttgart fernsehturm",
        "tags": [
            "stuttgart fernsehturm"
        ]
    },
    "E20B": {
        "name": "space shuttle",
        "tags": [
            "space shuttle"
        ]
    },
    "E20C": {
        "name": "viennese coffee house",
        "tags": [
            "viennese coffee house"
        ]
    },
    "E20D": {
        "name": "black hole",
        "tags": [
            "black hole"
        ]
    },
    "E20E": {
        "name": "foggy mountain",
        "tags": [
            "foggy mountain"
        ]
    },
    "E240": {
        "name": "mark",
        "tags": [
            "mark"
        ]
    },
    "E241": {
        "name": "toggle button",
        "tags": [
            "toggle button"
        ]
    },
    "E242": {
        "name": "location indicator",
        "tags": [
            "location indicator"
        ]
    },
    "E243": {
        "name": "scale",
        "tags": [
            "scale"
        ]
    },
    "E244": {
        "name": "locomotion",
        "tags": [
            "locomotion"
        ]
    },
    "E245": {
        "name": "toggle button state B",
        "tags": [
            "toggle button state B"
        ]
    },
    "E246": {
        "name": "people dialogue",
        "tags": [
            "people dialogue"
        ]
    },
    "E247": {
        "name": "safety",
        "tags": [
            "safety"
        ]
    },
    "E248": {
        "name": "chats",
        "tags": [
            "chats"
        ]
    },
    "E249": {
        "name": "collaboration",
        "tags": [
            "collaboration"
        ]
    },
    "E24A": {
        "name": "interview",
        "tags": [
            "interview"
        ]
    },
    "E24B": {
        "name": "intricate",
        "tags": [
            "intricate"
        ]
    },
    "E24C": {
        "name": "simple",
        "tags": [
            "simple"
        ]
    },
    "E24D": {
        "name": "return, back button",
        "tags": [
            "return, back button"
        ]
    },
    "E24E": {
        "name": "close",
        "tags": [
            "close"
        ]
    },
    "E24F": {
        "name": "forward",
        "tags": [
            "forward"
        ]
    },
    "E250": {
        "name": "hamburger menu",
        "tags": [
            "hamburger menu"
        ]
    },
    "E251": {
        "name": "upload",
        "tags": [
            "upload"
        ]
    },
    "E252": {
        "name": "download",
        "tags": [
            "download"
        ]
    },
    "E253": {
        "name": "share",
        "tags": [
            "share"
        ]
    },
    "E254": {
        "name": "wifi",
        "tags": [
            "wifi"
        ]
    },
    "E255": {
        "name": "copy",
        "tags": [
            "copy"
        ]
    },
    "E256": {
        "name": "contacts",
        "tags": [
            "contacts"
        ]
    },
    "E257": {
        "name": "filter",
        "tags": [
            "filter"
        ]
    },
    "E258": {
        "name": "cursor",
        "tags": [
            "cursor"
        ]
    },
    "E259": {
        "name": "details",
        "tags": [
            "details"
        ]
    },
    "E25A": {
        "name": "hold",
        "tags": [
            "hold"
        ]
    },
    "E25B": {
        "name": "duplicate",
        "tags": [
            "duplicate"
        ]
    },
    "E25C": {
        "name": "save",
        "tags": [
            "save"
        ]
    },
    "E25D": {
        "name": "edit",
        "tags": [
            "edit"
        ]
    },
    "E25E": {
        "name": "home button",
        "tags": [
            "home button"
        ]
    },
    "E25F": {
        "name": "add button",
        "tags": [
            "add button"
        ]
    },
    "E260": {
        "name": "archive",
        "tags": [
            "archive"
        ]
    },
    "E261": {
        "name": "overview",
        "tags": [
            "overview"
        ]
    },
    "E262": {
        "name": "delete",
        "tags": [
            "delete"
        ]
    },
    "E263": {
        "name": "comment",
        "tags": [
            "comment"
        ]
    },
    "E264": {
        "name": "more information",
        "tags": [
            "more information"
        ]
    },
    "E265": {
        "name": "sort",
        "tags": [
            "sort"
        ]
    },
    "E266": {
        "name": "inbox",
        "tags": [
            "inbox"
        ]
    },
    "E267": {
        "name": "compose",
        "tags": [
            "compose"
        ]
    },
    "E268": {
        "name": "add contact",
        "tags": [
            "add contact"
        ]
    },
    "E269": {
        "name": "link",
        "tags": [
            "link"
        ]
    },
    "1F3F4-E0063-E0061-E0071-E0063-E007F": {
        "name": "quebec flag",
        "tags": [
            "quebec flag"
        ]
    },
    "1F3F4-E0064-E0065-E0062-E0065-E007F": {
        "name": "berlin flag",
        "tags": [
            "berlin flag"
        ]
    },
    "1F3F4-E0064-E0065-E0062-E0079-E007F": {
        "name": "bavaria flag",
        "tags": [
            "bavaria flag"
        ]
    },
    "1F3F4-E0065-E0073-E0061-E0073-E007F": {
        "name": "asturian flag",
        "tags": [
            "asturian flag"
        ]
    },
    "1F3F4-E0065-E0073-E0063-E0074-E007F": {
        "name": "catalonia flag",
        "tags": [
            "catalonia flag"
        ]
    },
    "1F3F4-E0065-E0073-E0070-E0076-E007F": {
        "name": "basque flag",
        "tags": [
            "basque flag"
        ]
    },
    "1F3F4-E0066-E0072-E0062-E0072-E0065-E007F": {
        "name": "bretagne flag",
        "tags": [
            "bretagne flag"
        ]
    },
    "1F3F4-E0075-E0073-E0063-E0061-E007F": {
        "name": "california flag",
        "tags": [
            "california flag"
        ]
    },
    "1F3F4-E0075-E0073-E0074-E0078-E007F": {
        "name": "texas flag",
        "tags": [
            "texas flag"
        ]
    },
    "1F10D": {
        "name": "circled zero with slash",
        "tags": [
            "circled zero with slash"
        ]
    },
    "1F10E": {
        "name": "circled anticlockwise arrow",
        "tags": [
            "circled anticlockwise arrow"
        ]
    },
    "1F10F": {
        "name": "circled dollar sign with overlaid backslash",
        "tags": [
            "circled dollar sign with overlaid backslash"
        ]
    },
    "1F12F": {
        "name": "copyleft symbol",
        "tags": [
            "copyleft symbol"
        ]
    },
    "1F16D": {
        "name": "circled cc",
        "tags": [
            "circled cc"
        ]
    },
    "1F16E": {
        "name": "circled c with overlaid backslash",
        "tags": [
            "circled c with overlaid backslash"
        ]
    },
    "1F16F": {
        "name": "circled human figure",
        "tags": [
            "circled human figure"
        ]
    },
    "1F431-200D-1F4BB": {
        "name": "hacker cat",
        "tags": [
            "hacker cat"
        ]
    },
    "1FBC5": {
        "name": "stick figure",
        "tags": [
            "stick figure"
        ]
    },
    "1FBC6": {
        "name": "stick figure with arms raised",
        "tags": [
            "stick figure with arms raised"
        ]
    },
    "1FBC7": {
        "name": "stick figure leaning left",
        "tags": [
            "stick figure leaning left"
        ]
    },
    "1FBC8": {
        "name": "stick figure leaning right",
        "tags": [
            "stick figure leaning right"
        ]
    },
    "1FBC9": {
        "name": "stick figure with dress",
        "tags": [
            "stick figure with dress"
        ]
    },
    "229C": {
        "name": "circled equals",
        "tags": [
            "circled equals"
        ]
    },
    "23FB": {
        "name": "power symbol",
        "tags": [
            "power symbol"
        ]
    },
    "23FC": {
        "name": "power on-off symbol",
        "tags": [
            "power on-off symbol"
        ]
    },
    "23FD": {
        "name": "power on symbol",
        "tags": [
            "power on symbol"
        ]
    },
    "23FE": {
        "name": "power sleep symbol",
        "tags": [
            "power sleep symbol"
        ]
    },
    "25A1": {
        "name": "white square",
        "tags": [
            "white square"
        ]
    },
    "25AC": {
        "name": "black rectangle",
        "tags": [
            "black rectangle"
        ]
    },
    "25AD": {
        "name": "white rectangle",
        "tags": [
            "white rectangle"
        ]
    },
    "25D0": {
        "name": "circle with left half black",
        "tags": [
            "circle with left half black"
        ]
    },
    "25D1": {
        "name": "circle with right half black",
        "tags": [
            "circle with right half black"
        ]
    },
    "25E7": {
        "name": "square with left half black",
        "tags": [
            "square with left half black"
        ]
    },
    "25E8": {
        "name": "square with right half black",
        "tags": [
            "square with right half black"
        ]
    },
    "25E9": {
        "name": "square with upper left diagonal black",
        "tags": [
            "square with upper left diagonal black"
        ]
    },
    "25EA": {
        "name": "square with lower right diagonal black",
        "tags": [
            "square with lower right diagonal black"
        ]
    },
    "25ED": {
        "name": "up-pointing triangle with left half black",
        "tags": [
            "up-pointing triangle with left half black"
        ]
    },
    "25EE": {
        "name": "up-pointing triangle with right half black",
        "tags": [
            "up-pointing triangle with right half black"
        ]
    },
    "2B0C": {
        "name": "left right black arrow",
        "tags": [
            "left right black arrow"
        ]
    },
    "2B0D": {
        "name": "up down black arrow",
        "tags": [
            "up down black arrow"
        ]
    },
    "2B1F": {
        "name": "black pentagon",
        "tags": [
            "black pentagon"
        ]
    },
    "2B20": {
        "name": "white pentagon",
        "tags": [
            "white pentagon"
        ]
    },
    "2B21": {
        "name": "white hexagon",
        "tags": [
            "white hexagon"
        ]
    },
    "2B22": {
        "name": "black hexagon",
        "tags": [
            "black hexagon"
        ]
    },
    "2B23": {
        "name": "horizontal black hexagon ",
        "tags": [
            "horizontal black hexagon "
        ]
    },
    "2B24": {
        "name": "black large circle",
        "tags": [
            "black large circle"
        ]
    },
    "2B2E": {
        "name": "black vertical ellipse",
        "tags": [
            "black vertical ellipse"
        ]
    },
    "2B2F": {
        "name": "white vertical ellipse",
        "tags": [
            "white vertical ellipse"
        ]
    },
    "2B58": {
        "name": "heavy circle",
        "tags": [
            "heavy circle"
        ]
    },
    "2B8F": {
        "name": "anticlockwise triangle-headed top u-shaped arrow",
        "tags": [
            "anticlockwise triangle-headed top u-shaped arrow"
        ]
    },
    "2BBA": {
        "name": "overlapping white squares",
        "tags": [
            "overlapping white squares"
        ]
    },
    "2BBB": {
        "name": "overlapping white and black squares",
        "tags": [
            "overlapping white and black squares"
        ]
    },
    "2BBC": {
        "name": "overlapping black squares",
        "tags": [
            "overlapping black squares"
        ]
    },
    "2BC3": {
        "name": "horizontal black octagon",
        "tags": [
            "horizontal black octagon"
        ]
    },
    "2BC4": {
        "name": "black octagon",
        "tags": [
            "black octagon"
        ]
    },
    "2BEA": {
        "name": "star with left half black",
        "tags": [
            "star with left half black"
        ]
    },
    "2BEB": {
        "name": "star with right half black",
        "tags": [
            "star with right half black"
        ]
    }
}