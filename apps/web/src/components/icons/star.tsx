import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill={index < rating ? "currentColor" : "none"}
            />
        ))}
      </div>
  );
};

export default StarRating;