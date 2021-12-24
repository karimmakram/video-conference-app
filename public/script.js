const socket = io()
const myVideo = document.createElement('video')
myVideo.muted = true
const videoGrid = document.getElementById('video-grid')
/// initial user media to get stream easy
var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia
var videoStream
// get first stream record
getUserMedia(
  {
    video: true,
    audio: true
  },
  stream => {
    videoStream = stream
    addVideoStream(myVideo, stream)
    ///// becouse insire video loded
    socket.on('user-connected', userId => {
      newUserConnected(userId, stream)
    })
  }
)

// open peer connection
peer.on('open', id => {
  socket.emit('join-room', roomId, id)
})

// when new user get connect with room

// call peer and share stream
const newUserConnected = (userId, stream) => {
  var call = peer.call(userId, stream)
  const video = document.createElement('video')
  video.muted = true
  call.on('stream', function(remoteStream) {
    addVideoStream(video, remoteStream)
  })
}

// answer peer and share stream two peer
peer.on('call', function(call) {
  getUserMedia({ video: true, audio: true }, function(stream) {
    call.answer(stream)
    const video = document.createElement('video')
    video.muted = true
    call.on('stream', function(remoteStream) {
      addVideoStream(video, remoteStream)
    })
  })
})

// add stream to video grid
const addVideoStream = (video, stream) => {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', async () => {
    video.play()
  })
  videoGrid.append(video)
}

///Message send and recive
const text = $('input')

$('html').keydown(e => {
  if (e.which == 13 && text.val().length > 0) {
    socket.emit('message', text.val(), roomId)
    createUiMessage('left', text.val())
    text.val('')
  }
})
socket.on('createMessage', msg => {
  createUiMessage('right', msg)
})

const createUiMessage = (float, msg) => {
  $('ul').append(`<li class='message-${float}'>${msg}</li>`)
  scrollToBottom()
}
////// scroll down messages
const scrollToBottom = () => {
  let down = $('.main-chat-window')
  down.scrollTop(down.prop('scrollHeight'))
}

////Mute and unMute video
const muteUnmuteVideo = () => {
  const enable = videoStream.getAudioTracks()[0].enabled
  if (enable) {
    setMute()
    videoStream.getAudioTracks()[0].enabled = false
  } else {
    setUnmute()
    videoStream.getAudioTracks()[0].enabled = true
  }
}
const setUnmute = () => {
  const html = ` <i  class="fas fa-microphone"></i>
  <span>Mute</span>`
  document.querySelector('.main-mute-button').innerHTML = html
}

const setMute = () => {
  const html = ` <i  class="unmute fas fa-microphone-slash"></i>
  <span>UnMute</span>`
  document.querySelector('.main-mute-button').innerHTML = html
}

///// stop and play video

const stopPlayVideo = () => {
  const enable = videoStream.getVideoTracks()[0].enabled
  if (enable) {
    setStop()
    videoStream.getVideoTracks()[0].enabled = false
  } else {
    setPlay()
    videoStream.getVideoTracks()[0].enabled = true
  }
}
const setPlay = () => {
  const html = ` <i  class="fas fa-video"></i>
  <span>Stop video</span>`
  document.querySelector('.main-video-button').innerHTML = html
}

const setStop = () => {
  const html = ` <i  class="stop fas fa-video-slash"></i>
  <span>Play video</span>`
  document.querySelector('.main-video-button').innerHTML = html
}
