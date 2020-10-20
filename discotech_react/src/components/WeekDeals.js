import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./Footer";

function WeekDeals() {
  return (
    <section className="WeekDeals">
      <div className="WeekContainer">
        <Jumbotron className="JtWeek">
          <h1 className="h1-WeekDeals">
            Find the Best Promotions for this Week
          </h1>
          <Carousel className="carouselWeek">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://scontent.feoh3-1.fna.fbcdn.net/v/t31.0-8/25626023_1130878270387587_5674780590581162169_o.jpg?_nc_cat=100&_nc_sid=730e14&_nc_ohc=VNgTNialfz4AX9mF7tv&_nc_oc=AQmQoRG6gPfQhoRRc_ZovLz49QOWJiltCsx3fFqTwzvTOxG4PDsRd7j6UWNxc7YArHU&_nc_ht=scontent.feoh3-1.fna&oh=1671ee93e4c50df3d7f584e328bc0869&oe=5FB220BA"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://barranquilla.gruposotillo.com/wp-content/uploads/2017/11/IMG-20171102-WA0012-600x600.jpg"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://barranquilla.gruposotillo.com/wp-content/uploads/2017/11/IMG-20171102-WA0017-600x600.jpg"
              />
            </Carousel.Item>
          </Carousel>
        </Jumbotron>
      </div>
      <Footer />
    </section>
  );
}

export default WeekDeals;
