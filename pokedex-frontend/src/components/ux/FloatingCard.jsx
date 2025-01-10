import { motion } from 'framer-motion';

const FloatingCard = ({
    children,
    className="relative bg-black/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 z-10",
    initialY = -50,
    initialOpacity = 0,
    animateY = 0,
    animateOpacity = 1,
    transitionDuration = 1,
}) => (
    <motion.div
        className={`relative bg-black/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 z-10 ${className}`}
        initial={{ y: initialY, opacity: initialOpacity }}
        animate={{ y: animateY, opacity: animateOpacity }}
        transition={{ duration: transitionDuration }}
    >
        {children}
    </motion.div>
);

export default FloatingCard;
