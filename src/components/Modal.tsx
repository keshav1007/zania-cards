import { ModalPropsType } from "../models/card";

const Modal = ({ data, isOpen }: ModalPropsType) => {
    return (
        data && isOpen ?
            <div className="overlay">
                <img className="overlay-img" src={`../src/assets/images/${data.type}.jpg`} alt={data.title} />
            </div>
            : <></>
    );
};

export default Modal;
