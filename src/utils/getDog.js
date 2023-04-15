const getDog = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const res = await fetch(url);
    return res.json();
};

export default getDog;
