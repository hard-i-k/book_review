const StarRating = ({ value = 0, onChange, size = 'text-2xl', readOnly = false }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`${size} cursor-${onChange && !readOnly ? 'pointer' : 'default'} ${i <= value ? 'text-yellow-400' : 'text-gray-400'}`}
        onClick={() => onChange && !readOnly && onChange(i)}
        role={onChange && !readOnly ? 'button' : undefined}
        aria-label={onChange && !readOnly ? `Set rating to ${i}` : undefined}
      >
        ★
      </span>
    );
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarRating; 