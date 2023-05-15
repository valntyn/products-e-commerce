/* eslint-disable react/no-array-index-key */
import './Stars.scss';

type PropTypes = {
  number: number;
  activeStarIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  inactiveStarIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const Stars: React.FC<PropTypes> = ({
  number,
  inactiveStarIcon: InactiveStarIcon,
  activeStarIcon: ActiveStarIcon,
}) => {
  const fixedRating = +number.toFixed();
  const filledStars = Array(fixedRating).fill(<ActiveStarIcon />);
  const emptyStars = Array(5 - fixedRating).fill(<InactiveStarIcon />);

  const stars = filledStars.concat(emptyStars);

  return (
    <ul className="stars">
      {stars.map((star, i) => (
        <li className="stars__star" key={i}>
          {star}
        </li>
      ))}
    </ul>
  );
};
