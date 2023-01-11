import "./card.css";

function card(props) {
  return (
    <div className="card">
      <div class="card__image-container">
        <img src={props.imageURL} width="400" />
      </div>
      <div class="card__content">
        <p class="card__title text--medium">{props.name}</p>
        <div class="card__info">
          <p class="text--medium">{props.description} </p>
        </div>
        <div>
          <img class="buyIcon" src="https://imgur.com/MQHRBrg.png"></img>
          <img class="buyIcon" src="https://imgur.com/wndKTZS.png"></img>
          <img class="buyIcon" src="https://imgur.com/sQsv7UD.png"></img>
        </div>
        <div>
          <p class="card__price text__price">
            {props.price != null ? props.price : "Enter"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default card;
