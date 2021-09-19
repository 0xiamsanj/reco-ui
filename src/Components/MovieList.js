import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import MovieCard from "./MovieCard";
class MoviesList extends React.Component {
    state = {
        moviesList: [],
        searchTerm: ''
    };

    componentDidMount() {
        axios
            .get(
                `http://127.0.0.1:8000/api/movies`
            )
            .then(res => res.data)

            .then(res => {
                var data = JSON.parse(JSON.stringify(res));
                this.setState({ moviesList: data });
                console.log(">>>>>>SSSS", this.state.moviesList)
            });
    }

    search = event => {
        event.preventDefault();
        axios
            .get(
                `http://127.0.0.1:8000/api/movies`
            )
            .then(
                res => res.data
            )

            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }
                console.log(">>>>>>>>>>>>>", res)
                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    renderTasks() {
        return this.state.moviesList.map(task => {
            return <Container className="movie-card-container">
            
            <div className="movie-info">
                <h2>Movie Details</h2>
                <div>
                    <h1>{task.name}</h1>
                    <small>Description: {task.description}</small>
                </div>
            </div>
        </Container>;
           
        })
    }

    // <div className="movie-card-container">
    //             <div className="image-container">
    //                 <div
    //                     className="bg-image"
    //                     style={{ backgroundImage: `url(${Poster})` }}
    //                 />
    //             </div>
    //             <div className="movie-info">
    //                 <h2>Movie Details</h2>
    //                 <div>
    //                     <h1>{Title}</h1>
    //                     <small>Released Date: {Released}</small>
    //                 </div>
    //                 <h4>Rating: {imdbRating} / 10</h4>
    //                 <p>{Plot && Plot.substr(0, 350)}</p>
    //                 <div className="tags-container">
    //                     {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
    //                 </div>
    //             </div>
    //         </div>
    
    // render() {
        
    //     if (!this.state.moviesList) {
    //         return <div>Loading...</div>;
    //     }

    //     return (
    //         <div>
    //             {this.renderTasks()}

    //         </div>
    //     );
    // }
    render() {
        if (!this.state.moviesList) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <form onSubmit={this.search}>
                    <input
                        placeholder="Search for a movie"
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        <i className="fa fa-search" />
                    </button>
                </form>
                {this.renderTasks()}

                
                {/* {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
                        Couldn't find any movie. Please search again using
                        another search criteria.
                    </p>
                )} */}


                
            </div>
        );
    }
}

export default MoviesList;