document.addEventListener('alpine:init', () => {
    window.addEventListener("send", (event) => {
        Alpine.store('connection').send(event.detail);
    });

    window.addEventListener("navigateto", (event) => {
        Alpine.store('pages').navigateTo(event.detail);
    })

    Alpine.store('pages', {
        init() {
            this.list = $("[data-page]").toArray().map(x => x.dataset.page);
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
                    if (code && /^[A-Z]{5}$/.test(code)) { //if a code was given, and it is valid
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
        }
    }));

    Alpine.data('chatWindow', () => ({
        messages: [],
        scrollIfScrolled(el) {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
                this.$nextTick(() => {el.scrollTop = el.scrollHeight})
            }
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

    Alpine.data('joinLobby', () => ({
        code: "",
        joining: false,
        join() {
            if (/^[A-Z]{5}$/.test(this.code)) {
                this.joining = true;
                this.$dispatch('send', {type: 'joinLobby', lobbyCode: this.code});
            }
        },
        notFound() {
            alert("Lobby not found!");
            this.joining = false;
            this.$dispatch('navigateto', 'home');
        },
        invalidCode() {
            alert("Invalid code");
            this.joining = false;
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
        updateState(detail) {
            Object.keys(detail).forEach((key) => {
                this[key] = detail[key];
            })
        },
        updateGameStarted(detail) { //###This overall is kinda ugly (not just this function; all of them)
            this.promptOptions = [];
            this.prompt = "";
            this.category = "";
            this.promptMask = "";
            this.timeTurnEnding = 0;
            this.gameOver = false;
            this.updateState(detail);
            this.$dispatch('navigateto', 'game');
        },
        updateGameContinued(detail) {
            this.timeTurnEnding = 0;
            this.promptOptions = [];
            this.prompt = "";
            this.category = "";
            this.promptMask = "";
            this.updateState(detail);
        },
        updatePlayerLeft(detail) {
            this.describer = undefined; //default to this; updateState() will replace it if one was given
            this.updateState(detail);
        },
        updatePromptSelected(detail) {
            this.waitingForSelection = false;
            this.prompt = "";
            this.promptMask = "";
            this.updateState(detail);
        },
        updateGameEnded(detail) {
            this.updateState(detail);
            this.describer = undefined; //not explicitly given by the event but implied; there is no describer once the game has ended
            this.youAreDescriber = false; //see above
            this.waitingForSelection = false;
            this.gameOver = true;
            setTimeout(() => this.$dispatch('movetolobby', {lobbyCode: detail.lobbyCode, settings: detail.settings, otherPlayers: detail.otherPlayers.map(x => x.username), you: detail.you.username}), this.$store.config.postGameLingerTime * 1000); //move to lobby wants an array of usernames, not objects with username and score
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

    Alpine.data('guesses', () => ({
        messages: [],
        showGuess(detail) {
            this.showMessage(`${detail.guesser}${detail.isGuesser ? ' (You)' : ''}: ${detail.guess}`, false);
        },
        showCorrectGuess(detail) {
            this.showMessage(`${detail.guesser} has guessed correctly! The prompt was '${detail.prompt}'`, true);
        },
        showTimeout(detail) {
            this.showMessage(detail.prompt ? `Times up! The prompt was '${detail.prompt}'` : "Times up!", true);
        },
        showBegin(detail) {
            this.messages = [];
            this.showProgress(detail);
        },
        showProgress(detail) {
            if (detail.newRound) {
                this.showMessage(`Round ${detail.round}`, true);
            }
            this.showMessage(`${detail.describer.username} is describing`, true);
            if (detail.waitingForSelection) {
                this.showMessage(`${detail.describer.username} is choosing a prompt`, true);
            } else {
                this.showMessage(`The category is: ${detail.category}`);
            }
        },
        showSelected(detail) {
            this.showMessage(`${detail.describerName} has chosen a ${detail.category}`, true);
        },
        showEnded(detail) {
            this.showMessage("The game has finished", true);
            this.showMessage(`The ${detail.winners.length > 1 ? "winners are" : "winner is"} ${detail.winners.toString().replace(/,(?!.*,.*)/, " and ").replace(",", ", ")}`, true); //["Player"] => "The winner is Player", ["Player", "Gamer"] => "The winners are Player and Gamer", ["Player", "Gamer", "Participant"] => "The winners are Player, Gamer and Participant"
	        this.showMessage(`Returning to the lobby in ${this.$store.config.postGameLingerTime} seconds`);
        },
        showPlayerLeft(detail) {
            if (detail.prompt) {
                this.showMessage(`The describer left the game! The prompt was '${detail.prompt}'`);
            }
        },
        showMessage(message, shouldScroll) {
            this.messages.push(message);
            if (shouldScroll || (this.$refs.guesses.scrollTop + this.$refs.guesses.clientHeight >= this.$refs.guesses.scrollHeight)) { //if the guess column is scrolled, or this message should force a scroll
                this.$nextTick(() => {this.$refs.guesses.scrollTop = this.$refs.guesses.scrollHeight})
            }
        }
    }));

    Alpine.bind('test', () => ({
        class: 'text-orange-500',
        '@click'() {
            alert('hey');
        },
        type: 'button',
        'x-text'() {
            return this.thing;
        },
        'x-data'() {
            return {thing: 'hi'}
        }
    }));
});