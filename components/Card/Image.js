import { useState } from 'react';
import { motion, useInvertedScale } from 'framer-motion';
import { closeSpring } from './animations';

export const Image = ({
  slug,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
}) => {
  const [loaded, setLoaded] = useState(false);
  const inverted = useInvertedScale();

  return (
    <motion.div
      className="card-image-container"
      style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
    >
      <picture>
        <source
          srcSet={require(`../../public/images/${slug}.jpg?webp`)}
          type="image/webp"
        />
        <source
          srcSet={require(`../../public/images/${slug}.jpg`)}
          type="image/jpeg"
        />
        {!loaded ? (
          <motion.img
            className="card-image"
            src={require(`../../public/images/${slug}.jpg?lqip`)}
            alt="Picture of the author"
            whileHover={{ scale: 1.1 }}
            onLoad={setLoaded(true)}
          />
        ) : (
          <motion.img
            className="card-image"
            src={require(`../../public/images/${slug}.jpg`)}
            whileHover={{ scale: 1.1 }}
            alt="Picture of the author"
            initial={false}
            animate={
              isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }
            }
            transition={closeSpring}
          />
        )}
      </picture>
    </motion.div>
  );
};
