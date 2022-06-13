/*
General todo:
-Tag emojis
-Mnigames when waiting
-Cleaning
-Timer setting


Maybe long-term things to do:
-Each onMessage type is its own function; api decides where to send
-Send lobbyCode with request so server doesn't call connections every time, but check whether player is actually in lobby once lobby data is retrieved
-Better refreshing of players; keep some global variables of current players
-[?] foreach is bad? Use for?
*/

/*
###Cleaning to do
- Address suggestions
- Look at https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties for TMIs
- Config file for both back and front end
- Remove megaobject parameters (particularly in back end)
*/
var localMode;
var webSocket;
var lastRound = 0; //keep the last known round number; only display round number when it changes

//an object temporarily used by the direct join via url function
var directJoining = {
	joining: false,
	code: null
};

//Some elements change to give feedback and should return to their original state when the feedback is finished
//These elements have class 'resettable'
//This object saves the initial state of each of these elements so they can later be reset by the resetElement function
var savedStates = {};

//decides whether to use files locally or get them from openmoji
function toggleLocalMode() {
	localMode = !localMode;
	$("#toggleModeButton")[0].innerHTML = localMode ? "Local mode" : "Online mode";
}

function initPageManagement() {
	console.log("Page loaded");
	localMode = config.devMode;
	$(".page").hide();
	$(`#${config.landingPage}`).show();
	
	if (config.devMode) {
		for (var page of $(".page")) {
			console.log(`Creating button for page ${page.id}`);
			let navigationButton = document.createElement("button");
			navigationButton.value = page.id;
			navigationButton.onclick = function(e) {
				navigateTo(e.target.value);
			}
			navigationButton.innerHTML = page.id;
			$("#navigationPane")[0].appendChild(navigationButton);
		}
	} else {
		$("#navigationPane").hide();
	}
	
	//move these??
	$("#globalMessage").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#globalSendButton")[0].disabled) { //sync with button disability so you cannot easily bypass client checks
				globalSend();
			}
		}
	});
	$("#username").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#connectButton")[0].disabled) {
				attemptConnect();
			}
		}
	});
	$("#directJoinUsername").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#directJoinConnectButton")[0].disabled) {
				attemptConnect();
			}
		}
	});
	$("#lobbyCode").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#joinGame")[0].disabled) {
				attemptJoinGame();
			}
		}
	});
	$("#lobbyMessage").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#lobbySendButton")[0].disabled) {
				lobbySend();
			}
		}
	});
	$("#emojiSearchBox").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#emojiSearchButton")[0].disabled) {
				emojiSearch(true);
			}
		}
	});
	$("#guessInput").on("keyup", function(e) {
		if (e.keyCode == 13) {
			if (!$("#sendGuessButton")[0].disabled) {
				attemptSendGuess();
			}
		}
	});
	
	$('.resettable').each(function() { //for each resettable element
		var currentElement = $(this); //get the jquery wrapper
		savedStates[`#${currentElement[0].id}`] = currentElement.clone(true, true); //store a clone with its id as a key
	});
	
	if (URLContainsDirectJoin(window.location.href)) {
		let code = window.location.href.slice(-5).substr(0, 5); //gets the code
		directJoining.joining = true;
		directJoining.code = code;
		$("#directJoinCodeHolder")[0].innerHTML = `Join lobby ${code}`;
		navigateTo("directJoinPage");
	}
}

function navigateTo(pageName) {
	console.log(`Navigating to ${pageName}`);
	$(".page").hide();
	$(`#${pageName}`).show();
}

function resetElement(elementId) {
	$(elementId).replaceWith(savedStates[elementId].clone(true, true));
}

function addButtonFeedback(id, colour, text, disabled) {
	let element = $(id)[0]
	element.classList.add(colour);
	element.innerHTML = text;
	element.disabled = disabled;
}

function usernameChange(username) {
	$("#connectButton")[0].disabled = !(/^[a-zA-Z0-9][ a-zA-Z0-9]{0,14}$/.test(username));
	if (/^ +$/.test(username)) { //if only spaces
		$("#username")[0].value = "";
	}
}

function directJoinUsernameChange(username) {
	$("#directJoinConnectButton")[0].disabled = !(/^[a-zA-Z0-9][ a-zA-Z0-9]{0,14}$/.test(username));
	if (/^ +$/.test(username)) { //if only spaces
		$("#directJoinUsername")[0].value = "";
	}
}

function lobbyCodeChange(code) {
	code = code.replace(/[^a-zA-Z]/, ""); //strip non alphabet characters
	code = code.toUpperCase(); //convert to upper case
	$("#lobbyCode")[0].value = code;
	$("#joinGame")[0].disabled = !(/^[A-Z]{5}$/.test(code));
}

function globalMessageChange(message) {
	$("#globalSendButton")[0].disabled = (message.length == 0);
}

function lobbyMessageChange(message) {
	$("#lobbySendButton")[0].disabled = (message.length == 0);
}

function attemptConnect() {
	if (webSocket == undefined || webSocket.readyState == 3) {
		var username = directJoining.joining ? $("#directJoinUsername")[0].value : $("#username")[0].value; //if directly joining, get the value from the direct join page; otherwise, the main login page
		if (username.length > 0) {
			webSocket = new WebSocket(`${config.socketURL}?username=${username}`);
			showConnecting();
			webSocket.onopen = function (event) {
				connect();
			}
			webSocket.onclose = function (event) {
				disconnect();
			}
			//###on error - "Connection failed" or something
			webSocket.onmessage = function (event) {
				console.log(event);
				processMessage(event.data);
			}
		}
	}
}

function connect() {
	showConnect();
	if (directJoining.joining) {
		attemptJoinGame(directJoining.code);
		directJoining.joining = false;
	} else {
		navigateTo("homePage");
	}
}

function showConnect() {
	for (let statusIndicator of $(".connectionStatus")) {
		statusIndicator.classList.remove("orange");
		statusIndicator.classList.add("green");
		statusIndicator.innerHTML = "Connected";
	}
	$("#globalMessage")[0].disabled = false;
	// $("#globalSendButton")[0].disabled = false;
	$("#username")[0].disabled = true;
	$("#directJoinUsername")[0].disabled = true;
	$("#disconnectButton")[0].disabled = false;
	$("#connectButton")[0].disabled = true;
}

function showConnecting() {
	for (let statusIndicator of $(".connectionStatus")) {
		statusIndicator.classList.remove("red");
		statusIndicator.classList.add("orange");
		statusIndicator.innerHTML = "Connecting";
	}
	addButtonFeedback("#directJoinConnectButton", "orange", "Joining...", true);
	
	$("#connectButton")[0].disabled = true;
}

function disconnect() {
	showDisconnect();
	navigateTo("config.landingPage");
}

function showDisconnect() {
	for (let statusIndicator of $(".connectionStatus")) {
		statusIndicator.classList.remove("green");
		statusIndicator.classList.add("red");
		statusIndicator.innerHTML = "Not connected";
	}
	
	$("#globalMessage")[0].disabled = true;
	// $("#globalSendButton")[0].disabled = true;
	$("#username")[0].disabled = false;
	$("#directJoinUsername")[0].disabled = false;
	$("#disconnectButton")[0].disabled = true;
	$("#connectButton")[0].disabled = $("#username")[0].value.length < 1;
	$("#directJoinConnectButton")[0].disabled = $("#directJoinUsername")[0].value.length < 1;
}

function attemptDisconnect() {
	if (webSocket?.readyState == 1) {	
		webSocket.close();
	}
}

function globalSend() {
	if (webSocket?.readyState == 1) {	
		messageBox = $("#globalMessage")[0];
		var text = messageBox.value;
		send({
			type: "globalChatMessage",
			message: text
		});
		messageBox.value = "";
		messageBox.oninput("");
	}
}

function lobbySend() {
	if (webSocket != undefined && webSocket.readyState == 1) {	
		messageBox = $("#lobbyMessage")[0];
		var text = messageBox.value;
		send({
			type: "lobbyChatMessage",
			message: text
		});
		messageBox.value = "";
		messageBox.oninput("");
	}
}

function processMessage(data) {
	//Handles ALL messages from the socket
	//Anything from a global chat message to a notification that a game has ended
	message = JSON.parse(data);
	switch (message.type) {
		case "globalChatMessage": {
			showGlobalMessage(message.sender, message.isSender, message.message);
			break;
		}
		case "lobbyChatMessage": {
			showLobbyMessage(message.sender, message.isSender, message.message);
			break;
		}
		case "moveToLobby": {
			moveToLobby(message.lobbyCode, message.settings, message.otherPlayers, message.you);
			break;
		}
		case "playerJoinedLobby": { //when the game is in the lobby
			refreshPlayers(message.otherPlayers, message.you);
			break;
		}
		case "playerJoinedGame": { //when the game is in progress
			refreshPlayersColumn(message.otherPlayers, message.describer, message.you, message.youAreDescriber);
			break;
		}
		case "playerLeftLobby": { //when the game is in the lobby
			refreshPlayers(message.newOtherPlayers, message.you);
			break;
		}
		case "playerLeftGame": {
			refreshPlayersColumn(message.otherPlayers, message.describer, message.you, message.youAreDescriber);
			break;
		}
		case "leaveLobby": {
			leaveLobby();
			break;
		}
		case "invalidLobbyCode": {
			notifyInvalidCode();
			break;
		}
		case "lobbyNotFound": {
			notifyLobbyNotFound();
			break;
		}
		case "settingsChanged": {
			refreshSettings(message.newSettings);
			break;
		}
		case "beginGame": {
			beginGame(message.waitingForSelection, message.youAreDescriber, message.otherPlayers, message.round, message.describer, message.promptOptions, message.prompt, message.category, message.you, message.lobbyCode, message.maxRounds);
			break;
		}
		case "incomingClue": {
			showEmojiClue(message.clue);
			break;
		}
		case "incomingGuess": {
			showGuess(message.guesser, message.isGuesser, message.guess);
			break;
		}
		case "promptGuessed": {
			showGameMessage(`${message.guesser} has guessed correctly! The prompt was '${message.prompt}'`);
			break;
		}
		case "continueGame": {
			continueGame(message.waitingForSelection, message.youAreDescriber, message.otherPlayers, message.round, message.describer, message.promptOptions, message.prompt, message.category, message.you, message.maxRounds);
			break;
		}
		case "gameEnded": {
			endGame(message.youAreDescriber, message.otherPlayers, message.round, message.describer, message.you, message.lobbyCode, message.maxRounds, message.settings);
			break;
		}
		case "promptSelected": {
			processPromptSelected(message.youAreDescriber, message.category, message.prompt, message.you, message.round, message.describerName, message.maxRounds);
			break;
		}
	}
}

function send(messageObj) {
	//sends a messageObj
	//adds the 'action: "onMessage"' attrbiute since all messages have that
	if (webSocket?.readyState == 1) {
		messageObj.action = "onMessage";
		webSocket.send(JSON.stringify(messageObj));
	}
}

function URLContainsDirectJoin(string) {
	return /\?directJoin=[A-Z]{5}$/.test(string);
}

function showGlobalMessage(sender, isSender, message) {
	var box = $("#globalMessages")[0];
	var shouldScroll = isFullyScrolled(box);
	
	let para = document.createElement("P");
	let t = document.createTextNode(`${sender}${isSender ? " (You)" : ""}: ${message}`);
	para.appendChild(t);
	$("#globalMessages")[0].appendChild(para);
	
	if (shouldScroll) {
		scrollElement(box);
	}
}

function showLobbyMessage(sender, isSender, message) {
	var box = $("#lobbyMessages")[0];
	var shouldScroll = isFullyScrolled(box);
	
	let para = document.createElement("P");
	let t = document.createTextNode(`${sender}${isSender ? " (You)" : ""}: ${message}`);
	para.appendChild(t);
	$("#lobbyMessages")[0].appendChild(para);
	
	if (shouldScroll) {
		scrollElement(box);
	}
}

function hasVerticalScrollBar(element) {
	return element.scrollHeight > element.clientHeight;
}

function getScrollPercentage(element) {
	return 100 * element.scrollTop / (element.scrollHeight - element.clientHeight); 
}

function isFullyScrolled(element) {
	return !(hasVerticalScrollBar(element) && (getScrollPercentage(element) < 100))
}

function scrollElement(element) {
	element.scrollTop = element.scrollHeight;
}

function attemptCreateNewGame() {
	if (webSocket?.readyState == 1) {
		addButtonFeedback("#createGame", "orange", "Creating...", true);	
		send({
			type: "createLobby"
		});
	}
}

function attemptJoinGame(code) {
	//this function can take a code
	//if the code is undefined, it uses the #lobbyCode value
	if (webSocket?.readyState == 1) {
		addButtonFeedback("#joinGame", "orange", "Joining...", true);
		send({
			type: "joinLobby",
			lobbyCode: code ? code : $("#lobbyCode")[0].value //use a given code or the value of #lobbyCode if no code was given
		});
	}
}

function attemptStartGame() {
	if (webSocket?.readyState == 1) {
		addButtonFeedback("#startGame", "orange", "Starting...", true);
	
		send({
			type: "startGame"
		});
	}
}

function attemptLeaveGame() {
	if (webSocket?.readyState == 1) {
		
		resetElement("#createGame");
		resetElement("#joinGame");
		
		addButtonFeedback("#leaveGame", "orange", "Leaving...", true);
	
		send({
			type: "leaveLobby"
		});
	}
}

function moveToLobby(lobbyCode, settings, otherPlayers, you) {
	/*
	otherPlayers - array of string usernames of other players
	you - string of your username
	*/
	document.title = `${config.nameOfGame} - ${lobbyCode}`;
	$("#directJoinURLHolder")[0].value = `${window.location.href}${URLContainsDirectJoin(window.location.href) ? '' : `?directJoin=${lobbyCode}`}`;
	$("#guessInput")[0].oninput("");
	resetElement("#startGame");
	resetElement("#leaveGame");
	populateLobby(lobbyCode, settings, otherPlayers, you);
	navigateTo("lobbyPage");
}

function populateLobby(lobbyCode, settings, otherPlayers, you) {
	$("#displayLobbyCode")[0].innerHTML = `Join with code: ${lobbyCode}`;
	
	resetElement("#leaveGame");
	
	refreshPlayers(otherPlayers, you);
	refreshSettings(settings);
}

function refreshPlayers(otherPlayers, you) {
	$("#lobbyPlayerList")[0].innerHTML = "";

	//add the player themselves (they will be on top)
	let para = document.createElement("P");
	let t = document.createTextNode(`${you} (You)`);
	para.appendChild(t);
	$("#lobbyPlayerList")[0].appendChild(para);

	//then add the others
	for (let player of otherPlayers) {
		let para = document.createElement("P");
		let t = document.createTextNode(player);
		para.appendChild(t);
		$("#lobbyPlayerList")[0].appendChild(para);
	};
	
	$("#startGame")[0].disabled = !(Object.keys(otherPlayers).length > 0);
}

function leaveLobby() {
	navigateTo("homePage");
	let lobbyCode = $("#lobbyCode")[0];
	lobbyCode.oninput(lobbyCode.value);
	resetElement("#lobbyMessages");
}

function notifyInvalidCode() {
	alert("Invalid code");
	resetElement("#joinGame");
	resetElement("#lobbyCode");
}

function notifyLobbyNotFound() {
	alert("Could not find game");
	resetElement("#joinGame");
	resetElement("#lobbyCode");
}

function attemptChangeSetting(settingId) {
	if (webSocket != undefined && webSocket.readyState == 1) {
	
		var message = {
			type: "changeSetting",
		};
		
		//distinguish between checkbox and radio buttons inputs because they have different implications
		switch (settingId) {
			case "FFA":
			case "teams":
				message.setting = "mode";
				message.newValue = settingId;
				break;
			case "oneGuesser":
			case "timer":
			case "promptOptions":
				message.setting = settingId;
				message.newValue = $(`#${settingId}`)[0].checked;
				break;
			case "rounds":
			case "timerTime":
				message.setting = settingId;
				message.newValue = Number($(`#${settingId}`)[0].value);
				break;
		}
		
		send(message);
	}
}

function refreshSettings(newSettings) {
	Object.keys(newSettings).forEach((setting) => {
		switch (setting) { //some settings have different presentations
			case "mode":
				if (newSettings[setting] == "FFA") { //if mode if FFA
					$("#teamsSettings .subSettings *").prop('disabled', true);
					$("#ffaSettings .subSettings *").prop('disabled', false);
				} else { //if mode is teams
					$("#teamsSettings .subSettings *").prop('disabled', false);
					$("#ffaSettings .subSettings *").prop('disabled', true);
				}
				$(`#${newSettings[setting]}`)[0].checked = true; //select using value which is id of radio button
				break;
			case "timer":
				$("#timerTime").prop('disabled', !newSettings[setting]); //disabled timer select if timer is off and vice versa
				//no break; want to fall through to promptOptions
			case "oneGuesser":
			case "promptOptions":
				$(`#${setting}`)[0].checked = newSettings[setting];
				break;
			case "rounds":
			case "timerTime":
				$(`#${setting}`)[0].value = newSettings[setting];
				break;
		}
	});
}

function emojiSearchChange(message) {
	if ($("#fastSearch")[0].checked) {
		emojiSearch(false);
	} else {
		$("#emojiSearchButton")[0].disabled = (message.length == 0);
	}
}

function emojiSearch(clearInput) {
	let textbox = $("#emojiSearchBox")[0];
	let query = textbox.value;
	
	var codes = getMatchingEmojis(query);
	populateEmojis(codes);
	
	if (clearInput) {
		textbox.value = "";
	}	
}

function populateEmojis(codes) {
	var panel = $("#emojiPanel")[0]
	panel.innerHTML = "";
	
	if (codes.length == 0) {
		let para = document.createElement("P");
		para.classList.add("bold");
		let t = document.createTextNode("No matching emojis");
		para.appendChild(t);
		$("#emojiPanel")[0].appendChild(para);
	} else {
		for (var code of codes) {
			panel.appendChild(createEmojiImage(code));
		}
	}
}

function createEmojiImage(code) {
	let emojiImage = document.createElement("img");
	if (localMode) {
		emojiImage.src = `emojis/images/${code}.png`;
	} else {
		emojiImage.src = `https://openmoji.org/data/color/svg/${code}.svg`;
	}
	emojiImage.alt = emojis[code].name;
	emojiImage.title = emojis[code].name;
	emojiImage.dataset.code = code;
	return emojiImage;
}

function addEmoji(event) {
	let code = event.target.dataset.code;
	if (code != undefined) {
		$("#emojiClueHolder")[0].appendChild(createEmojiImage(code));
	}
}

function undoClue() {
	var cluePreview = $("#emojiClueHolder")[0];
	if (cluePreview.childElementCount > 0) {
		cluePreview.removeChild(cluePreview.lastChild);
	}
}

function clearClue() {
	$("#emojiClueHolder")[0].innerHTML = "";
}

function attemptSendClue() {
	var emojiCodes = [];
	for (var emoji of $("#emojiClueHolder img")) {
		emojiCodes.push(emoji.dataset.code);
	}
	if (webSocket != undefined && webSocket.readyState == 1) {
		
		addButtonFeedback("#clueSendButton", "orange", "Sending...", true);
		
		send({
			type: "sendClue",
			clue: emojiCodes
		});
	}
	clearClue();
}

function showEmojiClue(emojiCodes) {
	var box = $("#emojiClues")[0];
	var shouldScroll = !(hasVerticalScrollBar(box) && (getScrollPercentage(box) < 95)); //only if there is a scroll bar and you are at least partially scrolled up should it not scroll down
	
	var row = document.createElement("div");
	for (var code of emojiCodes) {
		row.appendChild(createEmojiImage(code));
	}
	box.appendChild(row);
	resetElement("#clueSendButton");
	
	if (shouldScroll) {
		scrollElement(box);
	}
}

function toggleFastSearch() {
	$("#emojiSearchButton")[0].disabled = true;
}

function beginGame(waitingForSelection, youAreDescriber, otherPlayers, round, describer, promptOptions, prompt, category, you, lobbyCode, maxRounds) {
	lastRound = 0;
	resetElement("#guessesPanel");
	showGameData(waitingForSelection, youAreDescriber, otherPlayers, round, describer, promptOptions, prompt, category, you, maxRounds);
	document.title = `${config.nameOfGame} - ${lobbyCode}`;
	navigateTo("gamePage");
}

function continueGame(waitingForSelection, youAreDescriber, otherPlayers, round, describer, promptOptions, prompt, category, you, maxRounds) {
	resetElement("#guessInput");
	$("#guessInput")[0].oninput("");
	showGameData(waitingForSelection, youAreDescriber, otherPlayers, round, describer, promptOptions, prompt, category, you, maxRounds);
}

function endGame(youAreDescriber, otherPlayers, round, describer, you, lobbyCode, maxRounds, settings) {
	refreshClueColumn(false, true, round, undefined, undefined, undefined, maxRounds); //just want an empty column here
	refreshPlayersColumn(otherPlayers, describer, you, youAreDescriber);
	showGameMessage("Game has ended");
	showWinners(otherPlayers, describer, you, youAreDescriber);
	showGameMessage("Returning to lobby in 10 seconds");
	/*
	A little complex here
	moveToLobby wants an array of usernames of otherPlayers and you, but we have an array of objects
	Similarly, it wants you to be your username, not an object with your username and score
	Additionally, we have describer here as a separate entity, so we need to merge it with otherPlayers if it is another player (i.e. not you)
	*/
	if (!youAreDescriber) { //if the describer is a different player
		otherPlayers.push(describer); //add it to the list of other players
	}
	setTimeout(() => moveToLobby(lobbyCode, settings, otherPlayers.map(x => x.username), you.username), 10000);
}

function showWinners(otherPlayers, describer, you, youAreDescriber) {
	//allplayers is comprised of you, the describer, and all other players
	//note that the describer may be you however, so be careful not to double up
	
	//what is the highest score?
	let maxScore = 0;
	if (you.score > maxScore) {
		maxScore = you.score;
	}
	if (!youAreDescriber && describer.score > maxScore) {
		maxScore = you.score;
	}
	for (let otherPlayer of otherPlayers) {
		if (otherPlayer.score > maxScore) {
			maxScore = otherPlayer.score;
		}
	}
	
	//who had the highest score?
	let winners = [];
	if (you.score == maxScore) {
		winners.push(you.username);
	}
	if (!youAreDescriber && describer.score == maxScore) {
		winners.push(describer.username);
	}
	for (let otherPlayer of otherPlayers) {
		if (otherPlayer.score == maxScore) {
			winners.push(otherPlayer.username);
		}
	}

	//display the winners
	if (winners.length == 1) {
		showGameMessage(`The winner is ${winners[0]}`);
	} else {
		let string = `The winners are ${winners[0]}`;
		let count = winners.length;
		for (var i = 1; i < count-1; i++) {
			string += `, ${winners[i]}`
		}
		string += ` and ${winners[count-1]}`;
		showGameMessage(string);
	}
}

function showGameData(waitingForSelection, youAreDescriber, otherPlayers, round, describer, promptOptions, prompt, category, you, maxRounds) {
	refreshPlayersColumn(otherPlayers, describer, you, youAreDescriber);
	refreshClueColumn(youAreDescriber, waitingForSelection, round, prompt, category, promptOptions, maxRounds);
	showGameProgress(round, waitingForSelection, describer.username, category);
}

function refreshPlayersColumn(otherPlayers, describer, you, youAreDescriber) {
	var box = $("#gamePlayerList")[0];
	box.innerHTML = "";

	//add you
	let para = document.createElement("P");
	let t = document.createTextNode(`[${you.score}] ${you.username} (You)${youAreDescriber ? " ✎" : ""}`);
	para.appendChild(t);
	box.appendChild(para);

	//add describer separately, unless it is you (in which case you will already have the pencil from above)
	if (!youAreDescriber) {
		para = document.createElement("P");
		t = document.createTextNode(`[${describer.score}] ${describer.username} ✎`);
		para.appendChild(t);
		box.appendChild(para);
	}

	//add others
	for (let otherPlayer of otherPlayers) {
		let para = document.createElement("P");
		let t = document.createTextNode(`[${otherPlayer.score}] ${otherPlayer.username}`);
		para.appendChild(t);
		box.appendChild(para);
	}
}

function refreshClueColumn(youAreDescriber, waitingForSelection, round, prompt, category, promptOptions, maxRounds) {
	//prompt will be undefined if the player is not describer
	//promptOptions will also be undefined if there are no options to be shown
	resetElement("#emojiClues");
	resetElement("#clueInput");

	$("#promptSelectionPanel").hide();
	if (waitingForSelection) {
		if (youAreDescriber) {
			$("#topicHolder")[0].innerHTML = `Round ${round} of ${maxRounds}`;
			
			populatePromptSelectionPanel(promptOptions);
			$("#promptSelectionPanel").show();
			$("#clueInput").hide();
			$("#guessInputPanel").hide();
		} else {
			$("#topicHolder")[0].innerHTML = `Round ${round} of ${maxRounds}`;
			
			$("#promptSelectionPanel").hide();
			$("#clueInput").hide();
			
			//showing the input panel scrolls the messages up a bit
			//remember whether the div was scrolled fully before; if it was, scroll it again after showing the panel
			let box = $("#guessesPanel")[0];
			let shouldScroll = isFullyScrolled(box);
			$("#guessInputPanel").show();
			if (shouldScroll) {
				scrollElement(box);
			}
		}
	} else {
		if (youAreDescriber) {
			$("#topicHolder")[0].innerHTML = `Round ${round} of ${maxRounds}: Describe '${prompt}'`;
			clearClue();
			populateEmojis(getRandomEmojis());
			$("#clueInput").show();
			$("#guessInputPanel").hide();
		} else {
			$("#topicHolder")[0].innerHTML = `Round ${round} of ${maxRounds}: ${category}`;
			$("#clueInput").hide();
			
			//showing the input panel scrolls the messages up a bit
			//remember whether the div was scrolled fully before; if it was, scroll it again after showing the panel
			let box = $("#guessesPanel")[0];
			let shouldScroll = isFullyScrolled(box);
			$("#guessInputPanel").show();
			if (shouldScroll) {
				scrollElement(box);
			}
		}
	}
	
}

function showGameProgress(round, waitingForSelection, describerName, category) {
	if (round > lastRound) {
		showGameMessage(`Round ${round}`);
		lastRound = round;
	}
	showGameMessage(`${describerName} is describing`);
	if (waitingForSelection) {
		showGameMessage(`${describerName} is choosing a prompt`);
	} else {
		showGameMessage(`The category is: ${category}`);
	}
	
	scrollElement($("#guessesPanel")[0]);
}

function populatePromptSelectionPanel(promptOptions) {
	resetElement("#promptSelectionPanel");
	for (let i = 0; i < 3; i++) {
		$(`#promptOption${i+1} .promptOptionCategory`)[0].innerHTML = promptOptions[i].category; //html holders are 1-based, promptOptions is 0-based
		$(`#promptOption${i+1} .promptOption`)[0].innerHTML = promptOptions[i].prompt;
	}
}

function attemptSelectPrompt(selection) {
	if (webSocket != undefined && webSocket.readyState == 1) {	
		send({
			type: "selectPrompt",
			promptNumber: selection
		});
		
		var indicator = $("#promptSelectionStatus")[0]
		indicator.innerHTML = "Choosing...";
		indicator.classList.add("orange");
	}
}

function processPromptSelected(youAreDescriber, category, prompt, you, round, describerName, maxRounds) {
	let waitingForSelection = false; //no longer waiting; it has been chosen
	refreshClueColumn(youAreDescriber, waitingForSelection, round, prompt, category, undefined, maxRounds); //pass promptOptions as undefined as there will be none given that a prompt was just chosen
	showGameMessage(`${describerName} has chosen a '${category}'`);1
}

function guessChange(guess) {
	$("#sendGuessButton")[0].disabled = (guess.length == 0);
}

function attemptSendGuess() {
	if (webSocket != undefined && webSocket.readyState == 1) {	
		guessInput = $("#guessInput")[0];
		var text = guessInput.value
		send({
			type: "sendGuess",
			guess: text
		});
		guessInput.value = "";
		guessInput.oninput("");
	}
}

function showGuess(guesser, isGuesser, guess) {
	showGameMessage(`${guesser}${isGuesser ? " (You)" : ""}: ${guess}`);
}

function showGameMessage(string) {
	//before we add the new guess, we should check whether they are fully scrolled
	var box = $("#guessesPanel")[0];
	var shouldScroll = isFullyScrolled(box); //only if there is a scroll bar and you are at least partially scrolled up should it not scroll down
		
	let para = document.createElement("P");
	let t = document.createTextNode(string);
	para.appendChild(t);
	$("#guessesPanel")[0].appendChild(para);
	
	if (shouldScroll) {
		scrollElement(box);
	}
}

function copyDirectJoinURLToClipboard() {
	var url = $("#directJoinURLHolder")[0];
	url.select();
	url.setSelectionRange(0, 99999);
	document.execCommand("copy");
	addButtonFeedback("#copyURLButton", "orange", "Copied!", false);
	setTimeout(() => resetElement("#copyURLButton"), 1000);
}