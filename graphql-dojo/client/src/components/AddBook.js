import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getAuthorsQuery, addBookMutation } from '../queries/queries'
import { flowRight as compose } from 'lodash';

export class AddBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }


    displayAuthors() {
        var data = this.props.getAuthorsQuery;

        if (data.loading) {
            return (
                <option disabled>Loading Authors...</option>
            )
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        }
    }

    submitForm(e) {
        e.preventDefault();

        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input onChange={(e) => this.setState({ name: e.target.value })} type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input onChange={(e) => this.setState({ genre: e.target.value })} type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })} >
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
