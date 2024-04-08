import React from "react";
import Accolade from "./Accolade";
import useEmblaCarousel from 'embla-carousel-react'



export default function Endorsements({
  pastEndorsements,
  handleChange,
  addLike,
  resetLike,
}) {

  const [emblaRef] = useEmblaCarousel({
    startIndex: 0,
    axis: 'x',
    containScroll: 'trimSnaps',
    loop: true,
    draggable: true,
    speed: 500,
    easing: 'easeOutCubic',

  })




  const endorsementDisplay = pastEndorsements.map((item) => {
    const { id, to, from, accolade, likes } = item[1];
    return (
      <Accolade
        key={item[0]}
        id={item[0]}
        to={to}
        from={from}
        accolade={accolade}
        handleChange={handleChange}
        addLike={addLike}
        likes={likes}
        resetLike={resetLike}
      />
    );
  });

  return (
    // <div id='endorsementDisplay'>{endorsementDisplay}</div>
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {/* <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div> */}
        {endorsementDisplay}

      </div>
    </div>
  );
}




