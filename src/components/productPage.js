import "./productPage.css";
import Card from "./card.js";
import WBCC from "../logo.svg";

function productPage(props) {
  return (
    <div>
      <main>
        <section className="cards">
          <Card
            name="test"
            imageURL={WBCC}
            description="asdf adsf asdf asdf safd asfd asfd"
          />

          <Card
            name="Item2"
            imageURL={WBCC}
            description="asdf adsf asdf asdf safd asfd asfd"
          />
        </section>
      </main>
    </div>
  );
}

export default productPage;