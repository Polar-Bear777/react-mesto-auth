function InfoTooltip(props) {
    return (
      <div className={`popup popup-register ${props.isOpen ? 'popup_is-opened' : ''}`} onClick={props.onCloseClick}>
        <div className="popup-register__container">
          <img className="popup-register__status" src={props.image} alt={props.title}/>
          <h2 className="popup-register__message">{props.title}</h2>
          <button className="popup-register__btn-close" type="button" title="Закрыть" onClick={props.onClose}/>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;