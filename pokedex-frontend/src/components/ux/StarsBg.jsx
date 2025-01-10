import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const getRandomPosition = () => `${Math.random() * 100 - 10}%`;


const StarsBg = () => {

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-screen z-0 bg-gradient-to-* from-gray-900 via-black to-gray-900 text-white">
            {/* Arrière-plan étoiles */}
            {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute bg-gradient-to-r from-blue-700 via-purple-900 to-black opacity-30 rounded-full w-[600px] h-[600px] blur-3xl animate-pulse"
                    style={{ top: getRandomPosition(), left: getRandomPosition() }}

                />
                <div
                    className="absolute bg-gradient-to-r from-primary via-purple-900 to-black opacity-30 rounded-full w-[400px] h-[400px] blur-3xl animate-pulse"
                    style={{ top: getRandomPosition(), left: getRandomPosition() }}

                />
            </div> */}

            {/* Animation des étoiles */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(50)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute bg-white rounded-full"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        style={{
                            width: `${Math.random() * 3 + 2}px`,
                            height: `${Math.random() * 3 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StarsBg;
