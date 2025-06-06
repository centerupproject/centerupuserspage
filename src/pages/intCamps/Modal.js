import React, { useState, useEffect } from "react";
import './EditCardModal.css';

const EditCardModal = ({ card, onClose, onSave }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleChange = (field, value) => {
    setEditedCard((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(editedCard);
    onClose();
  };

  const renderCardPreview = () => {
    switch (editedCard.CardType) {
      case "CardSplitLeftImage":
        return (
          <div className="cardsplit__container cardsplit__reverse">
            <div className="cardsplit__image">
              <img src={editedCard.image} alt={editedCard.title} />
            </div>
            <div className="cardsplit__text">
              <h1>{editedCard.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: editedCard.description }} />
            </div>
          </div>
        );
      case "CardSplitRightImage":
        return (
          <div className="cardsplit__container">
            <div className="cardsplit__text">
              <h1>{editedCard.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: editedCard.description }} />
            </div>
            <div className="cardsplit__image">
              <img src={editedCard.image} alt={editedCard.title} />
            </div>
          </div>
        );
      case "HeadLine":
        return (
          <div className='headline__layout'>
            <h1><span className="headline__text">{editedCard.title}</span></h1>
            <p dangerouslySetInnerHTML={{ __html: editedCard.description }} />
          </div>
        );
      case "TextCard":
        return (
          <div className="text__card">
            {editedCard.title && <p className="text__card--title">{editedCard.title}</p>}
            {editedCard.description && <p>{editedCard.description}</p>}
          </div>
        );
      case "WhiteButton":
        return (
          <button className='white__button'>
            {editedCard.text}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>✕</button>

        <div className="modal__preview">
          {renderCardPreview()}
        </div>

        <div className="modal__inputs">
          {editedCard.title !== undefined && (
            <input
              type="text"
              value={editedCard.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Title"
            />
          )}
          {editedCard.description !== undefined && (
            <textarea
              value={editedCard.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description"
            />
          )}
          {editedCard.image !== undefined && (
            <input
              type="text"
              value={editedCard.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="Image URL"
            />
          )}
          {editedCard.text !== undefined && (
            <input
              type="text"
              value={editedCard.text}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Button Text"
            />
          )}
          {editedCard.redirect !== undefined && (
            <input
              type="text"
              value={editedCard.redirect}
              onChange={(e) => handleChange("redirect", e.target.value)}
              placeholder="Redirect URL"
            />
          )}
          <button className="modal__save" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
