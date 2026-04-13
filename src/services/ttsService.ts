const audioCache = new Map<string, HTMLAudioElement>();

export async function playTamilAudio(text: string): Promise<void> {
  const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY;
  
  if (!apiKey || apiKey === 'your_google_cloud_tts_api_key_here') {
    console.warn("Google TTS API key is missing. Falling back to browser SpeechSynthesis.");
    fallbackTTS(text);
    return;
  }

  if (audioCache.has(text)) {
    const audio = audioCache.get(text)!;
    // reset time in case it was playing
    audio.currentTime = 0;
    try {
      await audio.play();
    } catch(e) {
      console.error("Error playing cached audio:", e);
    }
    return;
  }

  try {
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: { 
          languageCode: 'en-US', 
          name: 'en-US-Chirp3-HD-Achird' 
        },
        audioConfig: { 
          audioEncoding: 'MP3'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google TTS API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (data.audioContent) {
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audioCache.set(text, audio);
      await audio.play();
    }
  } catch (error) {
    console.error("Error with Google TTS, falling back to browser API.", error);
    fallbackTTS(text);
    throw error;
  }
}

function fallbackTTS(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-speech is not supported in your browser.");
  }
}
