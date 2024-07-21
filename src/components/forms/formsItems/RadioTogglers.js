"use client";

const RadioTogglers = ({ defaultValue, options, onChange }) => {
  return (
    <div className="radio-togglers w-fit flex items-center rounded-md">
      {options.map((item) => (
        <label className="p-1" key={item.value}>
          <input
            type="radio"
            value={item.value}
            name="bgType"
            defaultChecked={defaultValue === item.value}
            onClick={(e) => onChange(e.target.value)}
          />
          <span className="w-ful py-3 px-4 h-full font-bold flex items-center gap-2 justify-center rounded-sm">
            {item.icon}
            <span>{item.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioTogglers;
