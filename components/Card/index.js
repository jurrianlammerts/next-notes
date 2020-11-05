import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { memo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useInvertedBorderRadius } from '../../utils/useInvertedBorderRadius';
import { ContentPlaceholder } from './ContentPlaceholder';
import { Title } from './Title';
import { Image } from './Image';
import { openSpring, closeSpring } from './animations';
import { useScrollConstraints } from '../../utils/useScrollConstraints';
import { useWheelScroll } from '../../utils/useWheelScroll';

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150;

export const Card = memo(
  ({ id, slug, title, category, pointOfInterest, backgroundColor }) => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(false);

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && router.push('/');
    }

    function checkZIndex(latest) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected,
    );

    return (
      <motion.li
        ref={containerRef}
        className={`card`}
      >
        <Overlay isSelected={isSelected} setIsSelected={setIsSelected} />
        <Link href={`posts/${slug}`}>
          <div className={`card-content-container ${isSelected && 'open'}`}>
            <motion.div
              ref={cardRef}
              className="card-content"
              style={{ ...inverted, zIndex, y }}
              layoutTransition={isSelected ? openSpring : closeSpring}
              drag={isSelected ? 'y' : false}
              dragConstraints={constraints}
              onDrag={checkSwipeToDismiss}
              onUpdate={checkZIndex}
            >
              <Image
                id={id}
                isSelected={isSelected}
                pointOfInterest={pointOfInterest}
                backgroundColor={backgroundColor}
              />
              <Title
                title={title}
                category={category}
                isSelected={isSelected}
              />
              <ContentPlaceholder />
            </motion.div>
          </div>
        </Link>
      </motion.li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected,
);

const Overlay = ({ isSelected, setIsSelected }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
      onClick={() => setIsSelected(false)}
    />
  );
};
