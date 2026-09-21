import { useEffect, useState } from 'react';
import { getDigimon } from '../helpers/getDigimon';
export const useFetchDigimon = (category) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let isActive = true;

        const getImages = async () => {
            setIsLoading(true);
            try {
                const newImages = await getDigimon(category);
                if (isActive) setImages(newImages);
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        getImages();
        return () => {
            isActive = false;
        };
    }, [category]);
    return {
        images,
        isLoading
    }
}