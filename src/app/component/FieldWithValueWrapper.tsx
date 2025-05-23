import React, { FC } from "react";
import { MdClear } from "react-icons/md";

export type IFieldWithValueWrapperProps = {
  title: string;
  value: string ;
  handleDelete: () => void;
};

const FieldWithValueWrapper: FC<IFieldWithValueWrapperProps> = (props) => {
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

export default FieldWithValueWrapper;
