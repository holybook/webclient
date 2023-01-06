import {LanguageSelect} from '../common/LanguageSelect';
import {useNavigate} from 'react-router-dom';
import {TextField} from '@mui/material';

export function TopBar({supportedLanguages, activeLanguage}) {

  const navigate = useNavigate();

  function setLanguage(language) {
    navigate(`/?lang=${language}`);
  }

  return (<div className="topbar">
    <LanguageSelect
        supportedLanguages={supportedLanguages}
        activeLanguage={activeLanguage}
        onLanguageChanged={setLanguage}
    />
    <TextField variant="outlined"
               size="small"
               label="Search"
               fullWidth />
  </div>);
}