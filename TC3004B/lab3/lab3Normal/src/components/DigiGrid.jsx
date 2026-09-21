import { DigiItem } from './DigiItem';
import { useFetchDigimon } from '../hooks/useFetchDigi';
export const DigiGrid = ({ category }) => {
    const { images, isLoading } = useFetchDigimon(category);
    return (
        <>
            <h3>{category}</h3>
            {
                isLoading && (<h2>Cargando...</h2>)
            }
            <div className="card-grid">
                {
                    images.map((image) => (
                        <DigiItem key={`${image.name}-${image.level}`} {...image} />
                    ))
                }
            </div>
        </>
    )
}