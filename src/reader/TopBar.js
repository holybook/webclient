import {LanguageSelect} from '../common/LanguageSelect';
import {getScrollPosition} from './ScrollPosition';
import {useNavigate} from 'react-router-dom';

export function TopBar({book, activeLanguage}) {

  const navigate = useNavigate();
  const supportedLanguages = book.translations.map(
      (translation) => translation.language)

  function setLanguage(language) {
    console.log(`/books/${book.id}?lang=${language}`)
    navigate(`/books/${book.id}?lang=${language}&pos=${getScrollPosition()}`)
  }

  return (<div className="topbar">
    <LanguageSelect
        supportedLanguages={supportedLanguages}
        activeLanguage={activeLanguage}
        onLanguageChanged={setLanguage}
    />
  </div>);
}