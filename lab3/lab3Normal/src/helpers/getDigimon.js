export const getDigimon = async (name) => {
    const url = `https://digimon-api.vercel.app/api/digimon/name/${encodeURIComponent(name)}`;
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Digimon request failed: ${resp.status}`);
    }
    const data = await resp.json();

    return data.map(digi => ({
        name: digi.name,
        image: digi.img,
        level: digi.level
    }));
}