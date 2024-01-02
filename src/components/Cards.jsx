
import img from "../assets/counter.jpg";
import {BiUpArrowAlt} from 'react-icons/bi'

const Cards = ({id, title, photo, user_id, username, create_at, update_at, like}) => {
    return (
        <div className="border border-secondary-v2 p-5 grid grid-cols-3 rounded-xl place-items-center">
            <div className="flex text-secondary-v2 items-center gap-3">
                <p className="px-8 font-thin ">{id}</p>
                <div className="w-[118px] h-[64px]">
                <img className="object-cover w-full h-full rounded-lg" src={photo} alt=""/>
                </div>
                <p className="text-xl font-light">{title}</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6">
                    <img className="object-cover w-full h-full rounded-full" src={img} alt="" />
                </div>
                <p className="font-extralight text-neural-v2">{username}</p>
            </div>
            <div className="flex items-center justify-end w-full">
                <p className="font-extralight text-secondary-v2">{like}</p>
                <BiUpArrowAlt className="text-3xl text-neural-v2" />
            </div>
        </div>
    );
};

export default Cards;

// {
//   "id": 1,
//   "title": "Rune raises $100,000 for marketing through NFT butterflies sale",
//   "photo": "https://picsum.photos/200/200",
//   "user_id": 1,
//   "username": "boss",
//   "create_at": "2022-01-01",
//   "update_at": "2022-01-01T00:00:00.000Z",
//   "like": 10
// }
