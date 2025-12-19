var joinBtn = document.getElementById("joinBtn")
var sendBtn = document.getElementById("sendBtn")
var joinPage = document.getElementById("joinPage")
var chatPage = document.getElementById("chatPage")
var usernameInput = document.getElementById("username")
var messageInput = document.getElementById("messageInput")
var messages = document.getElementById("messages")
var chatTitle = document.getElementById("chatTitle")
var friendInput = document.getElementById("friendInput")
var friendAddBtn = document.getElementById("friendAddBtn")
var friendsList = document.getElementById("friends")
var pendingList = document.getElementById("pendingRequests")
var globalBtn = document.getElementById("globalBtn")

var username = ""
var currentChat = "Global"
var chats = { Global: [] }
var friends = []
var friendRequests = []

// Join button works exactly like your original
joinBtn.onclick = function () {
  if (username !== "") return
  if (usernameInput.value.trim() === "") return

  username = usernameInput.value
  joinPage.style.display = "none"
  chatPage.classList.remove("hidden")
}

// Send messages
sendBtn.onclick = function () {
  if (messageInput.value.trim() === "") return

  if (!chats[currentChat]) chats[currentChat] = []

  chats[currentChat].push(username + ": " + messageInput.value)
  renderMessages()
  messageInput.value = ""
}

// Render messages
function renderMessages() {
  messages.innerHTML = ""
  if (!chats[currentChat]) return
  chats[currentChat].forEach(function(text) {
    var msg = document.createElement("div")
    msg.innerText = text
    messages.appendChild(msg)
  })
  messages.scrollTop = messages.scrollHeight
}

// Add friend system
friendAddBtn.onclick = function() {
  var friendName = friendInput.value.trim()
  if (!friendName || friends.includes(friendName) || friendName === username) return

  friendRequests.push(friendName)
  updatePendingRequests()
  friendInput.value = ""
}

// Accept friend request
function acceptFriend(name) {
  friends.push(name)
  chats[name] = []
  friendRequests = friendRequests.filter(f => f !== name)
  updateFriendsList()
  updatePendingRequests()
}

// Update friends list
function updateFriendsList() {
  friendsList.innerHTML = ""
  friends.forEach(function(name) {
    var btn = document.createElement("button")
    btn.innerText = name
    btn.onclick = function() {
      currentChat = name
      chatTitle.innerText = "DM with " + name
      renderMessages()
    }
    friendsList.appendChild(btn)
  })
}

// Update pending requests list
function updatePendingRequests() {
  pendingList.innerHTML = ""
  friendRequests.forEach(function(name) {
    var div = document.createElement("div")
    div.innerText = name + " "
    var acceptBtn = document.createElement("button")
    acceptBtn.innerText = "Add"
    acceptBtn.onclick = function() { acceptFriend(name) }
    div.appendChild(acceptBtn)
    pendingList.appendChild(div)
  })
}

// Switch back to global chat
globalBtn.onclick = function() {
  currentChat = "Global"
  chatTitle.innerText = "Global Chat"
  renderMessages()
}
