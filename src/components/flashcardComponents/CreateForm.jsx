import React from 'react';
import { useState } from 'react';
import './CreateForm.css';

function CreateForm() {
  const [deck, setDeck] = useState({
    deckName: '',
    deckDescription: '',
    deckCards: [],
  })
  const [cards, setCards] = useState([{title: '', definition: '', id: 1}]);

  const updateCardTitle = (e, val) => {
    setCards(current =>
      current.map(obj => {
        if (val === obj) {
          return {...obj, title: e.target.value};
        }
        return obj;
      }),
    );
  }

  const updateCardDefinition = (e, val) => {
    setCards(current =>
      current.map((obj) => {
        if (val === obj) {
          return {...obj, definition: e.target.value};
        }
        return obj;
      }),
    );
  }

  const handleDeleteCard = cardToDelete => {
    setCards(current => current.filter(val => {
      if (val !== cardToDelete){
        return val;
      }
      return null;
    }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    setDeck({...deck, deckCards: cards})
  }

  return (
    <div className="create-deck">
      <h3 id='new-deck'>Create Deck</h3>
      <form onSubmit={handleSubmit}>
          <input 
              placeholder='Study Deck Title...'
              onChange={e => setDeck({...deck, deckName: e.target.value})}
              className='deck-input'
              required
          />
          <textarea 
            placeholder='Description...' 
            onChange={e => setDeck({...deck, deckDescription: e.target.value})}
            className='deck-input' 
            rows='5'
          >
          </textarea>
          <div className="new-cards">
            <h1>FLASH CARDS</h1>
            {cards.map((card, index) => 
            (
              <div className="card" key={index}>
                <div className="card-actions">
                  <div className="num">
                    <p>{index + 1}</p>
                  </div>
                  <div className="delete">
                    <button className='delete-icon' type='button' onClick={() => handleDeleteCard(card)} disabled={cards.length > 1 ? false : true}>🗑️</button>
                  </div>
                </div>
                <hr />
                <div className="card-input">
                  <input 
                    placeholder='Enter Term'
                    className='term' 
                    onChange={e => updateCardTitle(e, card)}
                    required
                  />
                  <p className='term-desc'>Term</p>
                  <input 
                    placeholder='Enter Definition'
                    onChange={e => updateCardDefinition(e, card)}
                    className='def' 
                    required
                  />
                  <p className='def-desc'>Definition</p>
                </div>
              </div>
            ))}
          </div>
          <button className='add-card' type='button' onClick={() => {
            const newId = cards[cards.length - 1].id + 1
            setCards([...cards, {title: '', definition: '', id: newId}])
          }}>+ Add Card</button>
          <button className='submit' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateForm