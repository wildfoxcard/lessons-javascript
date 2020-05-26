import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getAuthorsQuery} from '../queries/queries'

export class AddBook extends Component {
    displayAuthors() {
        var data = this.props.data;

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
    render() {
        console.log("props", this.props)
        return (
            <form>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>

                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
