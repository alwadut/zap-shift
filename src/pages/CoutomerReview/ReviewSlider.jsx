import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { SiComma } from "react-icons/si";

const reviews = [
  {
    name: "Awlad Hossain",
    designation: "Senior Product Designer",
    img: "/assets/reviews/user1.png",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders and spine.",
  },
  {
    name: "Nasir Uddin",
    designation: "CEO",
    img: "/assets/reviews/user2.png",
    review:
      "This product helped me fix my posture and feel more confident every day.",
  },
  {
    name: "Rosal Ahmed",
    designation: "CTO",
    img: "/assets/reviews/user3.png",
    review:
      "Lightweight, comfortable, and very effective for long working hours.",
  },
  {
    name: "Sadia Khan",
    designation: "Marketing Manager",
    img: "/assets/reviews/user4.png",
    review:
      "I noticed a real improvement within a week of use. Highly recommended!",
  },
  {
    name: "Mehedi Hasan",
    designation: "UX Researcher",
    img: "/assets/reviews/user5.png",
    review:
      "Great quality and thoughtful design. Perfect for office professionals.",
  },
];

export default function ReviewSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const prev = () =>
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);

  const next = () => setActive((prev) => (prev + 1) % reviews.length);

  return (
    <section className="py-20 flex flex-col items-center" data-aos="fade-up">
      <h2 className="text-3xl font-bold mb-14">
        What our customers are saying
      </h2>

      {/* Slider */}
      <div className="relative w-full max-w-6xl min-h-[420px] md:min-h-[460px] flex justify-center items-center overflow-hidden">
        <AnimatePresence initial={false}>
          {reviews.map((item, index) => {
            const position = index - active;

            if (Math.abs(position) > 1) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.85, x: position * 300 }}
                animate={{
                   opacity: position === 0 ? 1 : 0.25,
  scale: position === 0 ? 1.05 : 0.9,
  x: position * 380,
  filter: position === 0 ? "blur(0px)" : "blur(1.5px)",
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="absolute"
              >
                <div className={`card w-[420px] bg-base-100 transition-all duration-500
  ${position === 0
    ? "shadow-2xl ring-2 ring-[#cdeb66]"
    : "shadow-md"
  }
`}>
                  <div className="card-body text-center">
                    <div className="flex "><SiComma className="text-6xl text-gray-400 "/><SiComma className="text-6xl  text-gray-400"/></div>
                    <div>
                        <p className="text-base opacity-80 leading-relaxed">
                      “{item.review}”
                    </p>
                    <div className="divider "></div>
                    </div>
                    <div className="mt-6 flex  justify-center">
                      <div className=" mb-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                        
                      <div>
                        <h3 className="font-semibold ">{item.name}</h3>
                        <p className="text-sm opacity-60">{item.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-12">
        <button className="btn btn-outline btn-circle" onClick={prev}>
          ❮
        </button>
        <button
          className="btn btn-circle bg-[#cdeb66] border-none text-black"
          onClick={next}
        >
          ❯
        </button>
      </div>
    </section>
  );
}
