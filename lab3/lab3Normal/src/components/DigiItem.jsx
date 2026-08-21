export const DigiItem = ({ name, image, level}) => {
return (
<div className='card'>
<img src={ image } alt={ name} />
<p> { name} </p>
<p> NIVEL: { level} </p>
</div>
)
}