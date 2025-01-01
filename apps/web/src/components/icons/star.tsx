import { Star } from "lucide-react";

export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a partial star
  const emptyStars = max - Math.ceil(rating); // Remaining empty stars

  return (
      <div className="flex items-center gap-1">
        {/* Full Stars */}
        {Array.from({ length: fullStars }, (_, index) => (
            <Star key={`full-${index}`} className="w-6 h-6 text-yellow-500" fill="currentColor" />
        ))}
        {/* Half Star */}
        {hasHalfStar && (
            <div className="relative w-6 h-6 text-yellow-500">
              <Star className="absolute w-6 h-6 text-gray-300" fill="currentColor" />
              <Star
                  className="absolute w-6 h-6 text-yellow-500 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - (rating % 1) * 100}% 0 0)` }}
                  fill="currentColor"
              />
            </div>
        )}
        {/* Empty Stars */}
        {Array.from({ length: emptyStars }, (_, index) => (
            <Star key={`empty-${index}`} className="w-6 h-6 text-gray-300" fill="currentColor" />
        ))}
      </div>
  );
}
