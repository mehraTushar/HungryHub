import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { imgUrl } from '../config';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Card = ({ data }) => {
  return (
    <>
      <div className="rounded-lg relative overflow-hidden bg-white dark:bg-black">
        <div className="h-56 w-full overflow-hidden flex justify-center items-center">
          <img
            onError={(i) => (i.target.style.display = 'none')}
            loading="lazy"
            className="w-full object-cover"
            src={imgUrl + data?.cloudinaryImageId}
            alt="Restaurant Image"
          />
          <span className="absolute top-[11.5rem] uppercase font-extrabold text-2xl bg-gradient-to-b from-transparent to-[#1b1e24] w-full p-1 px-6 rounded text-white">
            {data?.costForTwo}
          </span>
        </div>

        <div className="px-6 py-4">
          <div className="font-bold text-xl my-2 text-black dark:text-white line-clamp-1 ">{data?.name}</div>
          <div className="flex items-center font-semibold align-middle mb-2">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faStar}
                className={`faStar text-white p-1 rounded-full text-xs ${
                  data?.avgRating >= 4 ? 'bg-green-400' : 'bg-orange-400'
                }`}
              />
              <span>{`${data?.avgRating} • `}</span>
            </span>
            <span className="mx-1">{data?.sla?.slaString}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-400 text-base overflow-hidden line-clamp-1 mb-2">
            {data?.cuisines.map((cuisine, index) => (
              <span key={index}>
                {index > 0 && ', '}
                {cuisine}
              </span>
            ))}
          </p>
          <span className="mb-2 text-black dark:text-gray-400">{data?.areaName}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
