const quotes = [
  {
    text: "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    character: "Michael Scott",
    episode: "S2E06",
    season: 2
  },
  {
    text: "Identity theft is not a joke, Jim! Millions of families suffer every year!",
    character: "Dwight Schrute",
    episode: "S3E20",
    season: 3
  },
  {
    text: "I'm not superstitious, but I am a little stitious.",
    character: "Michael Scott",
    episode: "S4E01",
    season: 4
  },
  {
    text: "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",
    character: "Michael Scott",
    episode: "S5E14",
    season: 5
  },
  {
    text: "Bears, beets, Battlestar Galactica.",
    character: "Jim Halpert",
    episode: "S3E20",
    season: 3
  }
];

const characters = [...new Set(quotes.map(quote => quote.character))];

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  quoteCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  quoteText: {
    fontSize: '20px',
    fontStyle: 'italic',
    color: '#34495e',
    marginBottom: '10px'
  },
  character: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  episode: {
    color: '#7f8c8d',
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
    fontSize: '16px'
  },
  buttonOutline: {
    backgroundColor: 'white',
    color: '#3498db',
    border: '1px solid #3498db'
  },
  select: {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  score: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  guessGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginBottom: '20px'
  }
};

function OfficeQuoteGenerator() {
  const [currentQuote, setCurrentQuote] = React.useState(quotes[0]);
  const [selectedCharacter, setSelectedCharacter] = React.useState('All');
  const [score, setScore] = React.useState(0);
  const [guessMode, setGuessMode] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const getRandomQuote = () => {
    const filteredQuotes = selectedCharacter === 'All' 
      ? quotes 
      : quotes.filter(quote => quote.character === selectedCharacter);
    
    let newQuote;
    do {
      newQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    } while (filteredQuotes.length > 1 && newQuote === currentQuote);
    
    setCurrentQuote(newQuote);
    setShowAnswer(false);
  };

  const handleGuess = (character) => {
    if (character === currentQuote.character) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const shareQuote = () => {
    const shareText = `"${currentQuote.text}" - ${currentQuote.character} (The Office, ${currentQuote.episode})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Quote copied to clipboard!'))
        .catch(() => alert('Failed to copy quote'));
    } else {
      alert(shareText);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>The Office Quote Generator</h1>
      
      <div style={styles.buttonsContainer}>
        <button 
          style={{...styles.button, ...(guessMode ? styles.buttonOutline : {})}}
          onClick={() => {
            setGuessMode(!guessMode);
            setShowAnswer(false);
            setScore(0);
          }}
        >
          {guessMode ? "Normal Mode" : "Guess Mode"}
        </button>
        <button 
          style={{...styles.button, ...styles.buttonOutline}}
          onClick={() => setScore(0)}
        >
          Reset Score
        </button>
      </div>

      <div style={styles.quoteCard}>
        <p style={styles.quoteText}>"{currentQuote.text}"</p>
        {(!guessMode || showAnswer) && (
          <p style={styles.character}>- {currentQuote.character}</p>
        )}
        <p style={styles.episode}>Episode: {currentQuote.episode}</p>
      </div>

      {guessMode && !showAnswer && (
        <div style={styles.guessGrid}>
          {characters.map((character) => (
            <button
              key={character}
              style={{...styles.button, ...styles.buttonOutline}}
              onClick={() => handleGuess(character)}
            >
              {character}
            </button>
          ))}
        </div>
      )}

      {guessMode && (
        <p style={styles.score}>Score: {score}</p>
      )}

      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={getRandomQuote}>
          Next Quote
        </button>
        <button 
          style={{...styles.button, ...styles.buttonOutline}}
          onClick={shareQuote}
        >
          Share
        </button>
      </div>

      <select 
        style={styles.select}
        value={selectedCharacter}
        onChange={(e) => {
          setSelectedCharacter(e.target.value);
          setShowAnswer(false);
        }}
      >
        <option value="All">All Characters</option>
        {characters.map(character => (
          <option key={character} value={character}>
            {character}
          </option>
        ))}
      </select>
    </div>
  );
}

ReactDOM.render(<OfficeQuoteGenerator />, document.getElementById('root'));