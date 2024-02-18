import React, { memo } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const Loading = () => {
    return (
        <>
            <BeatLoader color="#ffff" />
        </>
    );
};

export default memo(Loading);
