import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { SpellCard } from "./SpellCard";

register();

export const MySwiper = ({spellResults}) => {

  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      pagination: true,
      injectStyles: [
        `
        .swiper-button-next,
        .swiper-button-prev {
          top: 2rem;
          padding: 16px 16px;
          height: 10px;
          background-position: center;
          background-size: 40px;
          background-repeat: no-repeat;
          color: transparent;
          }
          
        .swiper-button-prev {
            background-image: url("/arrow-prev.svg");
        }

        .swiper-button-next {
          background-image: url("/arrow-next.svg");
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          content: "";
        }

        .swiper-pagination{
          bottom: 50%;
        }

        .swiper-pagination-bullet{
          width: 7px;
          height: 7px;
          background-color: var(--text);
        }

        @media (max-width: 768px) {
        
        .swiper-button-next,
        .swiper-button-prev {
        display: none;
        }
}
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);



  return (
    <swiper-container class="swiper" ref={swiperRef} init="false">
      <swiper-slide class="swiper-slide">
        <SpellCard spellData={spellResults[0]} hasLike={true}/>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <SpellCard spellData={spellResults[1]} hasLike={true}/>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <SpellCard spellData={spellResults[2]} hasLike={true}/>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <SpellCard spellData={spellResults[3]} hasLike={true}/>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <SpellCard spellData={spellResults[4]} hasLike={true}/>
      </swiper-slide>

    </swiper-container>
  );
};
