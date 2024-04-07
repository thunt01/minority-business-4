import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import './Carousel.css';
import { ArrowForward } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { RadioButtonChecked } from "@mui/icons-material";


const Carousel = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const items = [ // will be results/ features on the actual thing. 
        {
            statement: 'hello', 
            description: 'lorem ipsum', 
            photo: 'https://picsum.photos/id/1/200/300'
        },
        {
            statement: 'hey', 
            description: 'lorem ipsum', 
            photo: 'https://picsum.photos/id/23/200/300'
        },
        {
            statement: 'hi', 
            description: 'lorem ipsum', 
            photo: 'https://picsum.photos/id/4/200/300'
        },
        {
            statement: 'hi', 
            description: 'lorem ipsum', 
            photo: 'https://picsum.photos/id/4/200/300'
        }
    ]

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
          newIndex = 0;
        } else if (newIndex >= items.length) {
          newIndex = items.length - 1;
        }
    
        setActiveIndex(newIndex);
      };


      return (
        <div className="carousel">
            
          <div
            className="inner"
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {items.map((item) => {
              return <CarouselItem item={item} width={"100%"} />;
            })}
          </div>
    
          <div className="carousel-buttons">
            <button
              className="button-arrow"
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
                <div className="c-icon">
                    {<ArrowBack/>}
                </div>
            </button>
            <div className="indicators">
              {items.map((item, index) => {
                return (
                  <button
                    className="indicator-buttons"
                    onClick={() => {
                      updateIndex(index);
                    }}
                  >
                    <span

                      className={`material-symbols-outlined ${
                        index === activeIndex
                          ? "indicator-symbol-active"
                          : "indicator-symbol"
                      }`}
                    ><div className="c-icon">{<RadioButtonChecked/>}</div>
                      
                    </span>
  
                  </button>
                );
              })}
            </div>
            <button
              className="button-arrow"
              onClick={() => {
                updateIndex(activeIndex + 1);
              }}
            >
              <div className="c-icon">
                {<ArrowForward/>}
              </div>
            </button>
          </div>
        </div>
      );
}

export default Carousel;




