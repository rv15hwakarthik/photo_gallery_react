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
            currentImage: ''
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

    openModal = (url) => {
        this.setState({
            currentImage: url
        }, () => {
            document.getElementById('imageModal').style.display = 'block';
        })
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

        const { listOfImages, currentImage } = this.state;

        return (
            <>
                <div className="gallery">
                    {listOfImages.map( image => {
                        return <img key={image.id} src={image.urls.small} alt={image.description} onClick={() => this.openModal(image.urls.small)}></img>
                    })}
                </div>
                <Modal url={currentImage} />
            </>
        )
    }
}
export default Gallery;
