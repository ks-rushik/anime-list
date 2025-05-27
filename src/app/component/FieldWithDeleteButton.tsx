import React, { FC } from "react";
import { MdClear } from "react-icons/md";

export type IFieldWithDeleteButtonProps = {
  title: string;
  value: string ;
  handleDelete: () => void;
};

const FieldWithDeleteButton: FC<IFieldWithDeleteButtonProps> = (props) => {
  const { title, value, handleDelete } = props;
  return (
    <div className="flex flex-row items-center">
      <p className="bold text-sm pr-2">{title}:</p>
      <span>{value}</span>
      {value && (
        <MdClear
          className="bg-gray-400 rounded-full ml-2"
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default FieldWithDeleteButton;
