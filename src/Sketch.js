import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Sketch = ({ image, stripes, randomSeed, onSave }) => {
  const sketchRef = useRef();

  useEffect(() => {
    let myp5;
    const sketch = (p) => {
      let img;

      p.preload = () => {
        if (image) {
          img = p.loadImage(image);
        }
      };

      p.setup = () => {
        p.createCanvas(600, 698);
        p.noLoop();
      };

      p.draw = () => {
        p.clear();
        p.randomSeed(randomSeed);
        if (img) {
          img.loadPixels();
          let y = 0;
          while (y < p.height) {
            let stripeHeight = p.random(10, 50);
            let posY = y / stripeHeight;
            let colorIndex = parseInt(p.map(posY, 0, stripes, 0, img.height));
            let c = img.get(parseInt(img.width / 2), colorIndex);
            p.fill(c);
            p.noStroke();
            p.rect(0, y, p.width, stripeHeight);
            y += stripeHeight;
          }
          p.filter(p.BLUR, 8);
        }
      };

      myp5 = p;
    };

    new p5(sketch, sketchRef.current);

    if (onSave) {
      onSave(() => {
        if (myp5 && myp5._renderer) { // Проверка на существование экземпляра и его рендерера
          myp5.saveCanvas('gradient_image', 'png');
        } else {
          console.error('Canvas is not ready to be saved.');
        }
      });
    }

    return () => {
      if (myp5) {
        myp5.remove();
      }
    };
  }, [image, stripes, randomSeed, onSave]);

  return <div ref={sketchRef}></div>;
};

export default Sketch;
