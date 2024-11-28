import { useEffect, useRef, useState } from 'react'
import './App.css'
import { CardData } from './models/card';
import { CARD_DATA } from './mocks/data/card-data';
import useSessionStorage from './hooks/useSessionStorage';
import { ReactSortable } from 'react-sortablejs';
import Card from './components/Card';
import Modal from './components/Modal';

import isEqual from 'lodash.isequal';
import { APP_CONSTANTS } from './constants/app-constant';
import Spinner from './components/Spinner';

function App() {
  const [cardData, setCardData] = useState<CardData[]>(CARD_DATA);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<CardData>();
  const { getStorageData, saveStorageData } = useSessionStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const currentData = useRef(cardData);
  currentData.current = cardData;

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setModalOpen(true);
  }

  const getData = async () => {
    setIsLoading(true);
    const resp = await fetch('https://api.com/data');
    const res = await resp.json();
    if (res && res.length > 0) {
      setCardData(res);
      saveStorageData(APP_CONSTANTS.cardDataStorage, res);
      setAutoSave();
      setIsLoading(false);
    }
  }

  const autoSave = async (cardDataFromStorage: CardData[], currentData: CardData[]) => {
    if (!isEqual(cardDataFromStorage, currentData) && cardDataFromStorage.length > 0 && currentData.length > 0) {
      setIsLoading(true);
      saveStorageData('cardData', currentData);
      const resp = await fetch('https://api.com/data', {
        method: 'POST',
        body: JSON.stringify(currentData)
      });
      const res = await resp.json();
      if (res.length > 0) {
        console.log('saved successfully');
        setIsLoading(false);
        setLastUpdated(new Date());
      }
    }
    setAutoSave();
  }

  const setAutoSave = () => {
    const cardDataFromStorage = getStorageData(APP_CONSTANTS.cardDataStorage);
    setTimeout(() => autoSave(cardDataFromStorage, currentData.current), 5000); // call the same method every 5 seconds
  }

  useEffect(() => {
    // event handler for esc key press to close the image overlay
    const handleEsc = (event: { key: string; }) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // update the ref whenever card data changes - this will serve the latest data inside setTimeout
    currentData.current = cardData
  }, [cardData])

  return (
    <>
      <div className="main-container">
        <div className="last-updated">
          Last Updated: {lastUpdated.toString()}
        </div>
        {isLoading ? <Spinner /> :
          <ReactSortable list={cardData} setList={setCardData} className="grid-container">
            {cardData?.map((card) => (
              <Card key={card.position} data={card} onClick={() => handleCardClick(card)} />
            ))}
          </ReactSortable>
        }
      </div>
      <div className="modal-container">
        <Modal data={selectedCard} isOpen={modalOpen} />
      </div>
    </>
  )
}

export default App
