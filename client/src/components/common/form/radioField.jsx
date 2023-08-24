import React, { useState } from "react";
import PropTypes from "prop-types";
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';

const RadioField = ({ options, name, onChange, valueDefault, label, ...rest }) => {
    // const handleChange = ({ target }) => {
    //     onChange({ name: target.name, value: target.value });
    // };
    const [selected, setSelected] = useState(valueDefault ? valueDefault : options[0])

    return (
        <>
            {/* <label className="form-label">{label}</label> */}
            <div className="w-full py-2 mb-4">
                <div className="mx-auto w-full">
                    <RadioGroup value={selected} onChange={setSelected} name={name}>
                        <RadioGroup.Label className="block text-sm font-medium text-slate-700">{label}</RadioGroup.Label>
                        <div className="space-y-2">
                            {options.map((option) => (
                                <RadioGroup.Option
                                    key={option.value}
                                    value={option.value}
                                    className={({ active, checked }) =>
                                        `${active
                                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                            : ''
                                        } ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-slate-200'
                                        } relative flex cursor-pointer rounded-lg px-5 py-2 shadow-md focus:outline-none`
                                    }
                                >
                                    {({ active, checked }) => (
                                        <>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                }`}
                                                        >
                                                            {option.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            <span>
                                                                {option.description}
                                                            </span>
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                                {checked && (
                                                    <div className="shrink-0 text-white">
                                                        <CheckIcon className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            {/* <input type="hidden" name={name} value={selected} /> */}
        </>

        // <div className="mb-4 ">
        //     <label className="form-label">{label}</label>
        //     <div>
        //         {options.map(option => (
        //             <div
        //                 key={option.name + "_" + option.value}
        //                 className="form-check form-check-inline"
        //             >
        //                 <input
        //                     className="form-check-input"
        //                     type="radio"
        //                     name={name}
        //                     id={option.name + "_" + option.value}
        //                     value={option.value}
        //                     checked={option.value === value}
        //                     onChange={handleChange}
        //                     {...rest}
        //                 >
        //                 </input>
        //                 <label
        //                     className="form-check-label"
        //                     htmlFor={option.name + "_" + option.value}>
        //                     {option.name}
        //                 </label>
        //             </div>

        //         ))}
        //     </div>
        // </div>
    );
};
RadioField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    options: PropTypes.array
};
export default React.memo(RadioField);
