import React from 'react';

export class Paragraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: null,
            paragraphs: []
        }
    }

    fetchParagraphs(language) {
        fetch(`http://0.0.0.0:8080/books/${this.props.book.id}/paragraphs?lang=${language}`)
            .then(response => {
                return response.json()
            })
            .then(paragraphs => {
                this.setState(() => {
                    return {
                        language: language,
                        paragraphs: paragraphs
                    }
                })
            })
    }

    render() {
        if (this.state.language !== this.props.language) {
            // refetch
            this.fetchParagraphs(this.props.language)
        }

        if (this.state.language === null) {
            return <div>
                Loading...
            </div>
        }

        return this.state.paragraphs.map((paragraph) =>
            <p className={`par ${paragraph.type}`}>{paragraph.text}</p>
        )
    }
}