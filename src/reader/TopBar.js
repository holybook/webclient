import {MenuItem, Select} from "@mui/material";

export function TopBar({supportedLanguages, activeLanguage, onLanguageChanged}) {

  function setLanguage(event) {
    const selectedLanguage = event.target.value
    onLanguageChanged(selectedLanguage)
  }

  return (<div className="topbar">
    <Select
        value={activeLanguage}
        onChange={setLanguage}
        size="small"
    >
      {supportedLanguages.map((language) => {
        return (<MenuItem value={language} key={language}>
          {language}
        </MenuItem>);
      })}
    </Select>
  </div>);
}