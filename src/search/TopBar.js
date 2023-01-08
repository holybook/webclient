import {LanguageSelect} from '../common/LanguageSelect';
import {useNavigate} from 'react-router-dom';
import {TextField} from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";

export function TopBar({supportedLanguages, activeLanguage}) {

  const navigate = useNavigate();

  function setLanguage(language) {
    navigate(`/search?lang=${language}`);
  }

  function goHome() {
    navigate(`/?lang=${activeLanguage}`)
  }

  return (<div className="topbar">
    <div id="home-button" onClick={goHome}>
      <HomeIcon />
    </div>
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