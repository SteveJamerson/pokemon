import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../utils/useDebounce";
import { SliderProps } from "./Slider.interfaces";
import "./slider.scss";

export const Slider: React.FC<SliderProps> = ({
   mouseEvent = false,
   touchEvent = false,
   navigation = true,
   index = 0,
   children,
   ...props
}) => {
   let childrens: any;
   let size: any = 0;

   let still: any;
   let moving: any;

   const [selected, setSelected] = useState(0);

   let indexFinish: any = 0;
   const [indexStart, setIndexStart] = useState(0);

   const [transform, setTransform] = useState(0);

   const [isDown, setIsDown] = useState(false);
   const [isUp, setIsUp] = useState(true);

   const sliderItem = useRef<HTMLDivElement>(null);
   childrens = sliderItem.current?.children;
   size = childrens?.item(1)?.scrollWidth;

   const mousestart = () => {
      setIsDown(true);
      setIsUp(false);
      setIndexStart((transform / size) | 0);
   };
   const mousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (moving === still) {
         moving = e.movementX < 0 ? 1 : -1;
         return;
      }
      moving = e.movementX < 0 ? 1 : -1;

      still = moving;

      indexFinish = indexStart + moving;

      if (indexFinish < 0) {
         indexFinish = [...childrens].length - 1;
      }
      if (indexFinish >= [...childrens].length) {
         indexFinish = 0;
      }

      select(indexFinish);
   };
   const mousefinish = () => {
      setIsDown(false);
      setIsUp(true);
   };
   const select = (index: number) => {
      setTransform(index * size);
      setSelected(index);
   };

   const [touchStart, setTouchStart] = useState(0);

   let touchXMove: any;

   const touchstart = useDebounce(
      (e: React.TouchEvent<HTMLDivElement>): void => {
         const touch = e.touches[0];
         setTouchStart(touch.screenX);
         setIsDown(true);
         setIsUp(false);
         setIndexStart((transform / size) | 0);
      }
   );
   const touchend = useDebounce((e: any) => {
      setIsDown(false);
      setIsUp(true);
   });
   const touchmove = useDebounce((e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];

      touchXMove = touchStart - touch.screenX;

      indexFinish = indexStart + (touchXMove > 0 ? 1 : -1);

      if (indexFinish < 0) {
         indexFinish = [...childrens].length - 1;
      }
      if (indexFinish >= [...childrens].length) {
         indexFinish = 0;
      }

      setTransform(indexFinish * size);
      setSelected(indexFinish);
   });

   useEffect(() => {
      window.onresize = () => {
         select(0);
      };
   });

   return (
      <div
         className="slider__wrapper"
         onMouseLeave={(e) => !isUp && mousefinish()}
      >
         <div
            className="slider__items"
            ref={sliderItem}
            onMouseDown={(e) => mouseEvent && mousestart()}
            onMouseMove={(e) => mouseEvent && isDown && mousemove(e)}
            onMouseUp={() => mouseEvent && mousefinish()}
            onTouchMove={(e) => touchEvent && touchmove(e)}
            onTouchStart={(e) => touchEvent && touchstart(e)}
            onTouchEnd={(e) => touchEvent && touchend(e)}
         >
            {React.Children.map(children, (element, i) => {
               return (
                  <div
                     className="slider__item"
                     style={{ transform: `translateX(-${transform}px)` }}
                     key={i}
                  >
                     {element}
                  </div>
               );
            })}
         </div>
         {navigation && (
            <div className="slider__nav">
               {React.Children.map(children, (slider, i) => {
                  return (
                     <input
                        key={i}
                        type="radio"
                        name="slider__select"
                        className={`dot ${selected === i ? "checked" : ""}`}
                        onClick={() => select(i)}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};
