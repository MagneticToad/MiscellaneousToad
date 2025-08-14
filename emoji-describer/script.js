document.addEventListener('alpine:init', () => {
    window.addEventListener("send", (event) => {
        Alpine.store('connection').send(event.detail);
    });

    window.addEventListener("navigateto", (event) => {
        Alpine.store('pages').navigateTo(event.detail);
    })

    Alpine.store('pages', {
        init() {
            this.list = [...document.querySelectorAll("[data-page]")].map(x => x.dataset.page);
            this.navigateTo(config.landingPage);
        },
        list: [],
        currentPage: "",
        navigateTo(page) {
            this.currentPage = page;
        }
    })

    Alpine.store('connection', {
        webSocket: undefined,
        attemptConnection(username, code = undefined) {
            if (this.webSocket == undefined || this.webSocket.readyState == WebSocket.CLOSED) {
                this.webSocket = new WebSocket(`${config.socketURL}?username=${username}`);
                this.webSocket.onopen = function(event) {
                    window.dispatchEvent(new CustomEvent("connected"));
                    if (code && config.lobbyCodeFormat.test(code)) { //if a code was given, and it is valid
                        window.dispatchEvent(new CustomEvent("send", {detail: {type: 'joinLobby', lobbyCode: code}}));
                    } else { //if not direct joining
                        window.dispatchEvent(new CustomEvent("navigateto", {detail: "home"}));
                    }
                }
                this.webSocket.onclose = function(event) {
                    window.dispatchEvent(new CustomEvent("disconnected"));
                    window.dispatchEvent(new CustomEvent("navigateto", {detail: "landing"}));
                }
                this.webSocket.onmessage = function(event) {
                    console.log(event);
                    message = JSON.parse(event.data);
                    window.dispatchEvent(new CustomEvent(message.type.toLowerCase(), {detail: message}));
                }
                this.webSocket.onerror = function(event) {
                    alert("Connection failed!");
                    window.dispatchEvent(new CustomEvent("connectionfailed"));
                }
            }
        },
        send(params) {
            if (this.webSocket?.readyState == WebSocket.OPEN) {
                params.action = "onMessage";
                console.log(params);
		        this.webSocket.send(JSON.stringify(params));
            }
        }
    });

    Alpine.store('util', {
        stringToColour(string) {
            if (!string) {
                return;
            }
            let hash = string.split("").reduce((accumulator, currentValue) => accumulator + currentValue.charCodeAt(), 0);
            return config.lobbyPlayerColours[hash%config.lobbyPlayerColours.length];
        },
        isScrolled(element) {
            return element.scrollTop + element.clientHeight >= element.scrollHeight
        },
        scroll(element) {
            element.scrollTop = element.scrollHeight
        }
    });

    Alpine.data('login', () => ({
        username: "",
        loggingIn: false,
        code: "",
        init() {
            if (/^\?directJoin=[A-Z]{5}$/.test(window.location.search)) {
                this.code = window.location.search.substring(12);
                try {
                    window.history.replaceState({}, document.title, '/emoji-describer/');
                } catch {
                    console.log("Could not replace URL");
                }
            }
        },
        validUsername() {
            return config.usernameFormat.test(this.username);
        },
        login() {
            if (this.validUsername() && !this.loggingIn) {
                this.$store.connection.attemptConnection(this.username, this.code);
                this.loggingIn = true;
            }
        },
        sanitiseUsername() {
            this.username = this.username.replace(/[^A-Za-z0-9 ]/g, '').replace(/^ /, '').replace(/(?<=.{15}).$/g, '')
        }
    }));

    Alpine.bind('loginEvents', () => ({
        ['@connected.window']() {
            this.loggingIn = false;
        },
        ['@connectionfailed.window']() {
            this.loggingIn = false;
        }
    }));

    Alpine.bind('homeEvents', () => ({
        ['@leavelobby.window']() {
            this.$dispatch('navigateto', this.$el.dataset.page);
        },
        ['@lobbydeleted.window']() {
            this.$dispatch('navigateto', this.$el.dataset.page);
            alert('The lobby you were in was deleted');
        }
    }));

    Alpine.data('createLobby', () => ({
        creating: false,
        create() {
            this.$dispatch('send', {type: 'createLobby'});
            this.creating = true;
        }
    }));

    Alpine.bind('creatingEvents', () => ({
        ['@movetolobby.window']() {
            this.creating = false;
        },
        ['@alreadyinlobby.window']() {
            if (this.$event.detail.intent === 'create') {
                alert('Failed to create a lobby as you are already in one. If this appears to be an error, refresh the page and try again.');
                this.creating = false;
            }
        },
        ['@unexpectederror.window']() {
            this.creating = false;
        }
    }));

    Alpine.data('joinLobby', () => ({
        code: '',
        joining: false,
        join() {
            if (this.validCode()) {
                this.joining = true;
                this.$dispatch('send', {type: 'joinLobby', lobbyCode: this.code});
            }
        },
        sanitiseCode() {
            this.code = this.code.replace(/[^A-Za-z]/g, '').replace(/(?<=.{5}).$/g, '').toUpperCase()
        },
        validCode() {
            return config.lobbyCodeFormat.test(this.code);
        }
    }));

    Alpine.bind('joiningEvents', () => ({
        ['@movetolobby.window']() {
            this.joining = false;
        },
        ['@lobbynotfound.window']() {
            alert("Lobby not found!");
            this.joining = false;
            this.$dispatch('navigateto', 'home');
            this.code = "";
        },
        ['@invalidlobbycobe.window']() {
            alert("Invalid code");
            this.joining = false;
            this.code = "";
        },
        ['@alreadyinlobby.window']() {
            if (this.$event.detail.intent === 'join') {
                alert('Failed to join the lobby as you are already in one. If this appears to be an error, refresh the page and try again.');
                this.joining = false;
            }
        },
        ['@unexpectederror.window']() {
            this.joining = false;
            this.code = "";
        }
    }));
    
    Alpine.data('chatWindow', () => ({
        messages: [],
        scrollIfScrolled(el) {
            if (this.$store.util.isScrolled(el)) {
                this.$nextTick(() => this.$store.util.scroll(el));
            }
        },
        addMessage(message) {
            this.messages.push([{text: message.sender, styles: `${this.$store.util.stringToColour(message.sender)} font-medium`}, {text: message.isSender ? ' (You)' : '', styles: `${this.$store.util.stringToColour(message.sender)} font-medium`}, {text: `: ${message.message}`}]);
            this.messages.push(message);
            this.scrollIfScrolled(this.$el);
        }
    }));

    Alpine.data('chatSend', (type) => ({
        message: "",
        send() {
            if (this.validMessage()) {
                this.$dispatch('send', {type: type, message: this.message});
                this.message = '';
            }
        },
        validMessage() {
            return this.message.length > 0;
        }
    }));

    Alpine.data('invite', () => ({
        lobbyCode: '',
        copied: false,
        copyLink() {
            navigator.clipboard.writeText(`${window.location.href.replace(/\?.*$/, '')}?directJoin=${this.lobbyCode}`);
            this.copied = true;
            setTimeout(() => this.copied = false, 750)
        }
    }));

    Alpine.bind('lobbyPlayersEvents', () => ({
        ['@movetolobby.window']() {
            this.others = this.$event.detail.otherPlayers;
        },
        ['@playerjoinedlobby.window']() {
            this.others = this.$event.detail.otherPlayers;
        },
        ['@playerleftlobby.window']() {
            this.others = this.$event.detail.otherPlayers;
        }
    }));

    Alpine.data('settings', () => ({
        mode: "",
        promptMasks: false,
        promptOptions: false,
        rounds: 0,
        timer: false,
        timerTime: 0,
        changeSetting(id, value) {
            this.$dispatch('send', {type: 'changeSetting', setting: id, newValue: value})
        },
        settingsChanged(settings) {
            Object.keys(settings).forEach((id) => {
                this.settingChanged(id, settings[id]);
            })
        },
        settingChanged(id, value) {
            this[id] = value;
        }
    }));

    Alpine.bind('settingsEvents', () => ({
        ['@movetolobby.window']() {
            this.settingsChanged(this.$event.detail.settings);
        },
        ['@settingchanged.window']() {
            this.settingChanged(this.$event.detail.setting, this.$event.detail.newValue);
        }
    }));

    Alpine.data('startGame', () => ({
        starting: false,
        start() {
            this.$dispatch('send', {type: 'startGame'});
            this.starting = true;
        }
    }));

    Alpine.bind('startGameEvents', () => ({
        ['@begingame.window']() {
            this.starting = false;
        },
        ['@unexpectederror.window']() {
            this.starting = false;
        }
    }));

    Alpine.data('leaveLobby', () => ({
        leaving: false,
        leave() {
            this.$dispatch('send', {type: 'leaveLobby'});
            this.leaving = true;
        }
    }));

    Alpine.bind('leaveLobbyEvents', () => ({
        ['@leavelobby.window']() {
            this.leaving = false;
        },
        ['@unexpectederror.window']() {
            this.leaving = false;
        }
    }));

    Alpine.data('game', () => ({
        waitingForSelection: false,
        youAreDescriber: false,
        otherPlayers: [],
        round: 0,
        newRound: false,
        describer: {},
        promptOptions: [],
        prompt: "",
        category: "",
        promptMask: "",
        you: {},
        maxRounds: 0,
        timeTurnEnding: 0,
        gameOver: false,
    }));

    Alpine.bind('gameEvents', () => ({
        ['@begingame.window']() {
            //These are always defined
            this.waitingForSelection = this.$event.detail.waitingForSelection;
            this.youAreDescriber = this.$event.detail.youAreDescriber;
            this.you = this.$event.detail.you;
            this.describer = this.$event.detail.describer;
            this.otherPlayers = this.$event.detail.otherPlayers;
            this.round = this.$event.detail.round;
            this.maxRounds = this.$event.detail.maxRounds;
            this.newRound = this.$event.detail.newRound;
            //These might not be
            this.timeTurnEnding = this.$event.detail.timeTurnEnding;
            this.promptOptions = this.$event.detail.promptOptions;
            this.category = this.$event.detail.category;
            this.prompt = this.$event.detail.prompt;
            this.promptMask = this.$event.detail.promptMask;
            this.$dispatch('navigateto', 'game');
        },
        ['@continuegame.window']() {
            //These are always defined
            this.waitingForSelection = this.$event.detail.waitingForSelection;
            this.youAreDescriber = this.$event.detail.youAreDescriber;
            this.you = this.$event.detail.you;
            this.describer = this.$event.detail.describer;
            this.otherPlayers = this.$event.detail.otherPlayers;
            this.round = this.$event.detail.round;
            this.maxRounds = this.$event.detail.maxRounds;
            this.newRound = this.$event.detail.newRound;
            //These might not be
            this.timeTurnEnding = this.$event.detail.timeTurnEnding;
            this.promptOptions = this.$event.detail.promptOptions;
            this.category = this.$event.detail.category;
            this.prompt = this.$event.detail.prompt;
            this.promptMask = this.$event.detail.promptMask;
			this.gameOver = false;
        },
        ['@playerjoinedgame.window']() {
            this.youAreDescriber = this.$event.detail.youAreDescriber;
            this.otherPlayers = this.$event.detail.otherPlayers;
            this.describer = this.$event.detail.describer;
            this.you = this.$event.detail.you;
        },
        ['@playerleftgame.window']() {
            this.youAreDescriber = this.$event.detail.youAreDescriber;
            this.otherPlayers = this.$event.detail.otherPlayers;
            this.describer = this.$event.detail.describer;
            this.you = this.$event.detail.you;
        },
        ['@promptselected.window']() {
            this.waitingForSelection = false;
            this.youAreDescriber = this.$event.detail.youAreDescriber;
            this.category = this.$event.detail.category;
            this.prompt = this.$event.detail.prompt;
            this.promptMask = this.$event.detail.promptMask;
        },
        ['@gameended.window']() {
            this.otherPlayers = this.$event.detail.otherPlayers;
            this.you = this.$event.detail.you;
            this.describer = undefined; //not explicitly given by the event but implied; there is no describer once the game has ended
            this.youAreDescriber = false; //see above
            this.waitingForSelection = false;
            this.gameOver = true;
            setTimeout(() => this.$dispatch('movetolobby', {lobbyCode: this.$event.detail.lobbyCode, settings: this.$event.detail.settings, otherPlayers: this.$event.detail.otherPlayers.map(x => x.username), you: this.$event.detail.you.username}), config.postGameLingerTime * 1000); //move to lobby wants an array of usernames, not objects with username and score
        }
    }));

    Alpine.data('timer', () => ({
        timeRemaining: 0,
        active: false,
        timerInterval: 0,
        startTimer(endTime) {
            clearInterval(this.timerInterval); //clear the last timer
            if (!endTime) { //if undefined
                this.active = false;
                return; //don't need to do anything
            }
            this.active = true;
            this.timeRemaining = this.secondsRemaining(endTime);
            this.timerInterval = setInterval(() => {
                let secondsRemainig = this.secondsRemaining(endTime);
                if (secondsRemainig >= 0) {
                    this.timeRemaining = secondsRemainig;
                } else {
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        },
        secondsRemaining(endTime) {
            return Math.round((endTime - Date.now())/1000);
        },
        cancel() {
            clearInterval(this.timeRemaining);
            this.active = false;
        }
    }));

    Alpine.bind('timerEvents', () => ({
        ['@begingame.window']() {
            this.startTimer(this.$event.detail.timeTurnEnding);
        },
        ['@continuegame.window']() {
            this.startTimer(this.$event.detail.timeTurnEnding);
        },
        ['@gameended.window']() {
            this.cancel();
        }
    }));

    Alpine.data('selectPrompt', () => ({
        selecting: false,
        select(index) {
            if (!this.selecting) {
                this.$dispatch('send', {type: 'selectPrompt', promptNumber: index + 1}); //selectPrompt is 1-based but index is 0-based
                this.selecting = true;
            }
        }
    }));

    Alpine.bind('selectingEvents', () => ({
        ['@promptselected.window']() {
            this.selecting = false;
        },
        ['@unexpectederror.window']() {
            this.selecting = false;
        }
    }));
    
    Alpine.bind('clueEvents', () => ({
        ['@incomingclue.window']() {
            this.clues.push(this.$event.detail.clue);
            this.$nextTick(() => this.$store.util.scroll(this.$el));
        },
        ['@begingame.window']() {
            this.clues = [];
        },
        ['@continuegame.window']() {
            this.clues = [];
        }
    }));

    Alpine.data('buildClue', () => ({
        query: '',
        searchResults: [],
        clue: [],
        fastSearch: false,
        sending: false,
        search() {
            this.searchResults = getMatchingEmojis(this.query);
            if (!this.fastSearch) {
                this.query = '';
            }
        },
        sendClue() {
            this.$dispatch('send', {type: 'sendClue', clue: this.clue});
            this.clue = [];
            this.sending = true;
        },
        addToClue(code) {
            this.clue.push(code);
            this.$nextTick(() => this.$store.util.scroll(this.$refs.cluePreview));
        },
        startWithRandom() {
            this.query = '';
            this.clue = [];
            this.searchResults = getRandomEmojis();
        }
    }));

    Alpine.bind('buildClueEvents', () => ({
        ['@begingame.window']() {
            if (this.$event.detail.youAreDescriber && !this.$event.detail.waitingForSelection) {
                this.startWithRandom();
            }
        },
        ['@continuegame.window']() {
            if (this.$event.detail.youAreDescriber && !this.$event.detail.waitingForSelection) {
                this.startWithRandom();
            }
        },
        ['@promptselected.window']() {
            if (this.$event.detail.youAreDescriber) {
                this.startWithRandom();
            }
        },
        ['@incomingclue.window']() {
            this.sending = false;
        },
        ['@unexpectederror.window']() {
            this.sending = false;
        }
    }));

    Alpine.data('guesses', () => ({
        messages: [],
        showGuess(detail) {
            this.showMessage([{text: detail.guesser, styles: `${this.$store.util.stringToColour(detail.guesser)} font-medium`}, {text: detail.isGuesser ? ' (You)' : '', styles: `${this.$store.util.stringToColour(detail.guesser)} font-medium`}, {text: `: ${detail.guess}`}]);
        },
        showCorrectGuess(detail) {
            this.showMessage([{text: detail.guesser, styles: `${this.$store.util.stringToColour(detail.guesser)} font-medium`}, {text: ' has guessed correctly! The prompt was '}, {text: detail.prompt, styles: 'font-medium'}]);
        },
        showTimeout(detail) {
            this.showMessage(detail.prompt ? [{text: 'Times up! The prompt was '}, {text: detail.prompt, styles: 'font-medium'}] : [{text: 'Times up!'}]);
        },
        showBegin(detail) {
            this.messages = [];
            this.showProgress(detail);
        },
        showProgress(detail) {
            if (detail.newRound) {
                this.showMessage([{text: `Round ${detail.round}`, styles: 'font-medium'}], true);
            }
            this.showMessage([{text: `${detail.describer.username}`, styles: `${this.$store.util.stringToColour(detail.describer.username)} font-medium`}, {text: '\'s turn to describe'}], true);
            if (detail.waitingForSelection) {
                this.showMessage([{text: detail.describer.username, styles: `${this.$store.util.stringToColour(detail.describer.username)} font-medium`}, {text: ' is choosing a prompt'}], true);
            } else {
                this.showMessage([{text: 'The category is '}, {text: detail.category, styles: 'font-medium'}]);
            }
        },
        showSelected(detail) {
            this.showMessage([{text: detail.describerName, styles: `${this.$store.util.stringToColour(detail.describerName)} font-medium`}, {text: ' has chosen a '}, {text: detail.category, styles: 'font-medium'}], true);
        },
        showEnded(detail) {
            this.showMessage([{text: 'Game over!', styles: 'font-medium'}], true);
            let message = [{text: detail.winners.length > 1 ? 'The winners are ' : 'The winner is '}];
            for (let i = 0; i < detail.winners.length; i++) {
                message.push({text: detail.winners[i], styles: `${this.$store.util.stringToColour(detail.winners[i])} font-medium`});
                if (i == detail.winners.length - 2) { //second to last
                    message.push({text: ' and '});
                } else if (i < detail.winners.length - 2) {//before that
                    message.push({text: ', '});
                }
            }
            this.showMessage(message, true);
            this.showMessage([{text: `Returning to the lobby in ${config.postGameLingerTime} seconds`}]);
        },
        showPlayerLeft(detail) {
            if (detail.prompt) {
                this.showMessage([{text: 'The describer left the game! The prompt was '}, {text: detail.prompt, styles: 'font-medium'}]);
            }
        },
        showMessage(message, shouldScroll) {
            this.messages.push(message);
            if (shouldScroll || (this.$store.util.isScrolled(this.$refs.guesses))) { //if the guess column is scrolled, or this message should force a scroll
                this.$nextTick(() => this.$store.util.scroll(this.$refs.guesses))
            }
        }
    }));

    Alpine.bind('guessesEvents', () => ({
        ['@begingame.window']() {
            this.showBegin(this.$event.detail);
        },
        ['@continuegame.window']() {
            this.showProgress(this.$event.detail);
        },
        ['@promptselected.window']() {
            this.showSelected(this.$event.detail);
        },
        ['@incomingguess.window']() {
            this.showGuess(this.$event.detail);
        },
        ['@promptguessed.window']() {
            this.showCorrectGuess(this.$event.detail);
        },
        ['@turntimedout.window']() {
            this.showTimeout(this.$event.detail);
        },
        ['@playerleftgame.window']() {
            this.showPlayerLeft(this.$event.detail);
        },
        ['@gameended.window']() {
            this.showEnded(this.$event.detail);
        }
    }));

    Alpine.data('guess', () => ({
        guess: '',
        makeGuess() {
            this.$dispatch('send', {type: 'sendGuess', guess: this.guess});
            this.guess = '';
        }
    }));

    Alpine.data('backgroundAnimations', () => ({
        animations: [],
        currentAnimation: "",
        playedAnimations: [],
        paused: false,
        init() {
            if (!config.animationsEnabled) {
                return;
            }
            this.animations = [...document.querySelectorAll("[data-bganimation]")].map(x => x.dataset.bganimation);
            setTimeout(() => this.changeAnimation(), (Math.random() * (config.bgAnimationGap.upper - config.bgAnimationGap.lower) + config.bgAnimationGap.lower) * 1000);
        },
        changeAnimation() {
            if (this.paused) {
                return;
            }
            let newAnimations = this.animations.filter(x => !this.playedAnimations.includes(x)); //ones yet to be played in the current cycle
            if (newAnimations.length === 0) {
                newAnimations = this.animations.filter(x => x != this.currentAnimation); //all animations except the current one (stop the same animation going twice in a row)
                this.playedAnimations = []; //start a new cycle
            }
            this.currentAnimation = newAnimations[Math.floor(Math.random()*newAnimations.length)]; //a random one
            this.playedAnimations.push(this.currentAnimation);
            this.$nextTick(() => {
                let currentDuration = Number(getComputedStyle(document.querySelector(`[data-bganimation="${this.currentAnimation}"]`)).animationDuration.replace(/s$/, ''));
                setTimeout(() => this.changeAnimation(), (Math.random() * (config.bgAnimationGap.upper - config.bgAnimationGap.lower) + config.bgAnimationGap.lower + currentDuration) * 1000);
            });
        },
        pause() {
            this.paused = true;
        },
        resume() {
            this.paused = false;
            this.changeAnimation();
        }
    }));

    Alpine.bind('backgroundAnimation', (extraClasses) => ({
        [':class']() {
            return 'absolute ' + extraClasses + ' ' + (this.currentAnimation == this.$el.dataset.bganimation ? `animate-bg-${this.$el.dataset.bganimation}` : 'hidden');
        }
    }));
});
