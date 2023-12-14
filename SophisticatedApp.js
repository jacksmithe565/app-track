/* 
   Code Filename: SophisticatedApp.js
   
   Description: 
   This code represents a complex web application that simulates a virtual art gallery. Users can browse through various art pieces, leave comments, and even purchase art pieces online. The code demonstrates advanced JavaScript concepts such as object-oriented programming, event handling, AJAX, and modular code structure.

   Note: This code is a simplified representation and may require additional setup, such as setting up a server, database, and front-end framework, to fully execute.
*/

// Import necessary modules and dependencies
import { loadArtPieces, getArtPiece } from './artPieceService.js';  // Art piece service module
import { fetchComments, createComment } from './commentService.js';  // Comment service module
import { displayErrorMessage, displaySuccessMessage } from './notificationService.js'; // Notification service module
import { formatCurrency } from './utils.js';  // Utility module

// Define ArtGallery class representing the application
class ArtGallery {
  constructor(artPiecesContainer, commentsContainer, purchaseContainer) {
    this.artPiecesContainer = artPiecesContainer;
    this.commentsContainer = commentsContainer;
    this.purchaseContainer = purchaseContainer;
    this.artPieces = [];
    this.selectedArtPiece = null;
  }

  // Initialize the app
  async init() {
    try {
      // Load art pieces and render them
      this.artPieces = await loadArtPieces();
      this.renderArtPieces();
      
      // Add event listeners
      this.artPiecesContainer.addEventListener('click', this.onArtPieceClick.bind(this));
      this.commentsContainer.addEventListener('submit', this.onCommentSubmit.bind(this));
    } catch (error) {
      displayErrorMessage('Failed to initialize the app.');
      console.error(error);
    }
  }

  // Render the art pieces in the gallery
  renderArtPieces() {
    this.artPieces.forEach((artPiece) => {
      const artPieceElement = document.createElement('div');
      artPieceElement.setAttribute('data-id', artPiece.id);
      artPieceElement.innerHTML = `
        <h2>${artPiece.title}</h2>
        <img src="${artPiece.imageUrl}" alt="${artPiece.title}" />
        <p>Artist: ${artPiece.artist}</p>
        <p>Price: ${formatCurrency(artPiece.price)}</p>
      `;
      this.artPiecesContainer.appendChild(artPieceElement);
    });
  }

  // Handle art piece click event
  async onArtPieceClick(event) {
    const artPieceElement = event.target.closest('[data-id]');
    if (artPieceElement) {
      const artPieceId = artPieceElement.dataset.id;
      this.selectedArtPiece = getArtPiece(artPieceId);
      this.renderComments();
      disablePurchaseButton();
    }
  }

  // Render the comments for the selected art piece
  async renderComments() {
    try {
      const comments = await fetchComments(this.selectedArtPiece.id);
      this.commentsContainer.innerHTML = '';
      comments.forEach((comment) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
          <p>${comment.body}</p>
          <p>By: ${comment.author}</p>
        `;
        this.commentsContainer.appendChild(commentElement);
      });
    } catch (error) {
      displayErrorMessage('Failed to load comments.');
      console.error(error);
    }
  }

  // Handle comment submission
  async onCommentSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const commentBody = formData.get('comment');
    const commentAuthor = formData.get('author');
    try {
      const newComment = await createComment(this.selectedArtPiece.id, commentBody, commentAuthor);
      this.commentsContainer.innerHTML = '';
      this.renderComments();
      displaySuccessMessage('Comment created successfully!');
    } catch (error) {
      displayErrorMessage('Failed to create comment.');
      console.error(error);
    }
  }

  // Disable purchase button for the selected art piece
  disablePurchaseButton() {
    this.purchaseContainer.disabled = true;
    this.purchaseContainer.innerHTML = 'Sold';
  }
}

// Create an instance of the ArtGallery and initialize the app
const artGallery = new ArtGallery(
  document.getElementById('artPiecesContainer'),
  document.getElementById('commentsContainer'),
  document.getElementById('purchaseButton')
);
artGallery.init();