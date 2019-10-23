import React, { Component } from 'react';
import './searchbar.css';

class SearchBar extends Component<{
    submitSearch: (keyWord: string) => void,
    keyWord:string
}, { keyWord: string }> {
    state = {
        keyWord: this.props.keyWord
    }


    handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.keyWord.length > 0)
            this.props.submitSearch(this.state.keyWord);
    }
    render() {
        return (
                <form onSubmit={this.handleSearchSubmit} className="search-form">
                    <input type="text" className="search-text" placeholder=" Search a user name..." value={this.state.keyWord} onChange={(event: any) => {
                        this.setState({ keyWord: event.target.value })
                    }}>
                    </input>
                    <button type="submit" className="search-submit">Submit</button>
                </form>
        )
    }
}


export default SearchBar;