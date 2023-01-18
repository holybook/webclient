import {useState} from 'react';
import {TopBar} from './TopBar';
import {TextField} from '@mui/material';
import './Translate.scss';
import {LanguageSelect} from '../common/LanguageSelect';

export function Translate() {
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('de');
  const [translationResult, setTranslationResult] = useState(null);
  const supportedLanguages = ['en', 'de'];

  function submitTranslation(text) {
    const translationRequest = {
      fromLanguage: fromLanguage,
      toLanguage: toLanguage,
      text: text
    };
    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(translationRequest)
    }).then(response => {
      return response.json()
    })
    .then(result => {
      setTranslationResult(result);
    });
  }

  function getTranslatedText() {
    if (translationResult !== null) {
      return translationResult.translatedParagraph.text;
    }

    return '';
  }

  return (<div id="translate">
        <TopBar activeLanguage={fromLanguage}/>
        <div className="language-header">
          <div className="language-container">
            <LanguageSelect
                supportedLanguages={supportedLanguages}
                activeLanguage={fromLanguage}
                onLanguageChanged={(event) => setFromLanguage(event.target.value)}
            />
          </div>
          <div className="language-container">
            <LanguageSelect
                supportedLanguages={supportedLanguages}
                activeLanguage={toLanguage}
                onLanguageChanged={(event) => setToLanguage(event.target.value)}
            />
          </div>
        </div>
        <div className="text-container">
          <TextField
              className="translate-text"
              multiline={true}
              minRows="15"
              maxRows="15"
              onChange={(event) => submitTranslation(event.target.value)}
          />
          <TextField
              className="translate-text"
              multiline={true}
              minRows="15"
              maxRows="15"
              value={getTranslatedText()}
          />
        </div>
      </div>
  )
}