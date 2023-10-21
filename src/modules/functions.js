export default function useAddItem(id, newItem, array){
    array.value.push({
        id: ++id,
        text: newItem.value,
        priority: 0,
    });
    newItem.value = '';
    return {id, newItem, array}
}