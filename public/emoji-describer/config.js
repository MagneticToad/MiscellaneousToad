const config = {
    nameOfGame: "Emoji Describer",
    landingPage: "landing",
    devMode: false,
    socketURL: "wss://uuql9ukc55.execute-api.ap-southeast-2.amazonaws.com/Test",
    postGameLingerTime: 10,
    usernameFormat: /^[a-zA-Z0-9][ a-zA-Z0-9]{0,14}$/,
    offeredTimerTimes: [30, 45, 60, 75, 90, 120, 150, 180, 240, 300],
    lobbyPlayerColours: ['text-red-600', 'text-purple-600', 'text-green-600', 'text-orange-600', 'text-sky-600', 'text-fuchsia-600', 'text-emerald-600', 'text-cyan-600', 'text-pink-600', 'text-yellow-600', 'text-teal-600', 'text-lime-600', 'text-violet-600', 'text-amber-600', 'text-indigo-600', 'text-rose-600'],
    emojiSearchLimit: 18,
    lobbyCodeFormat: /^[A-Z]{5}$/,
    animationsEnabled: false,
    bgAnimationGap: {
        lower: 5,
        upper: 10
    }
};