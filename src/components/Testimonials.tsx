import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const list = [
    {
      text: '"DineDash has completely changed how we serve during the lunch rush. Guests don\'t have to wait for a menu, and payments are settled instantly via Telebirr."',
      name: 'Abeba Tadesse',
      role: 'Manager, Addis Cafe',
      avatarColor: 'bg-teal-600',
      initials: 'AT'
    },
    {
      text: '"Our table turnover increased by 30% in the first month. The staff is less stressed, and customers love how easy it is to re-order drinks."',
      name: 'Dawit Kebede',
      role: 'Owner, Bole Bistro',
      avatarColor: 'bg-amber-600',
      initials: 'DK'
    },
    {
      text: '"The Amharic interface is a game changer for our local customers. It\'s truly a product built for Ethiopia."',
      name: 'Mekdes Hailu',
      role: 'Operations, Gardenia Cafe',
      avatarColor: 'bg-[#a73926]',
      initials: 'MH'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#fcf9f8]" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        
        {/* Title */}
        <div className="space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Loved by restaurant owners
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            See how cafes and fine dining rooms in Addis Ababa are improving customer experiences with DineDash.
          </p>
        </div>

        {/* Testimonials Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          {list.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-[2rem] border border-gray-150 flex flex-col justify-between shadow-sm relative"
              id={`testimonial-card-${idx}`}
            >
              {/* Giant quote sign background */}
              <Quote className="w-10 h-10 text-gray-100 absolute top-6 right-8 rotate-180" />

              {/* Quote text */}
              <p className="text-[#57423d] text-sm leading-relaxed mb-6 italic z-10 font-normal">
                {item.text}
              </p>

              {/* Reviewer bio */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 ${item.avatarColor} text-white font-bold text-xs rounded-full flex items-center justify-center shrink-0`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800">{item.name}</h4>
                  <p className="text-[10px] sm:text-xs text-xs text-gray-400 font-semibold">{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
