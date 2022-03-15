const useToggleArray = (array, value) => {
    const index = array.indexOf(value);
    console.log('array : ', array);
    console.log('value : ', value);

    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1);
    }
};

export default useToggleArray;
