import React from 'react';

type TextProps = {
    text: string;
    searchFilter?: string;
};
export const HighLightText: React.FC<TextProps> = ({ text, searchFilter }) => {
    if (!searchFilter) return text;
    const regexp = new RegExp(searchFilter, 'ig');
    const matchValue = text.match(regexp);
    
    if (matchValue) {
        return text.split(regexp).map((s, index, array) => {
            if (index < array.length - 1) {
                const c = matchValue.shift();

                return (
                    <React.Fragment>
                        {s}
                        <span className='hightlight' style={{ color: 'red' }}>
                            {c}
                        </span>
                    </React.Fragment>
                );
            }

            return s;
        });
    }

    return text;
};
