import React, { Component } from 'react';
import Axios from 'axios';
import './style.scss';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfImages: [],
            currentPage: 0
        }

        this.debounceTimer = null;
    }

    componentDidMount() {
        this.getImages();
        window.addEventListener('scroll', (event) => {
            let lastImage = document.querySelector(".gallery > img:last-child");
            let lastImageOffset = lastImage.offsetTop + lastImage.clientHeight;
            var pageOffset = window.pageYOffset + window.innerHeight;

            if(pageOffset > lastImageOffset - 500) {
                this.getImages();
            }
        });
    }

    getImages = () => {

        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.setState((prevState) => {
                return {
                    currentPage: prevState.currentPage + 1
                }
            }, () => {
                const config = {
                    params: {
                        client_id: 'u11hLKo7eV5fY3fZoUB1TGtW9PuTIkhB2tANcUcpz0s',
                        page: this.state.currentPage
                    }
                }
                Axios.get("https://api.unsplash.com/photos", config)
                .then(response => {
                    let newList = [...this.state.listOfImages, ...response.data];
                    this.setState({
                        listOfImages: newList
                    });
                })
                .catch( error => {
                    console.log(error);
                });
            })
        }, 50)
        
    }

    render() {

        const { listOfImages } = this.state;

        return (
            <div className="gallery">
                {listOfImages.map( image => {
                    return <img key={image.id} src={image.urls.small} alt={image.description}></img>
                })}
            </div>
        )
    }
}
export default Gallery;
