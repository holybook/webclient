import {MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function TopBar({book, language}) {

    const navigate = useNavigate()

    function setLanguage(event) {
        const language = event.target.value
        console.log(`/books/${book.id}?lang=${language}`)
        navigate(`/books/${book.id}?lang=${language}`)
    }

    return (<div className="topbar">
        <Select
            value={language}
            onChange={setLanguage}
        >
            {book.translations.map((translation) => {
                return (<MenuItem value={translation.language}>
                    {translation.language}
                </MenuItem>);
            })}
        </Select>
    </div>);
}