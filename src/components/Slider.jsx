import { register } from "swiper/element/bundle";
import "../main.css";
import Norteks from "../assets/img/logo.svg";

register();

export default function Slider() {
  return (
    <swiper-container
        slides-per-view="1"
        navigation="true"
        pagination="true"
        speed="500"
        loop="true"
        autoplay-delay="5000"
    >
    <swiper-slide>
        <div class="home-image">
            <div class="-container">
                <img src={Norteks} class="-img" alt="" />
                <div class="-title">Стильный гардероб мягкой мебели</div>
                <button class="-button">
                    <a class="-text link" href="mailto:firma.nortex@gmail.com"
                        >Оставить заявку
                    </a>
                </button>
            </div>
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="home-image">
            <div class="-container">
                <img src={Norteks} class="-img" alt="" />
                <div class="-title">Стильный гардероб мягкой мебели</div>
                <button class="-button">
                    <a class="-text link" href="mailto:firma.nortex@gmail.com"
                        >Оставить заявку
                    </a>
                </button>
            </div>
        </div>
    </swiper-slide>
    </swiper-container>
  );
}