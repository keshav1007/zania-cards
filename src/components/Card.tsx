import { CardPropsType } from "../models/card";

const Card = ({ data, onClick }: CardPropsType) => {

    return (
        <div className="card" onClick={onClick}>
            <div className="card-title">{data.title}</div>
            <div>
                <img className="card-img" src={`../src/assets/images/${data.type}.jpg`} alt={data.title} />
            </div>
        </div>
    );
};

export default Card;
