import { register } from "swiper/element/bundle";
import "../main.css";
import Norteks from "../assets/img/logo.svg";

register();

export default function Slider() {
  return (
    <swiper-container
        slides-per-view="1"
        pagination="true"
        pagination-clickable="true"
        speed="500"
        loop="true"
        autoplay-delay="5000"
    >
    <swiper-slide>
        <div class="home-image">
            <div class="-container">
                {/* <img src={Norteks} class="-img" alt="" /> */}
                <div class="-title">Стильный гардероб мягкой мебели</div>
                <a class="-text link" href="mailto:firma.nortex@gmail.com">
                    <button class="-button">
                        Оставить заявку
                    </button>
                </a>
            </div>
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="home-image textile">
            <div class="-container">
                {/* <img src={Norteks} class="-img" alt="" /> */}
                <div class="-title">Широкий выбор тканей</div>
                <a class="-text link" href="/textile">
                    <button class="-button">
                        Текстиль
                    </button>
                </a>
            </div>
        </div>
    </swiper-slide>
    </swiper-container>
  );
}