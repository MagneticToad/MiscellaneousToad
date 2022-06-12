/*
General todo:
-Tag emojis
-Mnigames when waiting
-Cleaning
-Timer setting


Maybe long-term things to do:
-Each onMessage type is its own function; api decides where to send
-Send lobbycode with request so server doesn't call connections every time, but check whether player is actually in lobby once lobby data is retrieved
-Better refreshing of players; keep some global variables of current players
*/


var socketURL = "wss://uuql9ukc55.execute-api.ap-southeast-2.amazonaws.com/Test";
var webSocket;

var lastRound = 0; //keep the last known round number; only display round number when it changes

var nameOfGame = "Emoji Describer";

//an object temporarily used by the direct join via url function
var directJoining = {
	joining: false,
	code: null
};

//Some elements change to give feedback and should return to their original state when the feedback is finished
//These elements have class 'resettable'
//This object saves the initial state of each of these elements so they can later be reset by the resetElement function
var savedStates = {};

const landingPage = "landingPage"; //default page

//decides whether to use files locally or get them from openmoji
var localMode = true; //###toggle default here
function toggleLocalMode() {
	localMode = !localMode;
	// $("#toggleModeButton")[0].innerHTML = localMode ? "Local mode" : "Online mode"; ###PANE REMOVAL
}


function initPageManagement() {
	console.log("loaded");
	toggleLocalMode(); //include or not to change default
	$(".page").hide();
	$(`#${landingPage}`).show();
	for (var x = 0; x < 10; x++) {
	}
	for (var page of $(".page")) {
		console.log(`Creating button for page ${page.id}`);
		let navigationButton = document.createElement("button");
		navigationButton.value = page.id;
		navigationButton.onclick = function(e) {
			navigateTo(e.target.value);
		}
		navigationButton.innerHTML = page.id;
		// $("#navigationPane")[0].appendChild(navigationButton); ###PANE REMOVAL
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
	
	if (URLContainsDirectJoin(window.location.href)) { //%22 = "
		let code = window.location.href.slice(-8).substr(0, 5); //gets the code
		directJoining.joining = true;
		directJoining.code = code;
		$("#directJoinCodeHolder")[0].innerHTML = `Join lobby ${code}`;
		navigateTo("directJoinPage");
	}
}

function navigateTo(pageName) {
	console.log("navigating to " + pageName);
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
	console.log("attempting to connect");
	if (webSocket == undefined || webSocket.readyState == 3) {
		var username = directJoining.joining ? $("#directJoinUsername")[0].value : $("#username")[0].value; //if directly joining, get the value from the direct join page; otherwise, the main login page
		console.log(username);
		if (username.length > 0) {
			webSocket = new WebSocket(`${socketURL}?username=${username}`);
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
	navigateTo("landingPage");
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
	if (webSocket != undefined && webSocket.readyState == 1) {	
		webSocket.close();
	}
}

function globalSend() {
	if (webSocket != undefined && webSocket.readyState == 1) {	
		messageBox = $("#globalMessage")[0];
		var text = messageBox.value;
		var message = {
			action: "onMessage",
			type: "globalChatMessage",
			message: text
		};
		webSocket.send(JSON.stringify(message));
		messageBox.value = "";
		messageBox.oninput("");
	}
}

function lobbySend() {
	if (webSocket != undefined && webSocket.readyState == 1) {	
		messageBox = $("#lobbyMessage")[0];
		var text = messageBox.value;
		var message = {
			action: "onMessage",
			type: "lobbyChatMessage",
			message: text
		};
		webSocket.send(JSON.stringify(message));
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
			moveToLobby(message.lobbydata, message.you);
			break;
		}
		case "playerJoinedLobby": { //when the game is in the lobby
			refreshPlayers(message.newPlayerList, message.you);
			break;
		}
		case "playerJoinedGame": { //when the game is in progress
			refreshPlayersColumn(message.playerList, message.describer, message.you);
			break;
		}
		case "playerLeftLobby": { //when the game is in the lobby
			refreshPlayers(message.newPlayerList, message.you);
			break;
		}
		case "playerLeftGame": {
			refreshPlayersColumn(message.playerList, message.describer, message.you);
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
			beginGame(message);
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
			continueGame(message);
			break;
		}
		case "gameEnded": {
			endGame(message.lobbydata, message.you);
			break;
		}
		case "promptSelected": {
			processPromptSelected(message.youAreDescriber, message.category, message.prompt, message.you, message.round, message.describerName, message.maxRounds);
			break;
		}
	}
}

function URLContainsDirectJoin(string) {
	return /\?directJoin=%22[A-Z]{5}%22$/.test(string); //%22 = "
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
	if (webSocket != undefined && webSocket.readyState == 1) {
		
		addButtonFeedback("#createGame", "orange", "Creating...", true);
		
		var message = {
			action: "onMessage",
			type: "createLobby"
		};
		webSocket.send(JSON.stringify(message));
	}
}

function attemptJoinGame(code) {
	//this function can take a code
	//if the code is undefined, it uses the #lobbyCode value
	if (webSocket != undefined && webSocket.readyState == 1) {
		addButtonFeedback("#joinGame", "orange", "Joining...", true);
		
		var message = {
			action: "onMessage",
			type: "joinLobby",
			lobbycode: code == undefined ? $("#lobbyCode")[0].value : code //use a given code or the value of #lobbyCode if no code was given
		};
		webSocket.send(JSON.stringify(message));
	}
}

function attemptStartGame() {
	if (webSocket != undefined && webSocket.readyState == 1) {
		addButtonFeedback("#startGame", "orange", "Starting...", true);
	
		var message = {
			action: "onMessage",
			type: "startGame"
		};
		webSocket.send(JSON.stringify(message));
	}
}

function attemptLeaveGame() {
	if (webSocket != undefined && webSocket.readyState == 1) {
		
		resetElement("#createGame");
		resetElement("#joinGame");
		
		addButtonFeedback("#leaveGame", "orange", "Leaving...", true);
	
		var message = {
			action: "onMessage",
			type: "leaveLobby"
		};
		webSocket.send(JSON.stringify(message));
	}
}

function moveToLobby(lobbyData, you) {
	document.title = `${nameOfGame} - ${lobbyData.lobbycode}`;
	$("#directJoinURLHolder")[0].value = `${window.location.href}${URLContainsDirectJoin(window.location.href) ? '' : `?directJoin="${lobbyData.lobbycode}"`}`;
	$("#guessInput")[0].oninput("");
	resetElement("#startGame");
	resetElement("#leaveGame");
	populateLobby(lobbyData, you);
	navigateTo("lobbyPage");
}

function populateLobby(lobbyData, you) {
	$("#displayLobbyCode")[0].innerHTML = `Join with code: ${lobbyData.lobbycode}`;
	
	resetElement("#leaveGame");
	
	refreshPlayers(lobbyData.players, you);
	refreshSettings(lobbyData.settings);
}

function refreshPlayers(players, you) {
	$("#lobbyPlayerList")[0].innerHTML = "";
	Object.keys(players).forEach((connectionId) => {
		let para = document.createElement("P");
		let t = document.createTextNode(connectionId == you.connectionid ? `${players[connectionId].username} (You)` : players[connectionId].username);
		para.appendChild(t);
		$("#lobbyPlayerList")[0].appendChild(para);
	});
	
	$("#startGame")[0].disabled = !(Object.keys(players).length > 1);
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
			action: "onMessage",
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
		
		webSocket.send(JSON.stringify(message));
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
				//no break; wan't to fall through to promptOptions
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
		
		var message = {
			action: "onMessage",
			type: "sendClue",
			clue: emojiCodes
		};
		webSocket.send(JSON.stringify(message));
	}
	clearClue();
}

function showEmojiClue(emojiCodes) {
	var box = $("#emojiClues")[0];
	var shouldScroll = !(hasVerticalScrollBar(box) && (getScrollPercentage(box) < 95)); //only if there is a scroll bar and you are at least partially scrolled up should it not scroll down
	//###95 here not 100 because clues get slightly scrolled when entering a new clue for the describer
	
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

function beginGame(gameData) {
	lastRound = 0;
	resetElement("#guessesPanel");
	showGameData(gameData);
	document.title = `${nameOfGame} - ${gameData.lobbycode}`;
	navigateTo("gamePage");
}

function continueGame(gameData) {
	resetElement("#guessInput");
	$("#guessInput")[0].oninput("");
	showGameData(gameData);
}

function endGame(lobbydata, you) {
	refreshClueColumn(false, true, lobbydata.round, undefined, undefined, undefined, lobbydata.settings.rounds); //just want an empty column here
	refreshPlayersColumn(lobbydata.players, lobbydata.players[lobbydata.describer], you);
	showGameMessage("Game has ended");
	showWinners(lobbydata.players);
	showGameMessage("Returning to lobby in 10 seconds");
	setTimeout(() => moveToLobby(lobbydata, you), 10000);
}

function showWinners(playerList) {
	console.log("showing winners");
	var maxScore = 0;
	Object.keys(playerList).forEach((connectionId) => {
		if (playerList[connectionId].score > maxScore) {
			maxScore = playerList[connectionId].score;
		}
	});
	console.log(`max score is ${maxScore}`);
	var winners = [];
	Object.keys(playerList).forEach((connectionId) => {
		if (playerList[connectionId].score == maxScore) {
			winners.push(playerList[connectionId].username);
		}
	});
	console.log(`winners are ${winners}`);
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

function showGameData(gameData) {
	refreshPlayersColumn(gameData.playerList, gameData.describer, gameData.you);
	refreshClueColumn(gameData.youAreDescriber, gameData.waitingForSelection, gameData.round, gameData.prompt, gameData.category, gameData.promptOptions, gameData.maxRounds);
	showGameProgress(gameData.round, gameData.waitingForSelection, gameData.describer.username, gameData.category);
}

function refreshPlayersColumn(playerList, describer, you) {
	var box = $("#gamePlayerList")[0];
	box.innerHTML = "";
	Object.keys(playerList).forEach((connectionId) => {
		let para = document.createElement("P");
		
		//build the string for the player - name, is you, is describer
		let score = playerList[connectionId].score;
		let playerString = `[${score}] `;
		playerString += playerList[connectionId].username;
		if (connectionId == you.connectionid) {
			playerString += " (You)";
		}
		if ((describer != undefined) && (connectionId == describer.connectionid)) {
			playerString += " ✎";
		}
		let t = document.createTextNode(playerString);
		para.appendChild(t);
		box.appendChild(para);
	});
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
		var message = {
			action: "onMessage",
			type: "selectPrompt",
			promptNumber: selection
		};
		webSocket.send(JSON.stringify(message));
		
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
		var message = {
			action: "onMessage",
			type: "sendGuess",
			guess: text
		};
		webSocket.send(JSON.stringify(message));
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