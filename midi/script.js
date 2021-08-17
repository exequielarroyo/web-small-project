const audioContext = new AudioContext();

const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626 },
  { note: "Db", key: "S", frequency: 277.183 },
  { note: "D", key: "X", frequency: 293.665 },
  { note: "Eb", key: "D", frequency: 311.127 },
  { note: "E", key: "C", frequency: 329.628 },
  { note: "F", key: "V", frequency: 349.228 },
  { note: "Gb", key: "G", frequency: 369.994 },
  { note: "G", key: "B", frequency: 391.995 },
  { note: "Ab", key: "H", frequency: 415.305 },
  { note: "A", key: "N", frequency: 440 },
  { note: "Bb", key: "J", frequency: 466.164 },
  { note: "B", key: "M", frequency: 493.883 }
];

document.addEventListener("keydown", e => {
  if (e.repeat) return;
  const keyboard = e.code;
  const noteDetails = getNoteDetails(keyboard);

  if (noteDetails == null) return;
  noteDetails.active = true;
  console.log(e);

  playNotes();
});

document.addEventListener("keyup", e => {
  const keyboard = e.code;
  const noteDetails = getNoteDetails(keyboard);

  if (noteDetails == null) return;
  noteDetails.active = false;

  playNotes();
});

function getNoteDetails(keyEvent) {
  return NOTE_DETAILS.find(n => `Key${n.key}` === keyEvent);
}

function playNotes() {
  NOTE_DETAILS.forEach(n => {
    const key = document.querySelector(`[data-note="${n.note}"]`);
    key.classList.toggle("active", n.active || false);

    if (n.oscilator != null) {
      n.oscilator.stop();
      n.oscilator.disconnect();
    }
  });

  const activeNotes = NOTE_DETAILS.filter(n => n.active);
  const gain = 0.4 / activeNotes.length;
  activeNotes.forEach(n => {
    startNote(n, gain);
  });
}

function startNote(noteDetails, gain) {
  const gainNode = audioContext.createGain();
  gainNode.gain.value = gain;
  const oscilator = audioContext.createOscillator();
  oscilator.frequency.value = noteDetails.frequency;
  oscilator.type = "sine";
  oscilator.connect(gainNode).connect(audioContext.destination);
  oscilator.start();
  noteDetails.oscilator = oscilator;
}
