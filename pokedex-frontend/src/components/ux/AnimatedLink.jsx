import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedLink = ({
    to,
    children,
    className = "",
    initialColor = "text-white",
    hoverColor = "text-blue-400",
    underlineOnHover = true,
}) => (
    <motion.div
        className={`relative inline-block ${className}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
    >
        <Link
            to={to}
            className={`${initialColor} font-semibold transition-all duration-300 ${
                underlineOnHover ? 'hover:underline' : ''
            }`}
        >
            {children}
        </Link>
    </motion.div>
);

export default AnimatedLink;
