import React from 'react';

export class Paragraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paragraphs: []
        }
    }

    componentDidMount() {
        fetch(`http://0.0.0.0:8080/books/${this.props.book.id}/paragraphs?lang=${this.props.language}`)
            .then(response => {
                return response.json()
            })
            .then(paragraphs => {
                this.setState(() => {
                    return {
                        paragraphs: paragraphs
                    }
                })
            })
    }

    render() {
        if (this.state.paragraphs.length === 0) {
            return <div>
                Loading...
            </div>
        }

        return this.state.paragraphs.map((paragraph) =>
            <p className={`par ${paragraph.type}`}>{paragraph.text}</p>
        )
    }
}