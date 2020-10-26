import React, { Component } from 'react';
import Axios from 'axios';
import './style.scss';
import Modal from '../Modal';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfImages: [],
            currentPage: 0,
            currentImageIndex: 0
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

    openModal = (index) => {
        this.setState({
            currentImageIndex: index
        }, () => {
            document.getElementById('imageModal').style.display = 'block';
        })
    }

    toggleImage = (direction) => {

        if(direction === 'left') {
            this.setState((prevState) => {
                return {currentImageIndex: prevState.currentImageIndex - 1}
            });
        } else {
            this.setState((prevState) => {
                return {currentImageIndex: prevState.currentImageIndex + 1}
            }, () => {
                if(this.state.listOfImages.length - this.state.currentImageIndex < 5) {
                    this.getImages();
                }
            });
        }
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

        const { listOfImages, currentImageIndex } = this.state;

        return (
            <>
                <div className="gallery">
                    {listOfImages.map( (image, index) => {
                        return <img key={image.id} src={image.urls.small} alt={image.description} onClick={() => this.openModal(index)}></img>
                    })}
                </div>
                <Modal listOfImages={listOfImages} imageIndex={currentImageIndex} toggleImage={this.toggleImage}/>
            </>
        )
    }
}
export default Gallery;
